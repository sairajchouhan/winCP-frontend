import React from 'react';
import jwtDecode from 'jwt-decode';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { Counter } from './pages/counter/Counter';
import PageLanding from './pages/PageLanding';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import PrivateRoute from './components/auth/PrivateRoute';

const theme = createMuiTheme({});

let isAuthenticated = null;
let token = localStorage.getItem('token');
if (token) {
  const decodedToken = jwtDecode(token);
  if (Date.now() > decodedToken.exp) {
    window.location.href = '/';
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/" component={PageLanding} />
          <PrivateRoute
            exact
            path="/home"
            component={Home}
            auth={{ isAuthenticated }}
          />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
