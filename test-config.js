const fs = require('fs');
const path = require('path');
const GoogleDriveService = require('./googleDriveService');
const AzureBlobService = require('./azureBlobService');
const config = require('./config');

/**
 * Script de teste para verificar se a configuração está correta
 */
async function testConfiguration() {
  console.log('\n' + '='.repeat(60));
  console.log('🔍 TESTE DE CONFIGURAÇÃO');
  console.log('='.repeat(60) + '\n');

  let allTestsPassed = true;

  // Teste 1: Verificar se credentials.json existe
  console.log('1️⃣  Verificando arquivo credentials.json...');
  const credentialsPath = path.resolve(config.google.credentialsPath);
  if (fs.existsSync(credentialsPath)) {
    try {
      const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf8'));
      if (credentials.type === 'service_account' && credentials.client_email) {
        console.log('   ✅ Arquivo credentials.json encontrado e válido');
        console.log(`   📧 Service Account: ${credentials.client_email}`);
      } else {
        console.log('   ❌ Arquivo credentials.json inválido');
        allTestsPassed = false;
      }
    } catch (error) {
      console.log('   ❌ Erro ao ler credentials.json:', error.message);
      allTestsPassed = false;
    }
  } else {
    console.log('   ❌ Arquivo credentials.json não encontrado');
    console.log(`   📍 Caminho esperado: ${credentialsPath}`);
    allTestsPassed = false;
  }

  // Teste 2: Verificar configuração do Azure
  console.log('\n2️⃣  Verificando configuração do Azure...');
  if (config.azure.connectionString && config.azure.containerName) {
    console.log('   ✅ Configuração do Azure encontrada');
    console.log(`   📦 Contêiner: ${config.azure.containerName}`);
    console.log(`   🏦 Account: ${config.azure.accountName}`);
  } else {
    console.log('   ❌ Configuração do Azure incompleta');
    allTestsPassed = false;
  }

  // Teste 3: Testar autenticação com Google Drive
  console.log('\n3️⃣  Testando autenticação com Google Drive...');
  try {
    const driveService = new GoogleDriveService();
    await driveService.authenticate();
    console.log('   ✅ Autenticação com Google Drive bem-sucedida');
  } catch (error) {
    console.log('   ❌ Erro na autenticação com Google Drive:', error.message);
    allTestsPassed = false;
  }

  // Teste 4: Testar autenticação com Azure
  console.log('\n4️⃣  Testando autenticação com Azure Blob Storage...');
  try {
    const blobService = new AzureBlobService();
    await blobService.authenticate();
    console.log('   ✅ Autenticação com Azure Blob Storage bem-sucedida');
  } catch (error) {
    console.log('   ❌ Erro na autenticação com Azure:', error.message);
    allTestsPassed = false;
  }

  // Teste 5: Verificar se folderId está configurado
  console.log('\n5️⃣  Verificando ID da pasta do Google Drive...');
  if (config.google.folderId) {
    console.log(`   ✅ ID da pasta configurado: ${config.google.folderId}`);
    console.log('   🧪 Testando acesso à pasta...');
    try {
      const driveService = new GoogleDriveService();
      await driveService.authenticate();
      const files = await driveService.listFiles(config.google.folderId);
      console.log(`   ✅ Pasta acessível! Encontrados ${files.length} arquivo(s)`);
    } catch (error) {
      console.log('   ⚠️  ID da pasta configurado, mas não foi possível acessar');
      console.log(`   💡 Dica: Verifique se a pasta foi compartilhada com a Service Account`);
      console.log(`   📧 Email da Service Account: p2cnii@p2cnii.iam.gserviceaccount.com`);
      allTestsPassed = false;
    }
  } else {
    console.log('   ⚠️  ID da pasta não configurado (opcional)');
    console.log('   💡 Você pode configurar em config.js ou usar a interface web');
  }

  // Resumo final
  console.log('\n' + '='.repeat(60));
  if (allTestsPassed) {
    console.log('✅ TODOS OS TESTES PASSARAM!');
    console.log('🎉 A aplicação está pronta para uso!');
  } else {
    console.log('⚠️  ALGUNS TESTES FALHARAM');
    console.log('📖 Consulte o arquivo GUIA_CONFIGURACAO.md para ajuda');
  }
  console.log('='.repeat(60) + '\n');
}

// Executa os testes
testConfiguration().catch(error => {
  console.error('\n❌ Erro durante os testes:', error.message);
  process.exit(1);
});

