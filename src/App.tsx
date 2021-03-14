import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import { Salons } from './components/salons/Salons';
import Salon from './components/salon/container';

const App: React.FC = () => {
  return (
    <HashRouter basename="/">
      <Switch>
        <Route exact path="/" component={Salons} />
        <Route path="/salon/:id" component={Salon} />
        <Route component={Salons} />
      </Switch>
    </HashRouter>
  );
};

export default App;
