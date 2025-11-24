const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const config = require('./config');

class AzureBlobService {
  constructor() {
    this.blobServiceClient = null;
    this.containerClient = null;
    this.authenticated = false;
  }

  /**
   * Normaliza o nome do contêiner para seguir as regras do Azure
   * - Apenas letras minúsculas, números e hífens
   * - Sem underscores ou outros caracteres especiais
   */
  normalizeContainerName(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')  // Substitui caracteres inválidos por hífen
      .replace(/^-+|-+$/g, '')       // Remove hífens do início e fim
      .substring(0, 63);              // Limita a 63 caracteres
  }

  /**
   * Autentica usando Connection String
   */
  async authenticate() {
    try {
      this.blobServiceClient = BlobServiceClient.fromConnectionString(
        config.azure.connectionString
      );

      // Normaliza o nome do contêiner
      const normalizedName = this.normalizeContainerName(config.azure.containerName);
      if (normalizedName !== config.azure.containerName) {
        console.log(`⚠️  Nome do contêiner normalizado: "${config.azure.containerName}" → "${normalizedName}"`);
      }

      // Obtém ou cria o contêiner
      this.containerClient = this.blobServiceClient.getContainerClient(
        normalizedName
      );

      // Verifica se o contêiner existe, se não, cria
      const exists = await this.containerClient.exists();
      if (!exists) {
        await this.containerClient.create();
        console.log(`✓ Contêiner "${normalizedName}" criado com sucesso`);
      }

      this.authenticated = true;
      console.log('✓ Autenticação com Azure Blob Storage realizada com sucesso');
      return true;
    } catch (error) {
      console.error('✗ Erro na autenticação com Azure Blob Storage:', error.message);
      throw error;
    }
  }

  /**
   * Lista arquivos do contêiner
   * @returns {Promise<Array>} Lista de blobs
   */
  async listFiles() {
    try {
      if (!this.authenticated) {
        await this.authenticate();
      }

      const blobs = [];
      const containerName = this.normalizeContainerName(config.azure.containerName);
      
      console.log(`\n📦 Arquivos no Azure Blob Storage (contêiner: ${containerName}):`);
      
      for await (const blob of this.containerClient.listBlobsFlat()) {
        const size = blob.properties.contentLength 
          ? `${(blob.properties.contentLength / 1024).toFixed(2)} KB` 
          : 'N/A';
        const lastModified = blob.properties.lastModified 
          ? new Date(blob.properties.lastModified).toLocaleString('pt-BR')
          : 'N/A';
        
        console.log(`  - ${blob.name} (${size}) - Modificado: ${lastModified}`);
        
        blobs.push({
          name: blob.name,
          size: blob.properties.contentLength,
          lastModified: blob.properties.lastModified,
          contentType: blob.properties.contentType
        });
      }

      if (blobs.length === 0) {
        console.log('  (Nenhum arquivo encontrado)');
      }

      return blobs;
    } catch (error) {
      console.error('✗ Erro ao listar arquivos do Blob Storage:', error.message);
      throw error;
    }
  }

  /**
   * Faz upload de um arquivo para o Blob Storage
   * @param {string} fileName - Nome do arquivo
   * @param {Buffer} fileContent - Conteúdo do arquivo
   * @param {string} contentType - Tipo MIME do arquivo
   * @returns {Promise<boolean>} Sucesso da operação
   */
  async uploadFile(fileName, fileContent, contentType = 'application/octet-stream') {
    try {
      if (!this.authenticated) {
        await this.authenticate();
      }

      const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
      
      await blockBlobClient.upload(fileContent, fileContent.length, {
        blobHTTPHeaders: { blobContentType: contentType }
      });

      return true;
    } catch (error) {
      console.error(`✗ Erro ao fazer upload do arquivo ${fileName}:`, error.message);
      throw error;
    }
  }

  /**
   * Verifica se um arquivo já existe no contêiner
   * @param {string} fileName - Nome do arquivo
   * @returns {Promise<boolean>} True se existe
   */
  async fileExists(fileName) {
    try {
      if (!this.authenticated) {
        await this.authenticate();
      }

      const blockBlobClient = this.containerClient.getBlockBlobClient(fileName);
      return await blockBlobClient.exists();
    } catch (error) {
      return false;
    }
  }
}

module.exports = AzureBlobService;

