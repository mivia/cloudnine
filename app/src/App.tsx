import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { Salons } from './components/salons/Salons';
import Salon from './components/salon/Salon';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Salons} />
        <Route path="/salon/:id" component={Salon} />
        <Route component={Salons} />
      </Switch>
    </Router>
  );
};

export default App;
