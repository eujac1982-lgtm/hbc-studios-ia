# 🚀 GUIA COMPLETO - HBC STUDIOS IA v2.0

## 📋 O QUE FOI CRIADO?

Um **Super Assistente IA Completo** com:

✅ **ChatBot** - Conversa com 3 IAs (OpenAI, Claude, Gemini)
✅ **Gerador** - Cria conteúdo (textos, código, poesias, histórias, emails, SEO)
✅ **Visão** - Analisa imagens e responde perguntas sobre elas
✅ **Voz** - Reconhece fala e responde com áudio
✅ **Pagamentos** - Sistema Stripe integrado
✅ **Admin** - Dashboard para gerenciar usuários
✅ **Autenticação** - JWT seguro

---

## 🔧 INSTALAÇÃO PASSO A PASSO

### 1️⃣ Pré-requisitos
```bash
# Node.js 18+ instalado?
node --version

# npm/yarn instalado?
npm --version
```

### 2️⃣ Clonar Repositório
```bash
git clone https://github.com/eujac1982-lgtm/hbc-studios-ia.git
cd hbc-studios-ia
```

### 3️⃣ Instalar Dependências
```bash
npm install
```

### 4️⃣ Configurar Variáveis de Ambiente

Abra a pasta e crie um arquivo `.env`:

```bash
# Database
MONGODB_URI=mongodb+srv://seu_user:sua_senha@seu_cluster.mongodb.net/hbc-studios-ia

# JWT
JWT_SECRET=sua_chave_secreta_muito_forte_123456789
JWT_EXPIRE=7d

# OpenAI API
OPENAI_API_KEY=sk-proj-seu_key_aqui

# Claude API
CLAUDE_API_KEY=sk-ant-seu_key_aqui

# Google Gemini
GOOGLE_GEMINI_KEY=seu_key_aqui

# Stripe
STRIPE_SECRET_KEY=sk_test_seu_key
STRIPE_PUBLISHABLE_KEY=pk_test_seu_key

# Email
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_app
ADMIN_EMAIL=brenograel299@gmail.com

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 5️⃣ Obter Chaves de API

#### 🟢 OpenAI (ChatGPT)
1. Ir para https://platform.openai.com/api-keys
2. Criar nova chave
3. Copiar para `.env`

#### 🔴 Claude (Anthropic)
1. Ir para https://console.anthropic.com
2. Criar nova chave
3. Copiar para `.env`

#### 🟡 Google Gemini
1. Ir para https://makersuite.google.com/app/apikey
2. Criar nova chave
3. Copiar para `.env`

#### 🟦 MongoDB
1. Ir para https://www.mongodb.com/cloud/atlas
2. Criar cluster grátis
3. Copiar connection string para `.env`

#### 💳 Stripe
1. Ir para https://stripe.com
2. Criar conta
3. Ir para API Keys
4. Copiar test keys para `.env`

### 6️⃣ Rodar o Servidor
```bash
npm run dev
```

Você verá algo assim:
```
🚀 ============================================
🚀 HBC STUDIOS IA - Super Assistente
🚀 Servidor rodando em http://localhost:5000
🚀 ============================================

📊 Recursos Disponíveis:
   ✅ ChatBot IA (OpenAI, Claude, Gemini)
   ✅ Gerador de Conteúdo
   ✅ Análise de Imagens (Visão)
   ✅ Assistente de Voz
   ✅ Sistema de Pagamentos (Stripe)
   ✅ Dashboard Admin

📧 Proprietário: brenograel299@gmail.com
📚 Documentação: http://localhost:5000/IA-ASSISTANT-DOCS.md
🌐 Interface: http://localhost:5000/super-ia
```

---

## 📱 USAR A APLICAÇÃO

### Abrir no Navegador
```
http://localhost:5000/super-ia
```

### 1️⃣ ChatBot
1. Selecione a IA (OpenAI, Claude ou Gemini)
2. Digite uma pergunta
3. Clique "Enviar"
4. IA responde

**Exemplos:**
- "Qual é a capital do Brasil?"
- "Explique machine learning em 3 linhas"
- "Crie uma lista de 10 dicas de produtividade"

### 2️⃣ Gerador de Conteúdo
1. Escolha o tipo (Texto, Código, Poesia, História, Email, SEO)
2. Descreva o que quer gerar
3. Clique "Gerar Conteúdo"
4. Copie ou baixe o resultado

**Exemplos:**
- **Tipo**: Código → **Prompt**: "API REST com autenticação JWT"
- **Tipo**: Poesia → **Prompt**: "Sobre a beleza da natureza"
- **Tipo**: Email → **Prompt**: "Proposta comercial para cliente novo"

### 3️⃣ Análise de Imagens
1. Clique na área ou arraste uma foto
2. Digite uma pergunta sobre a imagem
3. Clique "Analisar Imagem"
4. IA descreve e responde

**Exemplos:**
- "Qual objeto é este?"
- "Extraia o texto da imagem"
- "Descreva a composição e cores"

### 4️⃣ Assistente de Voz
1. Clique no botão redondo 🎤
2. Fale sua pergunta
3. Clique novamente para parar
4. IA responde automaticamente
5. Clique "🔊 Ouvir Resposta" para áudio

---

## 🧪 TESTAR VIA CURL

### Registrar Usuário
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

**Resposta:**
```json
{
  "message": "✅ Usuário registrado!",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "João Silva",
    "email": "joao@example.com",
    "plan": "free",
    "credits": 100
  }
}
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

