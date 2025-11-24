# 🚀 Guia: Enviar Projeto para o GitHub

## ✅ Passo 1: Commit Realizado

O commit inicial já foi feito! Os arquivos estão prontos para serem enviados ao GitHub.

---

## 📝 Passo 2: Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha os dados:
   - **Repository name**: `Prova_CNII_P2` (ou outro nome de sua preferência)
   - **Description**: `Aplicação para transferir arquivos do Google Drive para Azure Blob Storage`
   - **Visibility**: Escolha **Public** ou **Private**
   - ⚠️ **NÃO** marque "Initialize this repository with a README" (já temos um)
5. Clique em **"Create repository"**

---

## 🔗 Passo 3: Conectar ao Repositório Remoto

Após criar o repositório, o GitHub mostrará instruções. Use uma das opções abaixo:

### Opção A: Se você ainda não tem o repositório criado

Execute estes comandos no terminal (na pasta do projeto):

```bash
cd C:\Users\andre\Prova_CNII_P2
git remote add origin https://github.com/SEU_USUARIO/Prova_CNII_P2.git
git branch -M main
git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub!**

### Opção B: Se você já criou o repositório no GitHub

O GitHub mostrará uma URL como:
```
https://github.com/SEU_USUARIO/Prova_CNII_P2.git
```

Execute:

```bash
cd C:\Users\andre\Prova_CNII_P2
git remote add origin https://github.com/SEU_USUARIO/Prova_CNII_P2.git
git branch -M main
git push -u origin main
```

---

## 🔐 Passo 4: Autenticação

Se solicitado, você precisará autenticar:

### Método 1: Personal Access Token (Recomendado)
1. Vá em GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Clique em "Generate new token"
3. Dê um nome e selecione o escopo `repo`
4. Copie o token gerado
5. Use o token como senha quando o Git pedir credenciais

### Método 2: GitHub CLI
```bash
gh auth login
```

---

## ✅ Passo 5: Verificar

Após o push, acesse seu repositório no GitHub e verifique se todos os arquivos aparecem.

**URL do repositório será algo como:**
```
https://github.com/SEU_USUARIO/Prova_CNII_P2
```

---

## 📋 Arquivos que NÃO serão enviados (protegidos)

Graças ao `.gitignore`, estes arquivos **NÃO** serão enviados ao GitHub:
- ✅ `credentials.json` (credenciais sensíveis do Google)
- ✅ `node_modules/` (dependências, muito grande)
- ✅ `.env` (variáveis de ambiente)
- ✅ `*.log` (arquivos de log)

**Isso é importante para segurança!** 🛡️

---

## 🔄 Comandos Úteis para o Futuro

### Ver status das alterações:
```bash
git status
```

### Adicionar alterações:
```bash
git add .
```

### Fazer commit:
```bash
git commit -m "Descrição das alterações"
```

### Enviar para o GitHub:
```bash
git push
```

### Baixar alterações do GitHub:
```bash
git pull
```

---

## ❓ Problemas Comuns

### Erro: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/Prova_CNII_P2.git
```

### Erro: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### Esqueceu o nome de usuário do GitHub?
Acesse: https://github.com/settings/profile

---

## 🎉 Pronto!

Seu projeto está no GitHub! Compartilhe o link do repositório com quem precisar.

**Lembre-se**: Nunca commite o arquivo `credentials.json` - ele contém informações sensíveis!

