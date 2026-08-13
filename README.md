# ⚡ Medidor de Consumo — Calculadora de Energia Residencial

Aplicação web em React que estima o consumo de energia elétrica (kWh) e o custo
mensal de eletrodomésticos e equipamentos, com base na potência, quantidade e
horas de uso por dia. O cálculo usa um ciclo fixo de **30 dias**, equivalente a
um ciclo de fatura.

![status](https://img.shields.io/badge/status-pronto%20para%20deploy-brightgreen)
![stack](https://img.shields.io/badge/stack-React%20%2B%20Vite%20%2B%20Tailwind-blue)

---

## Sumário

- [Visão geral](#visão-geral)
- [Como o cálculo funciona](#como-o-cálculo-funciona)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Rodando localmente](#rodando-localmente)
- [Build de produção](#build-de-produção)
- [Deploy](#deploy)
  - [Vercel](#vercel)
  - [Netlify](#netlify)
  - [GitHub Pages](#github-pages)
  - [Qualquer hospedagem estática](#qualquer-hospedagem-estática)
- [Personalização](#personalização)
- [Tecnologias usadas](#tecnologias-usadas)
- [Limitações e avisos](#limitações-e-avisos)
- [Licença](#licença)

---

## Visão geral

A aplicação tem três blocos principais:

1. **Painel resumo** — um medidor (gauge) mostrando o consumo total em
   kWh/mês, o custo estimado e um campo para editar a tarifa de energia
   (R$/kWh).
2. **Cadastro de equipamentos** — formulário para adicionar aparelhos
   (nome, potência em watts, quantidade, horas de uso por dia).
3. **Tabela e gráfico** — lista editável de todos os equipamentos com o
   consumo individual, e um gráfico de barras ordenado do que mais pesa na
   conta de luz.

Os dados ficam apenas na memória do navegador (estado do React) — não há
backend nem banco de dados. Ao recarregar a página, a lista volta aos itens
de exemplo definidos em `src/data/initialItems.js`.

## Como o cálculo funciona

Toda a lógica de cálculo está isolada em `src/utils/calculations.js`,
sem depender de React, o que facilita testar ou reaproveitar em outro lugar.

Para cada equipamento:

```
Wh/dia   = potência (W) × quantidade × horas por dia
kWh/dia  = Wh/dia ÷ 1000
kWh/mês  = kWh/dia × 30
custo    = kWh/mês × tarifa (R$/kWh)
```

O total geral é a soma do `kWh/mês` e do `custo` de todos os equipamentos
cadastrados.

> **Nota:** essa é uma estimativa baseada na potência nominal do aparelho.
> O consumo real pode variar conforme o modelo, o modo de uso (ex: ar-condicionado
> em ciclos, geladeira com termostato) e a eficiência energética do equipamento.

## Estrutura do projeto

```
energy-calculator/
├── index.html                      # HTML de entrada (Vite)
├── package.json                    # dependências e scripts
├── vite.config.js                  # configuração do bundler
├── tailwind.config.js              # tokens de cor/tipografia do design
├── postcss.config.js               # necessário para o Tailwind
├── netlify.toml                    # config de deploy (Netlify)
├── vercel.json                     # config de deploy (Vercel)
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                    # ponto de entrada React
    ├── App.jsx                     # orquestra estado e monta a página
    ├── index.css                   # estilos globais + diretivas Tailwind
    ├── components/
    │   ├── Header.jsx              # título e introdução
    │   ├── Gauge.jsx               # medidor SVG (elemento visual central)
    │   ├── SummaryPanel.jsx        # cartão com medidor + custo + tarifa
    │   ├── AddEquipmentForm.jsx    # formulário de novo equipamento
    │   ├── EquipmentTable.jsx      # tabela editável de equipamentos
    │   └── ConsumptionChart.jsx    # gráfico de barras (recharts)
    ├── data/
    │   └── initialItems.js         # equipamentos de exemplo pré-carregados
    └── utils/
        └── calculations.js         # fórmulas de consumo/custo (puro, sem UI)
```

Cada componente tem uma única responsabilidade, o que facilita editar o
visual (cores, textos) sem tocar na lógica de cálculo, e vice-versa.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior
- npm (instalado junto com o Node.js) — ou yarn/pnpm, se preferir

## Rodando localmente

```bash
# 1. instale as dependências
npm install

# 2. inicie o servidor de desenvolvimento
npm run dev
```

A aplicação abrirá em `http://localhost:5173` (o terminal mostra a URL exata).
Qualquer alteração nos arquivos é refletida automaticamente no navegador.

## Build de produção

```bash
npm run build
```

Isso gera uma pasta `dist/` com HTML, CSS e JS otimizados e prontos para
qualquer hospedagem estática. Para conferir o resultado localmente antes do
deploy:

```bash
npm run preview
```

## Deploy

O projeto já inclui arquivos de configuração para os provedores mais comuns.

### Vercel

1. Crie um repositório no GitHub/GitLab/Bitbucket com este projeto.
2. Em [vercel.com](https://vercel.com), clique em **New Project** e importe o
   repositório.
3. A Vercel detecta automaticamente o framework (Vite) graças ao
   `vercel.json`. Comando de build: `npm run build`. Diretório de saída:
   `dist`.
4. Clique em **Deploy**.

Ou via CLI:

```bash
npm install -g vercel
vercel --prod
```

### Netlify

1. Suba o projeto para um repositório Git.
2. Em [app.netlify.com](https://app.netlify.com), clique em **Add new site →
   Import an existing project** e selecione o repositório.
3. O arquivo `netlify.toml` já define `command = "npm run build"` e
   `publish = "dist"` — não é necessário configurar nada manualmente.
4. Clique em **Deploy site**.

Ou via CLI:

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

Este projeto já está configurado para o repositório
[`Lucax-Peres/Projeto-Eletrico`](https://github.com/Lucax-Peres/Projeto-Eletrico):
o `vite.config.js` tem `base: "/Projeto-Eletrico/"` e o `package.json` já tem
o `homepage` e os scripts `predeploy`/`deploy` prontos.

1. Envie o projeto para o repositório (se ainda não enviou):
   ```bash
   git init
   git add .
   git commit -m "Primeira versão da calculadora de consumo"
   git branch -M main
   git remote add origin https://github.com/Lucax-Peres/Projeto-Eletrico.git
   git push -u origin main
   ```
2. Instale as dependências (inclui o pacote `gh-pages`):
   ```bash
   npm install
   ```
3. Publique:
   ```bash
   npm run deploy
   ```
   Esse comando builda o projeto e envia a pasta `dist/` para uma branch
   chamada `gh-pages` no seu repositório.
4. No GitHub, vá em **Settings → Pages** do repositório e confirme que a
   fonte ("Source") está configurada como branch `gh-pages`, pasta `/ (root)`.
   Normalmente o `gh-pages` já faz essa configuração sozinho na primeira
   publicação, mas vale conferir.
5. Em alguns minutos o site estará no ar em:
   **https://Lucax-Peres.github.io/Projeto-Eletrico**

Se no futuro renomear o repositório, atualize o `base` em `vite.config.js`
e o `homepage` em `package.json` para o novo nome, e rode `npm run deploy`
novamente.

### Qualquer hospedagem estática

Depois de `npm run build`, o conteúdo da pasta `dist/` pode ser enviado para
qualquer servidor de arquivos estáticos (S3 + CloudFront, Cloudflare Pages,
Firebase Hosting, um servidor Nginx/Apache, etc.). Não há necessidade de
Node.js rodando em produção — é só HTML/CSS/JS estático.

## Personalização

- **Tarifa padrão**: altere `DEFAULT_TARIFF` em `src/App.jsx`.
- **Equipamentos de exemplo**: edite `src/data/initialItems.js`.
- **Cores e tipografia**: os tokens de design ficam em `tailwind.config.js`
  (seção `theme.extend.colors` e `fontFamily`).
- **Ciclo de faturamento**: altere `DAYS_IN_CYCLE` em
  `src/utils/calculations.js` caso queira calcular para 28, 31 dias etc.

## Tecnologias usadas

| Tecnologia | Uso |
|---|---|
| [React 18](https://react.dev/) | Interface e estado |
| [Vite](https://vitejs.dev/) | Build e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com/) | Estilização utilitária |
| [Recharts](https://recharts.org/) | Gráfico de barras de consumo |
| [Lucide React](https://lucide.dev/) | Ícones |

## Limitações e avisos

- Os valores calculados são **estimativas**, baseados na potência nominal
  informada pelo usuário. Aparelhos com compressor (geladeira, ar-condicionado)
  não ficam ligados na potência máxima o tempo todo — ajuste as horas de uso
  para refletir um ciclo médio, se souber.
- Não há persistência de dados entre sessões (nada é salvo em servidor ou
  banco de dados). Se quiser manter os dados entre visitas, seria necessário
  adicionar `localStorage` ou um backend — não incluído neste projeto.
- A tarifa de energia varia por distribuidora, bandeira tarifária e faixa de
  consumo; o valor padrão (R$ 0,85/kWh) é apenas um ponto de partida.

## Licença

Uso livre para fins pessoais e educacionais.
