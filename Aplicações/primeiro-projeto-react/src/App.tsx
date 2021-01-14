import React from 'react';
// BrowserRouter é um roteamento baseado em rotas do tipo url.com.br/rota, é o mais usado, também temos outros como o HashRouter, que tem uma # antes de todas as rotas
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
