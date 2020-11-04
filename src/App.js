import React, { useEffect } from 'react';
// import jwtDecode from 'jwt-decode';
import { Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { loadUser } from './redux/actions/authActions';

import LandingPage from './pages/LandingPage';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import CreateWin from './pages/CreateWin';
import EachWin from './pages/EachWin';

// import { selectLoading } from './redux/slices/authSlice';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const theme = createMuiTheme({});

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//   },
// }));

function App() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/create-post" component={CreateWin} />
          <PrivateRoute exact path="/win/:winId" component={EachWin} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
