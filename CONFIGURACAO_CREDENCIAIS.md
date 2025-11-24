# 🔐 Configuração de Credenciais

## ✅ Problema Resolvido!

O GitHub bloqueou o push inicial porque detectou credenciais sensíveis no código. Agora as credenciais estão seguras usando variáveis de ambiente.

---

## 📝 Como Configurar Localmente

### Opção 1: Criar arquivo .env manualmente

1. **Copie o arquivo de exemplo:**
   ```bash
   copy env.example .env
   ```
   (No PowerShell: `Copy-Item env.example .env`)

2. **Edite o arquivo `.env`** e preencha com suas credenciais reais:

   ```env
   # Azure Blob Storage
   AZURE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=SEU_ACCOUNT_NAME;AccountKey=SUA_ACCOUNT_KEY;EndpointSuffix=core.windows.net
   AZURE_ACCOUNT_NAME=seu-account-name
   AZURE_ACCOUNT_KEY=sua-account-key-aqui
   AZURE_CONTAINER_NAME=aluno-andrelss

   # Google Drive
   GOOGLE_CREDENTIALS_PATH=./credentials.json
   GOOGLE_DRIVE_FOLDER_ID=seu-folder-id-aqui

   # Servidor
   PORT=3000
   ```

### Opção 2: Usar o script de setup

```bash
node setup-env.js
```

Depois edite o arquivo `.env` criado com suas credenciais.

---

## ✅ Verificar se está funcionando

Após criar o arquivo `.env`, teste a configuração:

```bash
npm test
```

Se tudo estiver correto, você verá:
- ✅ Arquivo credentials.json encontrado e válido
- ✅ Autenticação com Google Drive bem-sucedida
- ✅ Autenticação com Azure Blob Storage bem-sucedida

---

## 🛡️ Segurança

- ✅ O arquivo `.env` está no `.gitignore` e **NÃO será enviado ao GitHub**
- ✅ O arquivo `credentials.json` também está protegido
- ✅ Apenas o arquivo `env.example` (sem credenciais reais) está versionado

---

## 📋 Variáveis de Ambiente Disponíveis

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `AZURE_CONNECTION_STRING` | Connection String completa do Azure | Sim* |
| `AZURE_ACCOUNT_NAME` | Nome da conta do Azure | Sim* |
| `AZURE_ACCOUNT_KEY` | Chave da conta do Azure | Sim* |
| `AZURE_CONTAINER_NAME` | Nome do contêiner | Não (padrão: aluno-andrelss) |
| `GOOGLE_CREDENTIALS_PATH` | Caminho para credentials.json | Não (padrão: ./credentials.json) |
| `GOOGLE_DRIVE_FOLDER_ID` | ID da pasta do Google Drive | Não (pode usar interface web) |
| `PORT` | Porta do servidor | Não (padrão: 3000) |

*Use `AZURE_CONNECTION_STRING` OU `AZURE_ACCOUNT_NAME` + `AZURE_ACCOUNT_KEY`

---

## 🚀 Próximos Passos

1. ✅ Crie o arquivo `.env` com suas credenciais
2. ✅ Certifique-se de que `credentials.json` existe
3. ✅ Execute `npm test` para verificar
4. ✅ Execute `npm start` para iniciar o servidor

---

## ❓ Problemas?

Se a aplicação não encontrar as credenciais:

1. Verifique se o arquivo `.env` existe na raiz do projeto
2. Verifique se as variáveis estão escritas corretamente (sem espaços extras)
3. Reinicie o servidor após criar/editar o `.env`
4. Execute `npm test` para diagnosticar problemas

