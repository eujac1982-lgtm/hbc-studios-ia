const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const { OpenAI } = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Chat com múltiplas IAs + Análise de Imagens
router.post('/message', auth, async (req, res) => {
  try {
    const { message, aiProvider, imageBase64 } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    if (user.plan === 'free' && user.messagesUsed >= user.maxMessages) {
      return res.status(403).json({ error: 'Limite atingido. Atualize seu plano!' });
    }

    let aiResponse = '';
    let tokens = 0;

    // OpenAI - Com suporte a visão
    if (aiProvider === 'openai') {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      let content = [{ type: 'text', text: message }];
      
      if (imageBase64) {
        content.push({
          type: 'image_url',
          image_url: { url: imageBase64 }
        });
      }

      const completion = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [{ role: 'user', content: content }],
        max_tokens: 1000
      });

      aiResponse = completion.choices[0].message.content;
      tokens = completion.usage.total_tokens;
    }
    // Claude - Com análise de imagens
    else if (aiProvider === 'claude') {
      const claude = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

      let content = [{ type: 'text', text: message }];

      if (imageBase64) {
        const base64Data = imageBase64.split(',')[1] || imageBase64;
        const mediaType = imageBase64.includes('png') ? 'image/png' : 'image/jpeg';
        
        content.push({
          type: 'image',
          source: {
            type: 'base64',
            media_type: mediaType,
            data: base64Data
          }
        });
      }

      const completion = await claude.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: content }]
      });

      aiResponse = completion.content[0].type === 'text' ? completion.content[0].text : 'Análise concluída';
      tokens = completion.usage.output_tokens;
    }
    // Google Gemini - Com visão
    else if (aiProvider === 'gemini') {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

      let content = [];

      if (imageBase64) {
        const base64Data = imageBase64.split(',')[1] || imageBase64;
        content.push({
          inlineData: {
            data: base64Data,
            mimeType: 'image/jpeg'
          }
        });
      }

      content.push(message);

      const result = await model.generateContent(content);
      aiResponse = result.response.text();
      tokens = 100;
    }

    // Salvar mensagem
    const msg = new Message({
      userId: user._id,
      aiProvider,
      userMessage: message,
      aiResponse,
      tokens
    });
    await msg.save();

    // Atualizar uso do usuário
    user.messagesUsed += 1;
    user.credits -= Math.ceil(tokens / 100);
    await user.save();

    res.json({
      success: true,
      aiProvider,
      userMessage: message,
      aiResponse,
      tokensUsed: tokens,
      creditsRemaining: user.credits,
      messagesUsed: user.messagesUsed
    });
  } catch (error) {
    console.error('Erro no chat:', error);
    res.status(500).json({ error: error.message });
  }
});

// Gerador de Conteúdo Especializado
router.post('/generate', auth, async (req, res) => {
  try {
    const { contentType, prompt, aiProvider } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    const prompts = {
      text: `Escreva um artigo completo sobre: ${prompt}`,
      code: `Crie um código ${prompt}. Inclua comentários explicativos.`,
      poem: `Crie uma poesia sobre: ${prompt}`,
      story: `Crie uma história sobre: ${prompt}. Mínimo 500 palavras.`,
      email: `Crie um email profissional sobre: ${prompt}`,
      seo: `Crie meta tags e descrição SEO para: ${prompt}`
    };

    const finalPrompt = prompts[contentType] || prompt;

    let aiResponse = '';
    let tokens = 0;

    // OpenAI
    if (aiProvider === 'openai') {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: finalPrompt }],
        max_tokens: 2000,
        temperature: 0.8
      });
      aiResponse = completion.choices[0].message.content;
      tokens = completion.usage.total_tokens;
    }
    // Claude
    else if (aiProvider === 'claude') {
      const claude = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
      const completion = await claude.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 2000,
        messages: [{ role: 'user', content: finalPrompt }],
        temperature: 0.8
      });
      aiResponse = completion.content[0].text;
      tokens = completion.usage.output_tokens;
    }
    // Gemini
    else if (aiProvider === 'gemini') {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await model.generateContent(finalPrompt);
      aiResponse = result.response.text();
      tokens = 100;
    }

    // Salvar
    const msg = new Message({
      userId: user._id,
      aiProvider,
      userMessage: `[${contentType}] ${prompt}`,
      aiResponse,
      tokens
    });
    await msg.save();

    user.messagesUsed += 1;
    user.credits -= Math.ceil(tokens / 100);
    await user.save();

    res.json({
      success: true,
      contentType,
      aiResponse,
      tokensUsed: tokens
    });
  } catch (error) {
    console.error('Erro ao gerar:', error);
    res.status(500).json({ error: error.message });
  }
});

// Análise avançada de imagens
router.post('/analyze-image', auth, async (req, res) => {
  try {
    const { imageBase64, question, aiProvider } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

    let analysis = '';
    let tokens = 0;

    // OpenAI Vision
    if (aiProvider === 'openai') {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [{
          role: 'user',
          content: [
            { type: 'text', text: question || 'Analise esta imagem detalhadamente' },
            { type: 'image_url', image_url: { url: imageBase64 } }
          ]
        }],
        max_tokens: 1500
      });
      analysis = completion.choices[0].message.content;
      tokens = completion.usage.total_tokens;
    }
    // Claude Vision
    else if (aiProvider === 'claude') {
      const claude = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      
      const completion = await claude.messages.create({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1500,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64Data
              }
            },
            { type: 'text', text: question || 'Analise esta imagem detalhadamente' }
          ]
        }]
      });
      analysis = completion.content[0].text;
      tokens = completion.usage.output_tokens;
    }
    // Gemini Vision
    else if (aiProvider === 'gemini') {
      const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
      
      const base64Data = imageBase64.split(',')[1] || imageBase64;
      const result = await model.generateContent([
        {
          inlineData: {
            data: base64Data,
            mimeType: 'image/jpeg'
          }
        },
        question || 'Analise esta imagem detalhadamente'
      ]);
      analysis = result.response.text();
      tokens = 100;
    }

    res.json({
      success: true,
      analysis,
      tokensUsed: tokens,
      aiProvider
    });
  } catch (error) {
    console.error('Erro ao analisar imagem:', error);
    res.status(500).json({ error: error.message });
  }
});

// Histórico
router.get('/history', auth, async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.userId }).sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, total: messages.length, messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Limpar histórico
router.delete('/history', auth, async (req, res) => {
  try {
    await Message.deleteMany({ userId: req.userId });
    res.json({ success: true, message: 'Histórico limpado!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;