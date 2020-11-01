import React, { useEffect } from 'react';
// import jwtDecode from 'jwt-decode';
import { Switch, Route } from 'react-router-dom';
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Counter } from './pages/counter/Counter';
import LandingPage from './pages/LandingPage';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import PrivateRoute from './components/routing/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { loadUser } from './redux/actions/authActions';
import ProfilePage from './pages/ProfilePage';
import CreateWin from './pages/CreateWin';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
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
        {/* <Backdrop open={false} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop> */}
        <Navbar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/counter" component={Counter} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <PrivateRoute exact path="/profile" component={ProfilePage} />
          <PrivateRoute exact path="/home" component={HomePage} />
          <PrivateRoute exact path="/create-post" component={CreateWin} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
