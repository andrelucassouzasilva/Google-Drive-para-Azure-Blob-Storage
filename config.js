// Carrega variáveis de ambiente
require('dotenv').config();

// Configurações da aplicação
module.exports = {
  // Azure Blob Storage
  azure: {
    // Connection String do Azure (obtida de variável de ambiente)
    connectionString: process.env.AZURE_CONNECTION_STRING || 
      `DefaultEndpointsProtocol=https;AccountName=${process.env.AZURE_ACCOUNT_NAME || 'stop2cn2'};AccountKey=${process.env.AZURE_ACCOUNT_KEY || ''};EndpointSuffix=core.windows.net`,
    containerName: process.env.AZURE_CONTAINER_NAME || 'aluno-andrelss',  // Nomes de contêineres devem estar em minúsculas e usar hífens ao invés de underscores
    accountName: process.env.AZURE_ACCOUNT_NAME || 'stop2cn2',
    accountKey: process.env.AZURE_ACCOUNT_KEY || ''
  },
  
  // Google Drive
  google: {
    credentialsPath: process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json',
    folderId: process.env.GOOGLE_DRIVE_FOLDER_ID || '1abMPtVrj-bojAjX3-v7xNYZ_LQV6_Vu0'  // ID da pasta configurado
  },
  
  // Servidor
  server: {
    port: process.env.PORT || 3000
  }
};

