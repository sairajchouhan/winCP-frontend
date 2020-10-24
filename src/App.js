import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import { Counter } from './pages/counter/Counter';
import PageLanding from './pages/PageLanding';
import PageLogin from './pages/PageLogin';
import PageSignup from './pages/PageSignup';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/counter" component={Counter} />
        <Route exact path="/" component={PageLanding} />
        <Route exact path="/login" component={PageLogin} />
        <Route exact path="/signup" component={PageSignup} />
      </Switch>
    </div>
  );
}

export default App;
