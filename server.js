const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Conectar MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/hbc-studios-ia')
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Erro MongoDB:', err));

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat-advanced'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/users'));

// Servir arquivos HTML estáticos
app.use(express.static('public'));
app.get('/super-ia', (req, res) => {
  res.sendFile(__dirname + '/super-ia-assistant.html');
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    status: '✅ HBC STUDIOS IA está rodando!',
    version: '2.0.0',
    features: [
      '💬 ChatBot com 3 IAs (OpenAI, Claude, Gemini)',
      '✨ Gerador de Conteúdo (Textos, Código, Poesias, Histórias, Emails, SEO)',
      '🖼️ Análise de Imagens com Visão Computacional',
      '🎤 Assistente de Voz com Síntese'
    ],
    email: 'brenograel299@gmail.com',
    links: {
      docs: '/IA-ASSISTANT-DOCS.md',
      interface: '/super-ia',
      chat: '/api/chat/message',
      generate: '/api/chat/generate',
      analyzeImage: '/api/chat/analyze-image',
      history: '/api/chat/history'
    }
  });
});

// API Info
app.get('/api/info', (req, res) => {
  res.json({
    status: 'active',
    version: '2.0.0',
    apis: [
      {
        name: 'OpenAI (ChatGPT)',
        models: ['gpt-4', 'gpt-4-vision-preview', 'gpt-3.5-turbo'],
        features: ['Chat', 'Geração', 'Análise de Imagens']
      },
      {
        name: 'Claude (Anthropic)',
        models: ['claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
        features: ['Chat', 'Geração', 'Análise de Imagens']
      },
      {
        name: 'Google Gemini',
        models: ['gemini-pro', 'gemini-pro-vision'],
        features: ['Chat', 'Geração', 'Análise de Imagens']
      }
    ],
    endpoints: {
      chat: 'POST /api/chat/message',
      generate: 'POST /api/chat/generate',
      analyzeImage: 'POST /api/chat/analyze-image',
      history: 'GET /api/chat/history',
      deleteHistory: 'DELETE /api/chat/history'
    }
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: err.message,
    status: '❌ Erro no servidor'
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    availableRoutes: {
      auth: '/api/auth/register, /api/auth/login',
      chat: '/api/chat/message, /api/chat/generate, /api/chat/analyze-image',
      payments: '/api/payments/checkout, /api/payments/plan',
      admin: '/api/admin/users, /api/admin/stats',
      users: '/api/users/profile, /api/users/change-password'
    }
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('\n🚀 ============================================');
  console.log('🚀 HBC STUDIOS IA - Super Assistente');
  console.log('🚀 Servidor rodando em http://localhost:' + PORT);
  console.log('🚀 ============================================\n');
  console.log('📊 Recursos Disponíveis:');
  console.log('   ✅ ChatBot IA (OpenAI, Claude, Gemini)');
  console.log('   ✅ Gerador de Conteúdo');
  console.log('   ✅ Análise de Imagens (Visão)');
  console.log('   ✅ Assistente de Voz');
  console.log('   ✅ Sistema de Pagamentos (Stripe)');
  console.log('   ✅ Dashboard Admin');
  console.log('\n📧 Proprietário: brenograel299@gmail.com');
  console.log('📚 Documentação: http://localhost:' + PORT + '/IA-ASSISTANT-DOCS.md');
  console.log('🌐 Interface: http://localhost:' + PORT + '/super-ia\n');
});

module.exports = app;