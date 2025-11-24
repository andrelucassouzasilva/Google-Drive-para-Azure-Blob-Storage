const GoogleDriveService = require('./googleDriveService');
const AzureBlobService = require('./azureBlobService');
const TransferService = require('./transferService');
const config = require('./config');

// Função para exibir ajuda
function showHelp() {
  console.log('\n' + '='.repeat(60));
  console.log('🔄 Transferência Google Drive → Azure Blob Storage');
  console.log('='.repeat(60));
  console.log('\nUso:');
  console.log('  node cli.js <comando> [opções]\n');
  console.log('Comandos:');
  console.log('  list-drive [folderId]     Lista arquivos do Google Drive');
  console.log('  list-blob                 Lista arquivos do Azure Blob Storage');
  console.log('  transfer [folderId]      Transfere arquivos do Drive para Blob');
  console.log('  find-folder <nome>       Busca pasta pelo nome no Google Drive');
  console.log('  help                     Exibe esta ajuda\n');
  console.log('Exemplos:');
  console.log('  node cli.js list-drive');
  console.log('  node cli.js list-drive 1a2b3c4d5e6f7g8h9i0j');
  console.log('  node cli.js list-blob');
  console.log('  node cli.js transfer');
  console.log('  node cli.js transfer 1a2b3c4d5e6f7g8h9i0j');
  console.log('  node cli.js find-folder "Minha Pasta"\n');
}

// Função principal
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command || command === 'help') {
    showHelp();
    return;
  }

  try {
    switch (command) {
      case 'list-drive':
        {
          const folderId = args[1] || config.google.folderId;
          const driveService = new GoogleDriveService();
          await driveService.listFiles(folderId);
        }
        break;

      case 'list-blob':
        {
          const blobService = new AzureBlobService();
          await blobService.listFiles();
        }
        break;

      case 'transfer':
        {
          const folderId = args[1] || config.google.folderId;
          const transferService = new TransferService();
          await transferService.transferFiles(folderId);
        }
        break;

      case 'find-folder':
        {
          const folderName = args[1];
          if (!folderName) {
            console.error('✗ Erro: Nome da pasta não fornecido');
            console.log('Use: node cli.js find-folder "Nome da Pasta"');
            return;
          }
          const driveService = new GoogleDriveService();
          const folderId = await driveService.findFolderByName(folderName);
          if (folderId) {
            console.log(`\n✓ Pasta encontrada!`);
            console.log(`  Nome: ${folderName}`);
            console.log(`  ID: ${folderId}\n`);
          } else {
            console.log(`\n✗ Pasta "${folderName}" não encontrada\n`);
          }
        }
        break;

      default:
        console.error(`✗ Comando desconhecido: ${command}`);
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error('\n✗ Erro:', error.message);
    if (error.stack) {
      console.error('\nStack trace:', error.stack);
    }
    process.exit(1);
  }
}

// Executa o programa
main();

