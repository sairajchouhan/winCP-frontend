import React, { useEffect } from 'react';
// import jwtDecode from 'jwt-decode';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { useSelector, useDispatch } from 'react-redux';

import { Counter } from './pages/counter/Counter';
import PageLanding from './pages/PageLanding';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
// import PrivateRoute from './components/auth/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import PageLogin from './pages/PageLogin';
import PageSignup from './pages/PageSignup';
// import { loadUser, selectIsAuthenticated } from './redux/slices/authSlice'

const theme = createMuiTheme({});

let token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

function App() {
  // const dispatch = useDispatch();
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/" component={PageLanding} />
          <Route exact path="/login" component={PageLogin} />
          <Route exact path="/signup" component={PageSignup} />
          {/* <PrivateRoute exact path="/home" component={Home} /> */}
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