### ChatBot - OpenAI
```bash
TOKEN="seu_token_aqui"

curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "message": "Olá! Como você está?",
    "aiProvider": "openai"
  }'
```

### ChatBot - Claude
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "message": "O que é IA?",
    "aiProvider": "claude"
  }'
```

### ChatBot - Gemini
```bash
curl -X POST http://localhost:5000/api/chat/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "message": "Conte uma piada",
    "aiProvider": "gemini"
  }'
```

### Gerar Conteúdo
```bash
curl -X POST http://localhost:5000/api/chat/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "contentType": "poem",
    "prompt": "Sobre a beleza da natureza",
    "aiProvider": "openai"
  }'
```

### Histórico
```bash
curl -X GET http://localhost:5000/api/chat/history \
  -H "Authorization: Bearer $TOKEN"
```

---

## 📊 ESTRUTURA DO PROJETO

```
hbc-studios-ia/
├── models/
│   ├── User.js           # Schema de usuário
│   └── Message.js        # Schema de mensagens
├── routes/
│   ├── auth.js           # Autenticação
│   ├── chat.js           # Chat básico
│   ├── chat-advanced.js  # Chat com visão + gerador
│   ├── payments.js       # Pagamentos Stripe
│   ├── admin.js          # Dashboard admin
│   └── users.js          # Perfil do usuário
├── server.js             # Servidor principal
├── package.json          # Dependências
├── .env.example          # Variáveis de exemplo
├── README.md             # Documentação básica
├── SETUP.md              # Guia de setup
├── IA-ASSISTANT-DOCS.md  # Docs do Super Assistente
├── QUICK-START.md        # Este arquivo
├── super-ia-assistant.html      # Interface principal
└── digital-clock.html    # Relógio digital bônus
```

---

## 🔐 Sistema de Créditos

```
Free Plan       = 100 créditos
Pro Plan        = 1000 créditos/mês (R$ 49)
Business Plan   = Ilimitado (R$ 149)

Cada interação usa:
- Chat simples         = 1-5 créditos
- Geração de código    = 10-15 créditos
- Análise de imagem    = 10 créditos
- Voz                  = 5 créditos
```

---

## 🐛 Solução de Problemas

### "Erro: Token inválido"
→ Faça login novamente e pegue um novo token

### "API Key inválida"
→ Verifique se copiou certo a chave no `.env`
→ Verifique se a chave tem permissões corretas

### "Erro de conexão MongoDB"
→ Verifique a connection string
→ Confira se está permitindo seu IP no MongoDB Atlas

### "Porta 5000 já em uso"
→ `lsof -i :5000` (Mac/Linux)
→ Ou mude PORT no `.env`

### "Nenhum som no reconhecimento de voz"
→ Use Chrome, Firefox ou Edge (Safari tem limitações)
→ Verifique permissões do microfone

---

## 📦 Fazer Deploy

### Heroku
```bash
heroku create seu-app-hbc-studios
git push heroku main
heroku config:set MONGODB_URI=...
heroku config:set OPENAI_API_KEY=...
# ... configurar outras chaves
```

### Vercel (Frontend apenas)
```bash
npm install -g vercel
vercel
```

### Railway/Render
1. Conectar repositório GitHub
2. Configurar variáveis de ambiente
3. Deploy automático

---

## 🎯 Próximas Funcionalidades

- [ ] Integração com mais IAs (Cohere, Stability AI)
- [ ] Gerador de imagens (DALL-E, Midjourney)
- [ ] Tradução em tempo real
- [ ] Análise de vídeos
- [ ] Chatbot customizado por empresa
- [ ] Mobile app (React Native)

---

## 💬 Suporte

**Email:** brenograel299@gmail.com
**GitHub:** https://github.com/eujac1982-lgtm/hbc-studios-ia
**Issues:** Abra um issue no GitHub

---

## 📄 Licença

MIT License - Livre para usar e modificar

---

## ❤️ Créditos

Desenvolvido por **HBC STUDIOS** com suporte de:
- OpenAI (ChatGPT 4)
- Anthropic (Claude 3)
- Google (Gemini)
- Node.js
- MongoDB
- Express.js
- Stripe

---

**Aproveite! 🎉**

Qualquer dúvida, abra uma issue ou entre em contato!

**Email:** brenograel299@gmail.com