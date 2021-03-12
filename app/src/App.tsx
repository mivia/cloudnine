import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import './App.css';

import { Salons } from './components/salons/Salons';
import { Salon } from './components/salon/Salon';

const App: React.FC = () => {
  return (
    <Container>
      <Router>
        <Route path="/" exact component={Salons} />
        <Route path="/salon/:id" component={Salon} />
      </Router>
    </Container>
  );
};

export default App;
