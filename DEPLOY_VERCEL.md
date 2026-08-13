# 🚀 Guia de Deploy no Vercel

Este guia vai te ajudar a colocar a aplicação de calculadora de energia online em minutos!

## ✅ Pré-requisitos

- ✅ Repositório no GitHub (`https://github.com/Lucax-Peres/energia`)
- ✅ Código já enviado (main branch)
- ✅ Conta no Vercel (pode usar conta do GitHub)

---

## 📋 Passo a Passo

### **Passo 1: Acesse o Vercel**

1. Vá para 👉 **https://vercel.com**
2. Clique em **"Sign Up"** (ou faça login se já tem conta)
3. Escolha **"Continue with GitHub"**
4. Autorize a conexão

![Vercel Signup](https://imgur.com/abcdefg.png)

---

### **Passo 2: Importe seu Repositório**

1. Após login, você vai para o dashboard
2. Clique em **"Add New..."** → **"Project"**
3. Procure por **`energia`** na lista de repositórios
4. Clique em **"Import"**

![Import Project](https://imgur.com/xyz1234.png)

---

### **Passo 3: Configure o Projeto**

Na tela de configuração, verifique se está assim:

```
Framework Preset:     Vite                ✓
Build Command:        npm run build       ✓
Output Directory:     dist                ✓
Environment Variables: (deixe em branco)  ✓
```

**Tudo já está pré-configurado!** Não precisa alterar nada.

---

### **Passo 4: Deploy**

1. Clique no botão **"Deploy"** (grande botão azul)
2. Aguarde 2-3 minutos (verá logs do build)
3. Quando aparecer **"Congratulations!"**, seu site está online! 🎉

---

## 🎯 Resultado Final

Você terá um site em produção em:

```
https://energia-XXXXXX.vercel.app
```

A URL será algo como: `https://energia-pln2xkl9z.vercel.app`

---

## ⚙️ Personalize o Domínio (Opcional)

Se quiser um domínio customizado:

1. Vá para **Project Settings** → **Domains**
2. Clique em **"Add Custom Domain"**
3. Digite um nome (ex: `meu-consumo.vercel.app`)
4. Pronto! Nova URL: `https://meu-consumo.vercel.app`

---

## 🔄 Deploy Automático

**Toda vez que você fizer push na branch `main` do GitHub:**
```bash
git push origin main
```

**O Vercel automaticamente fará:**
1. ✅ Build do código
2. ✅ Testes
3. ✅ Deploy em produção

Você verá os logs em tempo real no dashboard do Vercel!

---

## 🐛 Troubleshooting

### ❌ "Build failed"
- Verifique se o repositório tem `package.json` e `package-lock.json`
- Confirme que `npm run build` funciona localmente

### ❌ "Cannot find module"
- Provavelmente faltam dependências em `package.json`
- Execute localmente: `npm install`

### ❌ "404 Not Found"
- A aplicação é SPA (Single Page App)
- Vercel já está configurado com rewrites em `vercel.json`
- Tente recarregar a página ou limpar cache

---

## 📊 Monitorar o Projeto

No dashboard do Vercel você pode:

- 📈 Ver analytics em tempo real
- 🕐 Histórico de deploys
- ⚡ Performance de cada versão
- 🔍 Logs de erro
- 📱 Preview em mobile

---

## 💡 Dicas

✨ **Compartilhe sua URL**: `https://energia-XXXX.vercel.app`

✨ **Use domínio próprio**: Pode apontar um domínio próprio para Vercel (Passo 6)

✨ **Adicione ao GitHub Readme**:
```markdown
## 🚀 [Acesse a aplicação aqui](https://energia-XXXX.vercel.app)
```

---

## ✅ Status do Seu Deploy

Após concluir, você terá:

- ✅ Site 100% online
- ✅ HTTPS automático
- ✅ CDN global (super rápido)
- ✅ Deploy automático com cada push
- ✅ Uptime 99.9%
- ✅ Totalmente grátis

---

**Pronto? Comece agora em: https://vercel.com** 🚀
