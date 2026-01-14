# 🤖 GUIA DE IMPLEMENTAÇÃO PARA IA
## Content Studio - Template de Dashboard

**Versão:** 1.0.0
**Autor:** Kendy Produções
**Data:** Janeiro 2026

---

# 📍 LINKS IMPORTANTES

## Repositório Template (GitHub)
```
https://github.com/gabrielkendy/CONTENT-STUDIO-TEMPLATE
```

## Dashboard Template (GitHub Pages)
```
https://gabrielkendy.github.io/CONTENT-STUDIO-TEMPLATE/
```

## Pasta Local (Windows)
```
C:\Users\Gabriel\CONTENT-STUDIO-TEMPLATE
```

---

# 📁 ESTRUTURA DE ARQUIVOS

```
C:\Users\Gabriel\CONTENT-STUDIO-TEMPLATE\
│
├── index.html                 # Dashboard principal (1449 linhas)
├── config.json                # Configurações do cliente (119 linhas)
├── data.json                  # Calendário de posts (46 linhas template)
├── README.md                  # Documentação principal
├── .gitignore                 # Arquivos ignorados pelo Git
│
├── assets/
│   ├── logo.png               # Logo do cliente (SUBSTITUIR)
│   └── README.md              # Instruções de assets
│
├── config/
│   └── webhook.json           # Configuração do webhook n8n
│
├── docs/
│   ├── ESTRUTURA.md           # Estrutura de pastas
│   ├── CHECKLIST.md           # Checklist de onboarding
│   └── CAMPOS.md              # Documentação dos campos
│
├── examples/
│   ├── config-construcao.json # Exemplo: construção civil
│   ├── config-restaurante.json# Exemplo: restaurante
│   ├── config-ecommerce.json  # Exemplo: e-commerce
│   └── config-servicos.json   # Exemplo: serviços
│
├── scripts/
│   ├── setup.bat              # Script de setup Windows
│   └── validate.py            # Validador de JSON
│
└── .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions para deploy
```

---

# 🔧 COMO IMPLEMENTAR PARA UM NOVO CLIENTE

## PASSO 1: Criar Repositório do Cliente

### Opção A: Via GitHub (Recomendado)
1. Acessar: https://github.com/gabrielkendy/CONTENT-STUDIO-TEMPLATE
2. Clicar "Use this template" → "Create a new repository"
3. Nomear: `NOME-DO-CLIENTE-CONTENT` (ex: `MANCHESTER-CONTENT`)
4. Criar como Public ou Private

### Opção B: Via Terminal
```bash
# Clonar template
git clone https://github.com/gabrielkendy/CONTENT-STUDIO-TEMPLATE.git NOME-DO-CLIENTE-CONTENT
cd NOME-DO-CLIENTE-CONTENT

# Remover origin antigo e adicionar novo
git remote remove origin
git remote add origin https://github.com/gabrielkendy/NOME-DO-CLIENTE-CONTENT.git
```

---

## PASSO 2: Configurar config.json

### Campos OBRIGATÓRIOS para preencher:

```json
{
  "cliente": {
    "id": "CLIENTE_ID",              // Identificador único, sem espaços
    "nome": "NOME DA EMPRESA",       // Nome no header
    "nomeCompleto": "Razão Social",  // Nome completo
    "slogan": "Slogan da empresa",   // Tagline
    "subtitulo": "Content Studio 2026",
    "ano": 2026,
    "anoFundacao": 1960,             // Ano de fundação
    "aniversario": "02-13"           // Formato MM-DD
  },
  "contato": {
    "telefone": "(21) 3214-1300",
    "whatsapp": "5521999999999",     // Com código do país
    "email": "contato@empresa.com.br",
    "site": "https://www.empresa.com.br"
  },
  "cores": {
    "primaria": "#C41E3A",           // Cor principal da marca
    "destaque": "#C9A227"            // Cor secundária
  },
  "webhook": {
    "url": "",                       // URL do webhook n8n (opcional)
    "ativo": false,                  // true para habilitar Deploy
    "clienteId": "CLIENTE_ID"
  }
}
```

### Paletas de Cores por Setor:

| Setor | Primária | Destaque |
|-------|----------|----------|
| Construção/Indústria | `#C41E3A` | `#C9A227` |
| Restaurante/Food | `#E63946` | `#F4A261` |
| E-commerce | `#2563EB` | `#10B981` |
| Saúde | `#059669` | `#0891B2` |
| Jurídico | `#1E3A5F` | `#B8860B` |
| Tech/Startup | `#7C3AED` | `#06B6D4` |

---

## PASSO 3: Substituir Logo

1. Obter logo do cliente em PNG (fundo transparente)
2. Redimensionar para altura máxima de 80px
3. Salvar como `assets/logo.png`
4. Opcional: criar `assets/favicon.ico` (32x32px)

---

## PASSO 4: Preencher data.json

### Estrutura do data.json:

