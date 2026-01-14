# 📖 GUIA DE CAMPOS - DATA.JSON

Documentação completa de todos os campos do arquivo `data.json`.

---

## 📁 ESTRUTURA GERAL

```json
{
  "version": "2.0",
  "lastUpdate": "2026-01-14T00:00:00.000Z",
  "config": { ... },
  "months": [ ... ],
  "posts": { ... },
  "priorities": { ... },
  "campaigns": { ... }
}
```

---

## 🔧 CAMPOS RAIZ

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `version` | string | ✅ | Versão da estrutura ("2.0") |
| `lastUpdate` | string | ❌ | Data da última atualização (ISO 8601) |
| `config` | object | ✅ | Configurações do calendário |
| `months` | array | ✅ | Array com 12 meses |
| `posts` | object | ✅ | Posts organizados por mês |
| `priorities` | object | ❌ | Listas de prioridades |
| `campaigns` | object | ❌ | Campanhas especiais |

---

## ⚙️ OBJETO CONFIG

```json
{
  "config": {
    "companyName": "Nome da Empresa",
    "year": 2026,
    "foundedYear": 1960,
    "anniversary": "02-13"
  }
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `companyName` | string | ✅ | Nome da empresa |
| `year` | number | ✅ | Ano do calendário (2026) |
| `foundedYear` | number | ❌ | Ano de fundação |
| `anniversary` | string | ❌ | Aniversário formato "MM-DD" |

---

## 📅 ARRAY MONTHS

```json
{
  "months": [
    {
      "id": 1,
      "name": "Janeiro",
      "shortTheme": "Planejamento",
      "desc": "Início do ano com foco em metas",
      "posts": 10,
      "stories": 5
    }
  ]
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `id` | number | ✅ | Número do mês (1-12) |
| `name` | string | ✅ | Nome do mês |
| `shortTheme` | string | ✅ | Tema resumido do mês |
| `desc` | string | ❌ | Descrição do mês |
| `posts` | number | ❌ | Quantidade de posts |
| `stories` | number | ❌ | Quantidade de stories |

---

## 📝 OBJETO POSTS

```json
{
  "posts": {
    "1": [ array de posts de janeiro ],
    "2": [ array de posts de fevereiro ],
    ...
    "12": [ array de posts de dezembro ]
  }
}
```

Cada mês contém um array de objetos de post.

---

## 📄 ESTRUTURA DE UM POST

```json
{
  "id": 1,
  "date": "2026-01-01",
  "type": "DATA ESPECIAL",
  "format": "Carrossel 5 slides",
  "title": "🎆 Feliz 2026!",
  "desc": "Mensagem de ano novo",
  "priority": "alta",
  "status": "completo",
  "narrativa": "Roteiro completo...",
  "imagem": "Prompts de imagem...",
  "video": "Direção de vídeo...",
  "tela": "Textos na tela...",
  "legenda": "Legenda Instagram..."
}
```

### Campos Obrigatórios

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `id` | number | ID único do post no mês | `1`, `2`, `3` |
| `date` | string | Data formato ISO | `"2026-01-15"` |
| `type` | string | Categoria do post | `"DATA ESPECIAL"` |
| `format` | string | Formato do conteúdo | `"Carrossel 5 slides"` |
| `title` | string | Título com emoji | `"🎆 Feliz 2026!"` |
| `desc` | string | Descrição curta | `"Mensagem de ano novo"` |
| `priority` | string | Nível de prioridade | `"alta"` |
| `status` | string | Status atual | `"pendente"` |

### Campos de Conteúdo (Opcionais)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `narrativa` | string | Roteiro/script completo do post |
| `imagem` | string | Prompts para geração de imagem IA |
| `video` | string | Direção de vídeo, timing, transições |
| `tela` | string | Textos que aparecem na tela |
| `legenda` | string | Legenda completa com hashtags |

---

## 🏷️ VALORES PERMITIDOS

### TYPE (Categoria)

```
DATA ESPECIAL       - Datas importantes (Natal, Ano Novo)
COMEMORATIVA        - Datas comemorativas gerais
EDUCATIVO          - Conteúdo educacional
PROMOCIONAL        - Promoções e ofertas
INSTITUCIONAL      - Sobre a empresa
FERIADO            - Feriados nacionais/locais
CAMPANHA           - Campanhas mensais (Outubro Rosa, etc)
PRODUTO            - Destaque de produtos
BASTIDORES         - Behind the scenes
DEPOIMENTO         - Depoimentos de clientes
⭐ CORE BUSINESS   - Datas do negócio principal
⭐ MANCHESTER      - Específico da empresa
```

### FORMAT (Formato)

```
Post estático       - Imagem única
Carrossel 3 slides  - 3 imagens deslizantes
Carrossel 5 slides  - 5 imagens deslizantes
Carrossel 7 slides  - 7 imagens deslizantes
Carrossel 10 slides - 10 imagens deslizantes
Reels 15s          - Vídeo vertical 15 segundos
Reels 30s          - Vídeo vertical 30 segundos
Reels 60s          - Vídeo vertical 60 segundos
Stories            - Story único
Stories Sequência  - Múltiplos stories
Campanha completa  - Múltiplos formatos
```

### PRIORITY (Prioridade)

| Valor | CSS Class | Descrição |
|-------|-----------|-----------|
| `altissima` | `.altissima` | Datas cruciais do negócio |
| `alta` | `.alta` | Datas importantes |
| `media` | `.media` | Datas regulares |
| `baixa` | `.baixa` | Datas opcionais |

### STATUS

| Valor | Descrição |
|-------|-----------|
| `pendente` | Aguardando criação |
| `em_producao` | Em desenvolvimento |
| `aguardando_aprovacao` | Esperando aprovação |
| `aprovado` | Aprovado para publicar |
| `publicado` | Já publicado |
| `completo` | Finalizado com todo conteúdo |

---

## 📋 EXEMPLO COMPLETO DE POST

```json
{
  "id": 1,
  "date": "2026-01-01",
  "type": "DATA ESPECIAL",
  "format": "Carrossel 5 slides",
  "title": "🎆 Feliz 2026! O ano de construir",
  "desc": "Mensagem de ano novo + retrospectiva",
  "priority": "alta",
  "status": "completo",
  "narrativa": "ROTEIRO CARROSSEL ANO NOVO 2026\n═══════════════════════════\n\n📌 SLIDE 1 - CAPA\n━━━━━━━━━━━━━━━━━\nTÍTULO: \"FELIZ 2026!\"\nSUBTÍTULO: \"O ano de construir\"\n...",
  "imagem": "PROMPT IMAGEM SLIDE 1\n═══════════════════════════\n\nCinematic wide shot of golden fireworks...\n\nCOMPOSITION:\n- Rule of thirds...\n\nCOLORS:\n- Deep navy blue...",
  "video": "DIREÇÃO DE VÍDEO - STORIES\n═══════════════════════════\n\nFormato: 3 Stories (15s cada)\n\n[0:00-0:05] Countdown...\n[0:05-0:10] Explosão...",
  "tela": "TEXTOS NA TELA\n═══════════════════════════\n\n[SLIDE 1]\n\"FELIZ 2026!\"\n\"O ano de construir\"",
  "legenda": "🎆 FELIZ 2026!\n\nO ano de construir começa AGORA.\n\n2025 foi incrível:\n✅ +500 obras atendidas\n...\n\n#FelizAnoNovo #2026"
}
```

---

## ⚠️ VALIDAÇÃO

O arquivo `data.json` deve:

1. ✅ Ser um JSON válido (verificar em jsonlint.com)
2. ✅ Ter exatamente 12 meses no array `months`
3. ✅ Ter as chaves "1" a "12" no objeto `posts`
4. ✅ Cada post ter `id` único dentro do seu mês
5. ✅ Datas no formato `YYYY-MM-DD`
6. ✅ `priority` ser um dos valores permitidos
7. ✅ `status` ser um dos valores permitidos

Use o script `scripts/validate.py` para validar automaticamente.

---

*Documentação versão 1.0.0*
