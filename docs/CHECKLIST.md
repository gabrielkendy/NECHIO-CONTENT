# ✅ CHECKLIST DE ONBOARDING - NOVO CLIENTE

Use este checklist para cada novo cliente. Marque [x] conforme completar.

---

## 📋 INFORMAÇÕES NECESSÁRIAS DO CLIENTE

Antes de começar, colete:

- [ ] Nome completo da empresa
- [ ] CNPJ (opcional)
- [ ] Logo em PNG (fundo transparente, alta resolução)
- [ ] Cores da marca (primária e secundária)
- [ ] Telefone principal
- [ ] WhatsApp (com código do país: 55)
- [ ] E-mail de contato
- [ ] Site (se tiver)
- [ ] Instagram @
- [ ] Outras redes sociais
- [ ] Data de aniversário da empresa
- [ ] Ano de fundação

---

## 🚀 ETAPAS DE SETUP

### ETAPA 1: Criar Repositório
- [ ] Acessar template no GitHub
- [ ] Clicar "Use this template"
- [ ] Nomear: `CLIENTE-CONTENT` (ex: MANCHESTER-CONTENT)
- [ ] Criar como repositório privado/público
- [ ] Clonar para máquina local

### ETAPA 2: Configurar config.json
- [ ] Abrir `config.json`
- [ ] Preencher `cliente.id` (identificador único, sem espaços)
- [ ] Preencher `cliente.nome`
- [ ] Preencher `cliente.nomeCompleto`
- [ ] Preencher `cliente.slogan`
- [ ] Preencher `cliente.anoFundacao`
- [ ] Preencher `cliente.aniversario` (formato: MM-DD)
- [ ] Preencher `contato.telefone`
- [ ] Preencher `contato.whatsapp`
- [ ] Preencher `contato.email`
- [ ] Preencher `contato.site`
- [ ] Preencher `endereco.*`
- [ ] Preencher `redesSociais.*`
- [ ] Ajustar `cores.primaria` (cor da marca)
- [ ] Ajustar `cores.destaque` (cor secundária)
- [ ] Salvar arquivo

### ETAPA 3: Adicionar Assets
- [ ] Copiar logo do cliente para `assets/logo.png`
- [ ] Verificar se logo carrega corretamente
- [ ] (Opcional) Criar favicon e salvar em `assets/favicon.ico`

### ETAPA 4: Configurar Calendário Inicial
- [ ] Abrir `data.json`
- [ ] Preencher `config.companyName`
- [ ] Preencher `config.year`
- [ ] Preencher `config.foundedYear`
- [ ] Preencher `config.anniversary`
- [ ] Definir temas de cada mês em `months[].shortTheme`
- [ ] Definir descrições de cada mês em `months[].desc`
- [ ] Adicionar posts iniciais (pelo menos 1 por mês)
- [ ] Validar JSON (executar `scripts/validate.py`)

### ETAPA 5: Configurar Webhook (opcional)
- [ ] Criar workflow no n8n para este cliente
- [ ] Copiar URL do webhook
- [ ] Editar `config.json`
- [ ] Preencher `webhook.url`
- [ ] Definir `webhook.ativo` como `true`
- [ ] Preencher `webhook.clienteId`
- [ ] Testar botão Deploy

### ETAPA 6: Publicar
- [ ] Fazer commit de todas as alterações
- [ ] Push para o GitHub
- [ ] Configurar GitHub Pages (Settings → Pages)
- [ ] Selecionar branch `main`
- [ ] Aguardar deploy (2-3 minutos)
- [ ] Testar URL do dashboard
- [ ] Testar todas as funcionalidades

### ETAPA 7: Documentar
- [ ] Anotar URL do dashboard
- [ ] Anotar credenciais (se houver)
- [ ] Enviar link para o cliente (se aplicável)
- [ ] Adicionar à lista de clientes ativos

---

## 🧪 TESTES OBRIGATÓRIOS

Antes de entregar, verifique:

- [ ] Dashboard carrega sem erros
- [ ] Logo aparece corretamente
- [ ] Nome da empresa aparece no header
- [ ] Cores da marca estão aplicadas
- [ ] Seletor de mês funciona
- [ ] Posts aparecem na lista
- [ ] Modal de post abre
- [ ] Abas de conteúdo funcionam (se houver conteúdo)
- [ ] Botão Copiar funciona
- [ ] Botão Backup exporta JSON
- [ ] Botão Importar carrega JSON
- [ ] Botão Salvar funciona
- [ ] (Se configurado) Botão Deploy funciona

---

## 📊 REGISTRO DO CLIENTE

Após concluir, preencha:

| Campo | Valor |
|-------|-------|
| Cliente ID | |
| Nome | |
| Data de setup | |
| URL Dashboard | |
| Repositório | |
| Webhook URL | |
| Responsável | |
| Observações | |

---

## ⏱️ TEMPO ESTIMADO

| Etapa | Tempo |
|-------|-------|
| Coleta de informações | 10 min |
| Criar repositório | 2 min |
| Configurar config.json | 5 min |
| Adicionar assets | 3 min |
| Configurar calendário | 15 min |
| Configurar webhook | 5 min |
| Publicar e testar | 5 min |
| **TOTAL** | **~45 min** |

---

*Checklist versão 1.0.0*
