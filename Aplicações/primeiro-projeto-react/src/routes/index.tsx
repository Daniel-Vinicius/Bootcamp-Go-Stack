import React from 'react';
// Switch serve para garantir que apenas uma rota seja exibida
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    {/* Esse + no Final serve para indicar que todas as barras que Vierem depois do parâmetro repository fazem parte do nome dela */}
    <Route path="/repositories/:repository+" component={Repository} />
  </Switch>
);

export default Routes;
