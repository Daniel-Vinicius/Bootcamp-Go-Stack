import { createGlobalStyle } from 'styled-components';

import githubBackground from '../assets/githubBackground.svg';

// O estilo abaixo é Global
export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  background: #F0F0F5 url(${githubBackground}) no-repeat 70% top;
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font: 16px Roboto, sans-serif;
}

// Definir Max-Width em Root é ótimo pois deixa mais fácil de deixar responsivo
#root {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
}

button {
  cursor: pointer;
}

`;
