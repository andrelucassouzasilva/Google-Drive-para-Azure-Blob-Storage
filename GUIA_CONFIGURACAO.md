# 📖 Guia Passo a Passo - Configuração do Google Drive

## Opção 1: Compartilhar a pasta com a Service Account (Recomendado)

### Passo 1: Abrir o Google Drive
1. Acesse [Google Drive](https://drive.google.com) no seu navegador
2. Faça login com a conta que possui a pasta que deseja transferir

### Passo 2: Localizar a pasta
1. Navegue até a pasta que contém os arquivos que você quer transferir
2. Certifique-se de que você tem permissão de acesso a essa pasta

### Passo 3: Compartilhar com a Service Account
1. **Clique com o botão direito** na pasta desejada
2. Selecione **"Compartilhar"** (ou "Share")
3. Na janela que abrir, você verá um campo para adicionar pessoas
4. **Digite o email da Service Account**: `p2cnii@p2cnii.iam.gserviceaccount.com`
5. **IMPORTANTE**: Clique no ícone de engrenagem ⚙️ ao lado do campo de email e desmarque a opção "Notificar pessoas" (para não enviar email)
6. Clique em **"Enviar"** ou **"Concluído"**
7. A Service Account agora tem acesso à pasta

### Passo 4: Obter o ID da pasta
1. Com a pasta ainda selecionada, olhe para a barra de endereço do navegador
2. A URL será algo como:
   ```
   https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
   ```
3. O **ID da pasta** é a parte após `/folders/`
   - Exemplo: Se a URL é `https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`
   - O ID é: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`

### Passo 5: Configurar na aplicação
1. Abra o arquivo `config.js`
2. Encontre a linha: `folderId: null`
3. Substitua `null` pelo ID da pasta (entre aspas):
   ```javascript
   folderId: '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p'
   ```
4. Salve o arquivo

---

## Opção 2: Usar a interface web (Mais fácil)

Se você não quiser editar o arquivo `config.js`, pode usar a interface web:

1. Inicie o servidor: `npm start`
2. Acesse: `http://localhost:3000`
3. Na seção "Configuração", você pode:
   - **Buscar pasta pelo nome**: Digite o nome da pasta e clique em "🔍 Buscar Pasta"
   - **Ou colar o ID diretamente**: Cole o ID da pasta no campo "ID da Pasta do Google Drive"
4. A interface salvará o ID temporariamente para a sessão

---

## Opção 3: Usar o CLI para buscar a pasta

1. Abra o terminal na pasta do projeto
2. Execute:
   ```bash
   npm run cli find-folder "Nome da Pasta"
   ```
3. O comando retornará o ID da pasta
4. Use esse ID na interface web ou no `config.js`

---

## ✅ Verificação

Para verificar se está tudo configurado corretamente:

1. Certifique-se de que o arquivo `credentials.json` está na raiz do projeto
2. Certifique-se de que a pasta foi compartilhada com `p2cnii@p2cnii.iam.gserviceaccount.com`
3. Teste listando os arquivos:
   ```bash
   npm run cli list-drive
   ```
   Ou use a interface web e clique em "📁 Listar Google Drive"

Se aparecerem os arquivos, está tudo configurado! 🎉

---

## 🔍 Como identificar o ID da pasta na URL

A URL do Google Drive tem diferentes formatos. Aqui estão exemplos:

### Formato 1 (Mais comum):
```
https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```
ID: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`

### Formato 2:
```
https://drive.google.com/drive/u/0/folders/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```
ID: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p` (mesmo, ignore o `/u/0/`)

### Formato 3 (Compartilhado):
```
https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p?usp=sharing
```
ID: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p` (ignore tudo após o `?`)

**Dica**: O ID sempre vem logo após `/folders/` e antes de qualquer `?` ou `/`

---

## ❓ Problemas Comuns

### "Pasta não encontrada" ou "Sem permissão"
- Verifique se compartilhou a pasta com o email correto da Service Account
- Verifique se o ID da pasta está correto (copie e cole diretamente da URL)
- Certifique-se de que a Service Account tem pelo menos permissão de "Visualizador"

### "Nenhum arquivo encontrado"
- Verifique se há arquivos na pasta (não apenas subpastas)
- Certifique-se de que os arquivos não estão na lixeira
- Verifique se o ID da pasta está correto

### "Erro de autenticação"
- Verifique se o arquivo `credentials.json` existe e está na raiz do projeto
- Verifique se o arquivo JSON está no formato correto
- Certifique-se de que a API do Google Drive está ativada no projeto

