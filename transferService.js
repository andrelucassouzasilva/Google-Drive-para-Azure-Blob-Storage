const GoogleDriveService = require('./googleDriveService');
const AzureBlobService = require('./azureBlobService');

class TransferService {
  constructor() {
    this.googleDrive = new GoogleDriveService();
    this.azureBlob = new AzureBlobService();
  }

  /**
   * Copia arquivos de uma pasta do Google Drive para o Azure Blob Storage
   * @param {string} folderId - ID da pasta no Google Drive
   * @returns {Promise<Object>} Relatório da transferência
   */
  async transferFiles(folderId = null) {
    const report = {
      total: 0,
      success: 0,
      errors: 0,
      details: []
    };

    try {
      console.log('\n🚀 Iniciando transferência de arquivos...\n');

      // Autentica nas duas plataformas
      await this.googleDrive.authenticate();
      await this.azureBlob.authenticate();

      // Lista arquivos do Google Drive
      const files = await this.googleDrive.listFiles(folderId);
      report.total = files.length;

      if (files.length === 0) {
        console.log('\n⚠️  Nenhum arquivo encontrado para transferir.');
        return report;
      }

      // Processa cada arquivo
      for (const file of files) {
        try {
          console.log(`\n📥 Processando: ${file.name}...`);

          // Verifica se o arquivo já existe
          const exists = await this.azureBlob.fileExists(file.name);
          if (exists) {
            console.log(`  ⚠️  Arquivo já existe no Blob Storage, pulando...`);
            report.details.push({
              fileName: file.name,
              status: 'skipped',
              message: 'Arquivo já existe'
            });
            continue;
          }

          // Baixa o arquivo do Google Drive
          const fileContent = await this.googleDrive.downloadFile(file.id, file.name);
          console.log(`  ✓ Arquivo baixado (${(fileContent.length / 1024).toFixed(2)} KB)`);

          // Faz upload para o Azure Blob Storage
          await this.azureBlob.uploadFile(file.name, fileContent, file.mimeType);
          console.log(`  ✓ Arquivo enviado para o Blob Storage`);

          report.success++;
          report.details.push({
            fileName: file.name,
            status: 'success',
            message: 'Transferência concluída com sucesso'
          });

          console.log(`  ✅ ${file.name} - SUCESSO`);
        } catch (error) {
          report.errors++;
          report.details.push({
            fileName: file.name,
            status: 'error',
            message: error.message
          });
          console.log(`  ❌ ${file.name} - ERRO: ${error.message}`);
        }
      }

      // Exibe resumo
      console.log('\n' + '='.repeat(60));
      console.log('📊 RESUMO DA TRANSFERÊNCIA');
      console.log('='.repeat(60));
      console.log(`Total de arquivos: ${report.total}`);
      console.log(`✅ Sucessos: ${report.success}`);
      console.log(`❌ Erros: ${report.errors}`);
      console.log('='.repeat(60) + '\n');

      return report;
    } catch (error) {
      console.error('\n✗ Erro durante a transferência:', error.message);
      throw error;
    }
  }
}

module.exports = TransferService;

