import React from 'react';
// import jwtDecode from 'jwt-decode';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { useSelector, useDispatch } from 'react-redux';

import { Counter } from './pages/counter/Counter';
import LandingPage from './pages/LandingPage';
import Navbar from './components/layout/Navbar';
// import Home from './pages/Home';
// import PrivateRoute from './components/auth/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
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
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          {/* <PrivateRoute exact path="/home" component={Home} /> */}
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
