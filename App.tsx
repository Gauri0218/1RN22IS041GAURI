import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Stock from './pages/Stock';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/stock/:symbol" component={Stock} />
      </Switch>
    </Router>
  );
};

export default App;