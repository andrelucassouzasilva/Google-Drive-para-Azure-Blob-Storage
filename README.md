# Transferência Google Drive → Azure Blob Storage

Aplicação JavaScript para copiar arquivos de uma pasta específica do Google Drive para um contêiner no Azure Blob Storage.

## 📋 Requisitos

- Node.js (versão 14 ou superior)
- NPM ou Yarn
- Conta Google com acesso ao Google Drive
- Conta Azure com Blob Storage configurado

## 🚀 Instalação

1. Clone ou baixe este repositório

2. Instale as dependências:
```bash
npm install
```

3. Configure as credenciais do Google Drive:
   - Acesse o [Google Cloud Console](https://console.cloud.google.com/)
   - Crie um novo projeto ou selecione um existente
   - Ative a API do Google Drive
   - Crie uma Service Account
   - Baixe o arquivo JSON de credenciais
   - Renomeie o arquivo para `credentials.json` e coloque na raiz do projeto

4. Configure o ID da pasta do Google Drive:
   - **📖 Consulte o guia detalhado**: `PASSO_A_PASSO_COMPARTILHAR.md`
   - Abra o arquivo `config.js`
   - Defina o `folderId` em `config.google.folderId` (opcional, pode ser definido via interface web)
   - **IMPORTANTE**: Compartilhe a pasta com o email da Service Account: `p2cnii@p2cnii.iam.gserviceaccount.com`

## ⚙️ Configuração

O arquivo `config.js` contém as seguintes configurações:

- **Azure Blob Storage**: Connection String, nome do contêiner (já configurado)
- **Google Drive**: Caminho para o arquivo de credenciais
- **Servidor**: Porta do servidor (padrão: 3000)

## 🎯 Uso

### Via Interface Web

1. Inicie o servidor:
```bash
npm start
```

2. Acesse no navegador:
```
http://localhost:3000
```

3. Use a interface para:
   - Listar arquivos do Google Drive
   - Listar arquivos do Azure Blob Storage
   - Transferir arquivos entre as plataformas

### Via Linha de Comando (CLI)

A aplicação inclui um CLI para uso via terminal:

```bash
# Listar arquivos do Google Drive
npm run cli list-drive

# Listar arquivos do Google Drive de uma pasta específica
npm run cli list-drive 1a2b3c4d5e6f7g8h9i0j

# Listar arquivos do Azure Blob Storage
npm run cli list-blob

# Transferir arquivos (usa folderId do config.js)
npm run cli transfer

# Transferir arquivos de uma pasta específica
npm run cli transfer 1a2b3c4d5e6f7g8h9i0j

# Buscar pasta pelo nome no Google Drive
npm run cli find-folder "Nome da Pasta"

# Exibir ajuda
npm run cli help
```

Ou use diretamente:
```bash
node cli.js <comando> [opções]
```

## 📁 Estrutura do Projeto

```
.
├── config.js                 # Configurações da aplicação
├── googleDriveService.js     # Serviço de integração com Google Drive
├── azureBlobService.js       # Serviço de integração com Azure Blob Storage
├── transferService.js        # Serviço de transferência de arquivos
├── server.js                 # Servidor Express e rotas da API
├── cli.js                    # Interface de linha de comando
├── public/
│   └── index.html           # Interface web
├── credentials.json         # Credenciais do Google (não versionado)
└── package.json            # Dependências do projeto
```

## 🔐 Segurança

⚠️ **IMPORTANTE**: 
- O arquivo `credentials.json` contém informações sensíveis e não deve ser versionado
- A Connection String do Azure também contém credenciais sensíveis
- Em produção, use variáveis de ambiente ou um gerenciador de segredos

## 📝 Funcionalidades

- ✅ Autenticação segura com Google Drive (Service Account)
- ✅ Autenticação segura com Azure Blob Storage (Connection String)
- ✅ Listagem de arquivos do Google Drive
- ✅ Listagem de arquivos do Azure Blob Storage
- ✅ Transferência de arquivos com relatório de status
- ✅ Interface web para gerenciamento
- ✅ Interface de linha de comando (CLI)
- ✅ API REST para integração

## 📚 Guias Detalhados

- **`PASSO_A_PASSO_COMPARTILHAR.md`** - Guia completo para compartilhar pasta do Google Drive
- **`GUIA_CONFIGURACAO.md`** - Guia geral de configuração

## 🧪 Testar Configuração

Após configurar as credenciais, execute o teste:

```bash
npm test
```

Este comando verifica:
- ✅ Se o arquivo `credentials.json` existe e é válido
- ✅ Se a autenticação com Google Drive funciona
- ✅ Se a autenticação com Azure funciona
- ✅ Se a pasta do Google Drive está acessível

## 🐛 Solução de Problemas

### Erro de autenticação no Google Drive
- Verifique se o arquivo `credentials.json` existe e está no formato correto
- Certifique-se de que a Service Account tem permissões no Google Drive
- Verifique se a API do Google Drive está ativada no projeto

### Erro de autenticação no Azure
- Verifique se a Connection String está correta
- Certifique-se de que o contêiner existe ou pode ser criado
- Verifique as permissões da conta de armazenamento

### Arquivos não aparecem
- Verifique se o ID da pasta está correto
- Certifique-se de que a Service Account tem acesso à pasta
- Verifique se há arquivos na pasta especificada

## 📄 Licença

ISC

## 👤 Autor

Desenvolvido para Prova CNII P2

