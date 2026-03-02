# 🤖 ChatGPT Conversation Viewer

Uma ferramenta web moderna, rápida e privada para visualizar e pesquisar o teu histórico de conversas exportado do ChatGPT.

![ChatGPT Viewer](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Funcionalidades

- 🔒 **Privacidade Total**: O processamento é feito inteiramente no teu navegador. Os teus dados nunca saem do teu computador.
- 🔍 **Pesquisa Poderosa**: Encontra qualquer mensagem instantaneamente pesquisando por títulos de conversas ou pelo conteúdo das mensagens.
- 📝 **Markdown de Alta Qualidade**: Suporte completo para tabelas, listas e equações matemáticas.
- 💻 **Syntax Highlighting**: Realce de sintaxe para diversos blocos de código (Python, JS, C++, HTML, etc.).
- 🌑 **Design Premium**: Interface escura e moderna inspirada na estética original do ChatGPT, otimizada para leitura prolongada.
- 📱 **Responsivo**: Funciona perfeitamente em desktop e dispositivos móveis.

## 🚀 Como Utilizar

### 1. Obter os teus dados do ChatGPT
1. Acede a [chat.openai.com](https://chat.openai.com).
2. Vai a **Settings** > **Data Controls**.
3. Clica em **Export Data** e confirma.
4. Receberás um email com um ficheiro ZIP. Descarrega e extrai-o.
5. O ficheiro que precisas é o `conversations.json`.

### 2. Configurar o Visualizador
Tens duas opções:

#### Opção A: Utilizar localmente (Recomendado para desenvolvimento)
1. Certifica-te que tens o [Node.js](https://nodejs.org/) instalado.
2. No diretório do projeto, instala as dependências:
   ```bash
   npm install
   ```
3. Inicia o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Abre o link no teu navegador (ex: `http://localhost:5173`).

#### Opção B: GitHub Pages (Automático)
Este projeto já inclui um **GitHub Action** para automação total.
1. Faz o push do código para o teu repositório GitHub.
2. No GitHub, vai a **Settings > Pages**.
3. Em "Build and deployment > Source", escolhe **GitHub Actions**.
4. O site será publicado automaticamente em poucos minutos.

#### Opção C: Build manual para produção
1. Gera a versão estática:
   ```bash
   npm run build
   ```
2. O conteúdo da pasta `dist` pode ser servido por qualquer servidor web estático.


### 3. Visualizar Conversas
- Basta arrastar o ficheiro `conversations.json` para o navegador ou clicar no botão de importação.
- As tuas conversas aparecerão na barra lateral, ordenadas pela data de atualização.

## 🛠️ Stack Tecnológica

- **Frontend**: React 18 + Vite
- **Ícones**: Lucide React
- **Renderização**: Markdown-it + Highlight.js
- **Estilos**: Vanilla CSS (com variáveis CSS para design system)
- **Data**: Date-fns

## 📄 Licença

Este projeto é de utilização livre. Sente-te à vontade para o expandir ou adaptar às tuas necessidades.

---
*Desenvolvido com ❤️ para facilitar a gestão de conhecimento no ChatGPT.*