```json
{
  "version": "2.0",
  "lastUpdate": "2026-01-14T00:00:00.000Z",
  "config": {
    "companyName": "NOME DA EMPRESA",
    "year": 2026,
    "foundedYear": 1960,
    "anniversary": "02-13"
  },
  "months": [
    {
      "id": 1,
      "name": "Janeiro",
      "shortTheme": "TEMA DO MÊS",
      "desc": "Descrição do tema",
      "posts": 10,
      "stories": 5
    }
    // ... 12 meses
  ],
  "posts": {
    "1": [ /* posts de janeiro */ ],
    "2": [ /* posts de fevereiro */ ],
    // ... até "12"
  }
}
```

### Estrutura de cada POST:

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
  "narrativa": "ROTEIRO COMPLETO...",
  "imagem": "PROMPTS DE IMAGEM...",
  "video": "DIREÇÃO DE VÍDEO...",
  "tela": "TEXTOS NA TELA...",
  "legenda": "LEGENDA INSTAGRAM..."
}
```

### Valores válidos:

**type (categoria):**
- DATA ESPECIAL
- COMEMORATIVA
- EDUCATIVO
- PROMOCIONAL
- INSTITUCIONAL
- FERIADO
- CAMPANHA
- PRODUTO
- BASTIDORES
- DEPOIMENTO

**format:**
- Post estático
- Carrossel 3 slides
- Carrossel 5 slides
- Carrossel 7 slides
- Carrossel 10 slides
- Reels 15s / 30s / 60s
- Stories / Stories Sequência

**priority:**
- altissima
- alta
- media
- baixa

**status:**
- pendente
- em_producao
- aguardando_aprovacao
- aprovado
- publicado
- completo

---

## PASSO 5: Push e Deploy

```bash
# Adicionar alterações
git add .

# Commit
git commit -m "Setup NOME_CLIENTE"

# Push
git push origin main
```

### Configurar GitHub Pages:
1. Acessar Settings → Pages
2. Source: Deploy from a branch
3. Branch: main / root
4. Save
5. Aguardar 2-3 minutos

### URL Final:
```
https://gabrielkendy.github.io/NOME-DO-CLIENTE-CONTENT/
```

---

# 📋 CHECKLIST RÁPIDO

```
[ ] Repositório criado a partir do template
[ ] config.json preenchido com dados do cliente
[ ] Logo substituída em assets/logo.png
[ ] data.json preenchido com calendário
[ ] Commit e push realizados
[ ] GitHub Pages configurado
[ ] Dashboard testado e funcionando
```

---

# ⚠️ ERROS COMUNS E SOLUÇÕES

## Dashboard não carrega
- Verificar se GitHub Pages está ativo
- Aguardar 2-3 minutos
- Limpar cache (Ctrl+F5)

## Logo não aparece
- Verificar se é PNG (não JPG)
- Verificar nome: `logo.png` (minúsculo)
- Verificar path: `assets/logo.png`

## Cores não mudam
- Validar JSON em jsonlint.com
- Verificar se cores têm # (ex: #C41E3A)

## Posts não aparecem
- Verificar estrutura do data.json
- Executar validate.py para encontrar erros
- Verificar se mês tem posts no array correto

---

# 🔗 REFERÊNCIAS

## Arquivos Locais:
- Template: `C:\Users\Gabriel\CONTENT-STUDIO-TEMPLATE\`
- Config: `C:\Users\Gabriel\CONTENT-STUDIO-TEMPLATE\config.json`
- Data: `C:\Users\Gabriel\CONTENT-STUDIO-TEMPLATE\data.json`
- Index: `C:\Users\Gabriel\CONTENT-STUDIO-TEMPLATE\index.html`

## GitHub:
- Template: https://github.com/gabrielkendy/CONTENT-STUDIO-TEMPLATE
- Pages: https://gabrielkendy.github.io/CONTENT-STUDIO-TEMPLATE/

## Documentação:
- CHECKLIST: `docs/CHECKLIST.md`
- CAMPOS: `docs/CAMPOS.md`
- ESTRUTURA: `docs/ESTRUTURA.md`

---

# 🎯 EXEMPLO COMPLETO: MANCHESTER

## config.json para Manchester:

```json
{
  "cliente": {
    "id": "MANCHESTER",
    "nome": "GRUPO MANCHESTER",
    "nomeCompleto": "Grupo Manchester Distribuidora de Aço Ltda",
    "slogan": "Construindo o Rio de Janeiro desde 1960",
    "subtitulo": "Content Studio 2026",
    "ano": 2026,
    "anoFundacao": 1960,
    "aniversario": "02-13"
  },
  "contato": {
    "telefone": "(21) 3214-1300",
    "whatsapp": "5521999999999",
    "email": "contato@grupomanchester.com.br",
    "site": "https://www.grupomanchester.com.br"
  },
  "cores": {
    "primaria": "#C41E3A",
    "destaque": "#C9A227"
  },
  "webhook": {
    "url": "https://agenciabase.app.n8n.cloud/webhook/manchester-deploy",
    "ativo": true,
    "clienteId": "MANCHESTER"
  }
}
```

---

*Documentação gerada em 14/01/2026*
*Kendy Produções - Content Studio Template v1.0.0*
