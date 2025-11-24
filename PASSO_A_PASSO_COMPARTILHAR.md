# 📋 Passo a Passo: Compartilhar Pasta do Google Drive

## 🎯 Objetivo
Compartilhar uma pasta do Google Drive com a Service Account para que a aplicação possa acessar e transferir os arquivos.

---

## 📝 Passo 1: Abrir o Google Drive

1. Acesse [https://drive.google.com](https://drive.google.com)
2. Faça login com sua conta Google
3. Navegue até a pasta que contém os arquivos que você quer transferir

---

## 📝 Passo 2: Obter o ID da Pasta

### Método A: Pela URL (Mais Fácil)

1. **Clique na pasta** para abri-la
2. Olhe para a **barra de endereço do navegador**
3. Você verá uma URL como esta:
   ```
   https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
   ```
4. **Copie a parte após `/folders/`** - esse é o ID da pasta
   - Exemplo: Se a URL é `https://drive.google.com/drive/folders/1ABC2DEF3GHI4JKL5MNO6PQR7STU8VWX`
   - O ID é: `1ABC2DEF3GHI4JKL5MNO6PQR7STU8VWX`

### Método B: Usando o Menu de Compartilhamento

1. Clique com o botão direito na pasta
2. Selecione "Compartilhar"
3. Na janela que abrir, clique em "Copiar link"
4. O link será algo como: `https://drive.google.com/drive/folders/1ABC2DEF3GHI4JKL5MNO6PQR7STU8VWX?usp=sharing`
5. O ID é a parte entre `/folders/` e `?` (ou até o final se não houver `?`)

---

## 📝 Passo 3: Compartilhar com a Service Account

### Opção 1: Compartilhar Diretamente (Recomendado)

1. **Clique com o botão direito** na pasta
2. Selecione **"Compartilhar"** (ou "Share")
3. Na janela de compartilhamento:
   - No campo **"Adicionar pessoas e grupos"**, digite:
     ```
     p2cnii@p2cnii.iam.gserviceaccount.com
     ```
   - **IMPORTANTE**: Clique no ícone de **engrenagem ⚙️** ao lado do campo
   - **Desmarque** a opção "Notificar pessoas" (para não enviar email desnecessário)
   - Clique em **"Enviar"** ou **"Concluído"**

### Opção 2: Usar o Link de Compartilhamento

1. Clique com o botão direito na pasta → "Compartilhar"
2. Clique em **"Alterar para qualquer pessoa com o link"** (ou similar)
3. Copie o link
4. Abra o link em uma aba anônima/privada
5. O ID da pasta estará na URL

---

## 📝 Passo 4: Configurar o ID na Aplicação

Agora você tem duas opções:

### Opção A: Configurar no arquivo config.js

1. Abra o arquivo `config.js` no editor
2. Encontre a linha:
   ```javascript
   folderId: null
   ```
3. Substitua `null` pelo ID que você copiou (entre aspas):
   ```javascript
   folderId: '1ABC2DEF3GHI4JKL5MNO6PQR7STU8VWX'
   ```
4. Salve o arquivo

### Opção B: Usar a Interface Web (Mais Fácil)

1. Inicie o servidor: `npm start`
2. Acesse: `http://localhost:3000`
3. Na seção "Configuração":
   - Cole o ID da pasta no campo "ID da Pasta do Google Drive"
   - Ou use o botão "🔍 Buscar Pasta" para encontrar pelo nome
4. O ID será usado apenas durante a sessão atual

---

## ✅ Passo 5: Verificar se Funcionou

Execute o teste de configuração:

```bash
npm test
```

Ou teste listando os arquivos:

```bash
npm run cli list-drive
```

Se aparecerem os arquivos da pasta, está tudo certo! 🎉

---

## 🔍 Exemplo Prático Completo

Vamos supor que você tem uma pasta chamada "Documentos Importantes":

1. **URL da pasta**: 
   ```
   https://drive.google.com/drive/folders/1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV
   ```

2. **ID extraído**: 
   ```
   1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV
   ```

3. **Compartilhamento**:
   - Email da Service Account: `p2cnii@p2cnii.iam.gserviceaccount.com`
   - Permissão: Visualizador (suficiente para ler e baixar)

4. **Configuração no config.js**:
   ```javascript
   folderId: '1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT1uV'
   ```

5. **Teste**:
   ```bash
   npm run cli list-drive
   ```

---

## ❓ Perguntas Frequentes

### P: Preciso dar permissão de "Editor" ou "Visualizador" é suficiente?
**R**: "Visualizador" é suficiente! A aplicação só precisa ler e baixar os arquivos.

### P: E se eu quiser transferir arquivos de várias pastas?
**R**: Você pode:
- Compartilhar todas as pastas com a Service Account
- Usar IDs diferentes em cada execução (via interface web ou CLI)
- Criar uma pasta "raiz" e compartilhar apenas ela (se todas as pastas estiverem dentro)

### P: Como sei se o compartilhamento funcionou?
**R**: Execute `npm test` ou `npm run cli list-drive`. Se aparecerem os arquivos, funcionou!

### P: Posso usar a interface web sem configurar o config.js?
**R**: Sim! Você pode colar o ID da pasta diretamente na interface web a cada uso.

---

## 🎯 Resumo Rápido

1. ✅ Abra a pasta no Google Drive
2. ✅ Copie o ID da URL (parte após `/folders/`)
3. ✅ Compartilhe a pasta com `p2cnii@p2cnii.iam.gserviceaccount.com`
4. ✅ Configure o ID em `config.js` ou use a interface web
5. ✅ Teste com `npm test` ou `npm run cli list-drive`

Pronto! Agora você pode transferir arquivos! 🚀

