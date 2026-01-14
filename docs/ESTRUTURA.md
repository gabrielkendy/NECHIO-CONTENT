# 📁 ESTRUTURA DE PASTAS DO TEMPLATE

```
CONTENT-STUDIO-TEMPLATE/
│
├── 📄 index.html              # Dashboard principal (NÃO EDITAR)
├── 📄 config.json             # ⚡ CONFIGURAÇÕES DO CLIENTE (EDITAR)
├── 📄 data.json               # 📅 CALENDÁRIO DE CONTEÚDO (EDITAR)
├── 📄 README.md               # Documentação do projeto
│
├── 📁 assets/                 # Arquivos do cliente
│   ├── logo.png               # ⚡ Logo do cliente (SUBSTITUIR)
│   ├── favicon.ico            # ⚡ Favicon do cliente (SUBSTITUIR)
│   └── (outros arquivos)
│
├── 📁 config/                 # Configurações adicionais
│   └── webhook.json           # ⚡ Configuração do webhook n8n
│
├── 📁 docs/                   # Documentação
│   ├── ESTRUTURA.md           # Este arquivo
│   ├── CHECKLIST.md           # Checklist de setup
│   └── CAMPOS.md              # Documentação dos campos
│
├── 📁 examples/               # Exemplos de configuração
│   ├── config-restaurante.json
│   ├── config-construcao.json
│   ├── config-ecommerce.json
│   └── config-servicos.json
│
├── 📁 scripts/                # Scripts utilitários
│   ├── validate.py            # Validador de JSON
│   └── setup.bat              # Script de setup inicial
│
└── 📁 .github/
    └── workflows/
        └── deploy.yml         # GitHub Actions para deploy
```

---

## 📝 ARQUIVOS QUE VOCÊ DEVE EDITAR

| Arquivo | O que fazer |
|---------|-------------|
| `config.json` | Preencher dados do cliente |
| `data.json` | Adicionar posts do calendário |
| `assets/logo.png` | Substituir pela logo do cliente |
| `assets/favicon.ico` | Substituir pelo favicon |
| `config/webhook.json` | Configurar webhook do n8n |

---

## 🚫 ARQUIVOS QUE NÃO DEVE EDITAR

| Arquivo | Motivo |
|---------|--------|
| `index.html` | Código do dashboard (automático) |
| `scripts/*` | Scripts de validação |
| `.github/*` | Configuração de deploy |
| `docs/*` | Documentação do template |

---

## 🔄 FLUXO DE USO

1. **Fork/Clone** este template
2. **Edite** `config.json` com dados do cliente
3. **Substitua** logo em `assets/`
4. **Preencha** `data.json` com calendário
5. **Configure** GitHub Pages
6. **Pronto!** Dashboard funcionando
