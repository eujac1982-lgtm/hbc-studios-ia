# 📚 Documentação - Super Assistente IA Completo

## 🤖 Recursos Disponíveis

### 1️⃣ ChatBot Inteligente
- **3 IAs Disponíveis**: OpenAI (GPT-4), Claude 3 (Anthropic), Google Gemini
- **Conversa em Tempo Real**: Respostas instantâneas
- **Histórico Automático**: Salva todas as conversas
- **Tokens Rastreados**: Monitora uso de créditos

**Endpoint:**
```bash
POST /api/chat/message
Authorization: Bearer {token}
Content-Type: application/json

{
  "message": "Sua pergunta",
  "aiProvider": "openai|claude|gemini"
}
```

---

### 2️⃣ Gerador de Conteúdo
- **6 Tipos de Conteúdo**:
  - 📝 **Artigos/Textos** - Conteúdo longo e estruturado
  - 💻 **Código** - Gera código comentado
  - 🎭 **Poesias** - Cria poesias e versos
  - 📖 **Histórias** - Narrativas criativas
  - 📧 **Emails** - Mensagens profissionais
  - 🔍 **SEO** - Meta tags e descrições

**Endpoint:**
```bash
POST /api/chat/generate
Authorization: Bearer {token}
Content-Type: application/json

{
  "contentType": "text|code|poem|story|email|seo",
  "prompt": "Descrição do que gerar",
  "aiProvider": "openai|claude|gemini"
}
```

**Exemplos de Uso:**
```bash
# Gerar Artigo
{
  "contentType": "text",
  "prompt": "Inteligência Artificial e o Futuro do Trabalho",
  "aiProvider": "openai"
}

# Gerar Código
{
  "contentType": "code",
  "prompt": "API REST com Node.js e MongoDB",
  "aiProvider": "claude"
}

# Gerar Poesia
{
  "contentType": "poem",
  "prompt": "Sobre a beleza da natureza",
  "aiProvider": "gemini"
}
```

---

### 3️⃣ Análise de Imagens (Visão Computacional)
- **Reconhecimento Visual**: Identifica objetos, texto, pessoas
- **Descrições Detalhadas**: Analisa composição e contexto
- **Perguntas Customizadas**: Faça perguntas específicas sobre a imagem
- **Suporte a 3 IAs**: OpenAI GPT-4 Vision, Claude 3 Vision, Gemini Pro Vision

**Endpoint:**
```bash
POST /api/chat/analyze-image
Authorization: Bearer {token}
Content-Type: application/json

{
  "imageBase64": "data:image/jpeg;base64,{imagem_base64}",
  "question": "Pergunta sobre a imagem (opcional)",
  "aiProvider": "openai|claude|gemini"
}
```

**Exemplos:**
```bash
# Reconhecer objeto
{
  "imageBase64": "data:image/jpeg;base64,...",
  "question": "Qual objeto é este?",
  "aiProvider": "openai"
}

# Extrair texto
{
  "imageBase64": "data:image/jpeg;base64,...",
  "question": "Extraia todo o texto visível nesta imagem",
  "aiProvider": "claude"
}

# Análise detalhada
{
  "imageBase64": "data:image/jpeg;base64,...",
  "question": "Analise a composição, cores e elementos da imagem",
  "aiProvider": "gemini"
}
```

---

### 4️⃣ Assistente de Voz
- **🎤 Reconhecimento de Voz**: Converte fala em texto
- **🔊 Síntese de Voz**: Respostas em áudio
- **🌍 Múltiplos Idiomas**: PT-BR, EN-US, ES-ES
- **Processamento em Tempo Real**: Responde enquanto você fala

**Funcionalidades:**
- Clique no botão redondo para começar
- Fale sua pergunta
- IA responde automaticamente
- Clique em "Ouvir Resposta" para áudio

**Idiomas Suportados:**
- 🇧🇷 Português (Brasil)
- 🇺🇸 Inglês (EUA)
- 🇪🇸 Espanhol (Espanha)

