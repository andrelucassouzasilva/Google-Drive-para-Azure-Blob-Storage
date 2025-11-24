// Carrega variáveis de ambiente
require('dotenv').config();

// Configurações da aplicação
module.exports = {
  // Azure Blob Storage
  azure: {
    // Connection String do Azure (obtida de variável de ambiente)
    // Configure AZURE_CONNECTION_STRING no arquivo .env
    connectionString: process.env.AZURE_CONNECTION_STRING || 
      `DefaultEndpointsProtocol=https;AccountName=${process.env.AZURE_ACCOUNT_NAME || ''};AccountKey=${process.env.AZURE_ACCOUNT_KEY || ''};EndpointSuffix=core.windows.net`,
    containerName: process.env.AZURE_CONTAINER_NAME || 'aluno-andrelss',  // Nomes de contêineres devem estar em minúsculas e usar hífens ao invés de underscores
    accountName: process.env.AZURE_ACCOUNT_NAME || '',
    accountKey: process.env.AZURE_ACCOUNT_KEY || ''
  },
  
  // Google Drive
  google: {
    credentialsPath: process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json',
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || null  // Configure GOOGLE_DRIVE_FOLDER_ID no arquivo .env ou use a interface web
  },
  
  // Servidor
  server: {
    port: process.env.PORT || 3000
  }
};

