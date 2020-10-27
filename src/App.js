import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { Counter } from './pages/counter/Counter';
import PageLanding from './pages/PageLanding';
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
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