---

## 💳 Sistema de Créditos

### Uso de Créditos
```
Texto (até 100 tokens)    = 1 crédito
Texto (101-500 tokens)    = 5 créditos
Texto (500+ tokens)       = 10 créditos
Imagem                    = 10 créditos
Geração (texto/código)    = 15 créditos
```

### Planos Disponíveis
- **Free**: 100 créditos (demo)
- **Pro**: 1000 créditos/mês (R$ 49)
- **Business**: Ilimitado (R$ 149)

---

## 🔐 Autenticação

### 1. Registrar
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Seu Nome",
  "email": "seu_email@gmail.com",
  "password": "sua_senha"
}

Resposta:
{
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "Seu Nome",
    "email": "seu_email@gmail.com",
    "plan": "free",
    "credits": 100
  }
}
```

### 2. Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "seu_email@gmail.com",
  "password": "sua_senha"
}

Resposta:
{
  "token": "eyJhbGc...",
  "user": {...}
}
```

### 3. Usar Token
```bash
Authorization: Bearer {seu_token}
```

---

## 🎯 Exemplos Práticos

### Chatbot - Fazer uma Pergunta
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "message": "Como funciona machine learning?",
    "aiProvider": "openai"
  }'
```

### Gerador - Criar Artigo
```bash
curl -X POST http://localhost:5000/api/chat/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "contentType": "text",
    "prompt": "Benefícios da Inteligência Artificial",
    "aiProvider": "claude"
  }'
```

### Imagem - Analisar Foto
```bash
curl -X POST http://localhost:5000/api/chat/analyze-image \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "question": "Descreva o que você vê",
    "aiProvider": "gemini"
  }'
```

---

## 🚀 Como Usar a Aplicação Web

1. **Abrir no Navegador**
```
http://localhost:3000/super-ia-assistant.html
```

2. **Fazer Login**
   - Email: seu_email@gmail.com
   - Senha: sua_senha

3. **Usar os 4 Módulos**
   - **ChatBot**: Digite e envie mensagens
   - **Gerador**: Escolha tipo e descreva o conteúdo
   - **Imagens**: Envie foto e faça perguntas
   - **Voz**: Clique e fale para obter respostas em áudio

---

## 🛠️ Configuração Necessária

### 1. Variáveis de Ambiente (.env)
```
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
GOOGLE_GEMINI_KEY=...
MONGODB_URI=mongodb+srv://...
JWT_SECRET=sua_chave_secreta
PORT=5000
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Rodar Servidor
```bash
npm run dev
```

### 4. Acessar
- Backend: http://localhost:5000
- Frontend: http://localhost:3000 (se configurado)

---

## 📊 Comparação de IAs

| Recurso | OpenAI | Claude | Gemini |
|---------|--------|--------|--------|
| Chat | ✅ | ✅ | ✅ |
| Geração Código | ✅✅ | ✅✅ | ✅ |
| Análise Imagens | ✅✅ | ✅ | ✅ |
| Criatividade | ✅ | ✅✅ | ✅ |
| Velocidade | Rápido | Muito Rápido | Rápido |
| Custo | Médio | Médio | Baixo |

---

## ❓ Perguntas Frequentes

**P: Quantos créditos cada IA usa?**
R: Varia por tokens. Geralmente 1-15 créditos por interação.

**P: Posso mudar de IA durante a conversa?**
R: Sim! Selecione outro modelo no dropdown.

**P: Como recupero meu histórico?**
R: GET /api/chat/history retorna todas as mensagens.

**P: As imagens são armazenadas?**
R: Não, apenas a análise é salva.

**P: Funciona offline?**
R: Não, precisa de internet para acessar as APIs.

---

## 📞 Suporte

**Email:** brenograel299@gmail.com
**GitHub:** https://github.com/eujac1982-lgtm/hbc-studios-ia

---

**Desenvolvido com ❤️ por HBC STUDIOS**