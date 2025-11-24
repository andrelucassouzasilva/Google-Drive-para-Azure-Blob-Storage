const fs = require('fs');
const path = require('path');

/**
 * Script para criar o arquivo .env a partir do env.example
 */
function setupEnv() {
  const envExamplePath = path.join(__dirname, 'env.example');
  const envPath = path.join(__dirname, '.env');

  // Verifica se .env já existe
  if (fs.existsSync(envPath)) {
    console.log('⚠️  O arquivo .env já existe!');
    console.log('   Se quiser recriar, delete o arquivo .env primeiro.');
    return;
  }

  // Verifica se env.example existe
  if (!fs.existsSync(envExamplePath)) {
    console.log('❌ Arquivo env.example não encontrado!');
    return;
  }

  // Lê o conteúdo do env.example
  const envExample = fs.readFileSync(envExamplePath, 'utf8');

  // Cria o .env com os valores padrão (você precisará editar manualmente)
  fs.writeFileSync(envPath, envExample);

  console.log('✅ Arquivo .env criado com sucesso!');
  console.log('📝 Agora edite o arquivo .env e preencha com suas credenciais reais:');
  console.log('   - AZURE_CONNECTION_STRING');
  console.log('   - AZURE_ACCOUNT_NAME');
  console.log('   - AZURE_ACCOUNT_KEY');
  console.log('   - GOOGLE_DRIVE_FOLDER_ID (opcional)');
}

setupEnv();

