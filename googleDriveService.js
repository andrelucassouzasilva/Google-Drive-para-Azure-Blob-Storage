const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const config = require('./config');

class GoogleDriveService {
  constructor() {
    this.drive = null;
    this.authenticated = false;
  }

  /**
   * Autentica usando Service Account
   */
  async authenticate() {
    try {
      const credentialsPath = config.google.credentialsPath;
      
      if (!fs.existsSync(credentialsPath)) {
        throw new Error(`Arquivo de credenciais não encontrado: ${credentialsPath}`);
      }

      const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
      
      const auth = new google.auth.GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/drive.readonly']
      });

      this.drive = google.drive({ version: 'v3', auth });
      this.authenticated = true;
      
      console.log('✓ Autenticação com Google Drive realizada com sucesso');
      return true;
    } catch (error) {
      console.error('✗ Erro na autenticação com Google Drive:', error.message);
      throw error;
    }
  }

  /**
   * Lista arquivos de uma pasta específica do Google Drive
   * @param {string} folderId - ID da pasta no Google Drive
   * @returns {Promise<Array>} Lista de arquivos
   */
  async listFiles(folderId = null) {
    try {
      if (!this.authenticated) {
        await this.authenticate();
      }

      const targetFolderId = folderId || config.google.folderId;
      
      if (!targetFolderId) {
        throw new Error('ID da pasta não especificado. Configure config.google.folderId ou passe como parâmetro.');
      }

      const query = `'${targetFolderId}' in parents and trashed=false`;
      
      const response = await this.drive.files.list({
        q: query,
        fields: 'files(id, name, mimeType, size, modifiedTime)',
        pageSize: 1000
      });

      const files = response.data.files || [];
      
      console.log(`\n📁 Arquivos encontrados no Google Drive (${files.length}):`);
      files.forEach((file, index) => {
        const size = file.size ? `${(parseInt(file.size) / 1024).toFixed(2)} KB` : 'N/A';
        console.log(`  ${index + 1}. ${file.name} (${size}) - ID: ${file.id}`);
      });

      return files;
    } catch (error) {
      console.error('✗ Erro ao listar arquivos do Google Drive:', error.message);
      throw error;
    }
  }

  /**
   * Baixa um arquivo do Google Drive
   * @param {string} fileId - ID do arquivo
   * @param {string} fileName - Nome do arquivo
   * @returns {Promise<Buffer>} Conteúdo do arquivo
   */
  async downloadFile(fileId, fileName) {
    try {
      if (!this.authenticated) {
        await this.authenticate();
      }

      const response = await this.drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'stream' }
      );

      return new Promise((resolve, reject) => {
        const chunks = [];
        response.data.on('data', (chunk) => chunks.push(chunk));
        response.data.on('end', () => resolve(Buffer.concat(chunks)));
        response.data.on('error', reject);
      });
    } catch (error) {
      console.error(`✗ Erro ao baixar arquivo ${fileName}:`, error.message);
      throw error;
    }
  }

  /**
   * Obtém informações de uma pasta pelo nome
   * @param {string} folderName - Nome da pasta
   * @returns {Promise<string|null>} ID da pasta ou null
   */
  async findFolderByName(folderName) {
    try {
      if (!this.authenticated) {
        await this.authenticate();
      }

      const response = await this.drive.files.list({
        q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        pageSize: 10
      });

      const folders = response.data.files || [];
      if (folders.length > 0) {
        return folders[0].id;
      }
      return null;
    } catch (error) {
      console.error('✗ Erro ao buscar pasta:', error.message);
      throw error;
    }
  }
}

module.exports = GoogleDriveService;

