import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './App.css';
import { Counter } from './pages/counter/Counter';
import PageLanding from './pages/PageLanding';
import PageLogin from './pages/PageLogin';
import PageSignup from './pages/PageSignup';
import Navbar from './components/Navbar';

const theme = createMuiTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/" component={PageLanding} />
          <Route exact path="/login" component={PageLogin} />
          <Route exact path="/signup" component={PageSignup} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
