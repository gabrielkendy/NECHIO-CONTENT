# 📊 CONTENT STUDIO TEMPLATE

Template base para criação de dashboards de conteúdo para clientes.

**Desenvolvido por:** Kendy Produções

---

## 🚀 SETUP RÁPIDO (5 minutos)

### Passo 1: Criar repositório do cliente

1. Acesse este template no GitHub
2. Clique em **"Use this template"** → **"Create a new repository"**
3. Nome do repo: `NOME-DO-CLIENTE-CONTENT` (ex: `MANCHESTER-CONTENT`)
4. Marque como **Private** ou **Public**
5. Clique em **"Create repository"**

### Passo 2: Clonar para sua máquina

```bash
git clone https://github.com/SEU_USUARIO/NOME-DO-CLIENTE-CONTENT.git
cd NOME-DO-CLIENTE-CONTENT
```

### Passo 3: Configurar dados do cliente

1. Abra `config.json`
2. Preencha TODOS os campos marcados em MAIÚSCULO
3. Salve o arquivo

### Passo 4: Adicionar logo

1. Substitua `assets/logo.png` pela logo do cliente
2. Opcional: Adicione `assets/favicon.ico`

### Passo 5: Configurar GitHub Pages

1. No repositório, vá em **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **root**
4. Clique **Save**
5. Aguarde 2-3 minutos

### Passo 6: Acessar dashboard

URL: `https://SEU_USUARIO.github.io/NOME-DO-CLIENTE-CONTENT/`

---

## 📁 ESTRUTURA DE ARQUIVOS

```
📁 CLIENTE-CONTENT/
├── 📄 index.html        ← Dashboard (NÃO EDITAR)
├── 📄 config.json       ← ⚡ DADOS DO CLIENTE
├── 📄 data.json         ← ⚡ CALENDÁRIO DE POSTS
├── 📁 assets/
│   ├── logo.png         ← ⚡ LOGO DO CLIENTE
│   └── favicon.ico      ← ⚡ ÍCONE (opcional)
├── 📁 config/
│   └── webhook.json     ← ⚡ CONFIGURAÇÃO N8N
├── 📁 docs/             ← Documentação
├── 📁 examples/         ← Exemplos
└── 📁 scripts/          ← Utilitários
```

**⚡ = Arquivos que você DEVE editar para cada cliente**

---

## ⚙️ CONFIGURAÇÃO DO CLIENTE (config.json)

### Campos obrigatórios:

```json
{
  "cliente": {
    "id": "CLIENTE_ID",           ← Identificador único (sem espaços)
    "nome": "NOME DA EMPRESA",    ← Nome que aparece no header
    "subtitulo": "Content Studio 2026"
  },
  "contato": {
    "telefone": "(00) 0000-0000",
    "whatsapp": "5500000000000",
    "email": "contato@empresa.com.br"
  },
  "cores": {
    "primaria": "#C41E3A",        ← Cor principal da marca
    "destaque": "#C9A227"         ← Cor de destaque
  }
}
```

### Cores padrão disponíveis:

| Setor | Cor Primária | Cor Destaque |
|-------|--------------|--------------|
| Construção | `#C41E3A` | `#C9A227` |
| Restaurante | `#E63946` | `#F4A261` |
| E-commerce | `#2563EB` | `#10B981` |
| Saúde | `#059669` | `#0891B2` |
| Jurídico | `#1E3A5F` | `#B8860B` |

---

## 📅 ESTRUTURA DE POSTS (data.json)

### Estrutura de um post:

```json
{
  "id": 1,
  "date": "2026-01-01",
  "type": "DATA ESPECIAL",
  "format": "Carrossel 5 slides",
  "title": "🎆 Título do Post",
  "desc": "Descrição breve",
  "priority": "alta",
  "status": "pendente",
  "narrativa": "Roteiro completo...",
  "imagem": "Prompts de imagem...",
  "video": "Direção de vídeo...",
  "tela": "Textos na tela...",
  "legenda": "Legenda Instagram..."
}
```

### Campos do post:

| Campo | Obrigatório | Descrição |
|-------|-------------|-----------|
| `id` | ✅ | Número único do post |
| `date` | ✅ | Data no formato YYYY-MM-DD |
| `type` | ✅ | Categoria do post |
| `format` | ✅ | Formato (Carrossel, Reels, etc) |
| `title` | ✅ | Título com emoji |
| `desc` | ✅ | Descrição curta |
| `priority` | ✅ | altissima, alta, media, baixa |
| `status` | ✅ | pendente, em_producao, completo |
| `narrativa` | ❌ | Roteiro/script completo |
| `imagem` | ❌ | Prompts para geração de imagem |
| `video` | ❌ | Direção de vídeo |
| `tela` | ❌ | Textos que aparecem na tela |
| `legenda` | ❌ | Legenda completa com hashtags |

---

## 🔌 WEBHOOK N8N (opcional)

Para habilitar o botão Deploy:

1. Crie um workflow no n8n com webhook
2. Edite `config.json`:

```json
{
  "webhook": {
    "url": "https://seu-n8n.app.n8n.cloud/webhook/cliente-deploy",
    "ativo": true,
    "clienteId": "CLIENTE_ID"
  }
}
```

---

## ❓ PROBLEMAS COMUNS

### Dashboard não carrega
- Verifique se GitHub Pages está ativo
- Aguarde 2-3 minutos após configurar
- Limpe cache do navegador (Ctrl+F5)

### Logo não aparece
- Verifique se o arquivo é `logo.png` (não .PNG, .jpg)
- Tamanho recomendado: 200x80px ou proporcional

### Cores não mudam
- Verifique se `config.json` está válido (use jsonlint.com)
- Limpe cache do navegador

### Botão Deploy não funciona
- Verifique se `webhook.url` está preenchido
- Verifique se `webhook.ativo` é `true`
- Teste a URL do webhook separadamente

---

## 📞 SUPORTE

**Kendy Produções**
- WhatsApp: (21) XXXXX-XXXX
- Email: contato@kendyproducoes.com.br

---

*Template versão 1.0.0 - Janeiro 2026*
