const express = require('express');
const path = require('path');
const GoogleDriveService = require('./googleDriveService');
const AzureBlobService = require('./azureBlobService');
const TransferService = require('./transferService');
const config = require('./config');

const app = express();
const PORT = config.server.port;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Rotas da API

// Listar arquivos do Google Drive
app.get('/api/drive/files', async (req, res) => {
  try {
    const folderId = req.query.folderId || config.google.folderId;
    const driveService = new GoogleDriveService();
    const files = await driveService.listFiles(folderId);
    res.json({ success: true, files, count: files.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Listar arquivos do Azure Blob Storage
app.get('/api/blob/files', async (req, res) => {
  try {
    const blobService = new AzureBlobService();
    const files = await blobService.listFiles();
    res.json({ success: true, files, count: files.length });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Transferir arquivos
app.post('/api/transfer', async (req, res) => {
  try {
    const folderId = req.body.folderId || config.google.folderId;
    const transferService = new TransferService();
    const report = await transferService.transferFiles(folderId);
    res.json({ success: true, report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Buscar pasta do Google Drive pelo nome
app.get('/api/drive/find-folder', async (req, res) => {
  try {
    const folderName = req.query.name;
    if (!folderName) {
      return res.status(400).json({ success: false, error: 'Nome da pasta não fornecido' });
    }
    const driveService = new GoogleDriveService();
    const folderId = await driveService.findFolderByName(folderName);
    res.json({ success: true, folderId, folderName });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Rota raiz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 Servidor iniciado com sucesso!');
  console.log('='.repeat(60));
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log('='.repeat(60) + '\n');
});

