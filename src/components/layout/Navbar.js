import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import SignUpForm from '../auth/SignupForm';
import LoginForm from '../auth/LoginForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [signUpopen, setSignUpOpen] = useState(false);
  const [logInopen, setLogInOpen] = useState(false);

  const handleSignUpClickOpen = () => {
    setSignUpOpen(true);
  };
  const handleSignUpClose = () => {
    setSignUpOpen(false);
  };
  const handleLogInClickOpen = () => {
    setLogInOpen(true);
  };
  const handleLogInClose = () => {
    setLogInOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h5"
            component={Link}
            to="/"
            className={classes.title}
          >
            winCP
          </Typography>
          <div>
            <Button onClick={handleLogInClickOpen} color="inherit">
              Login
            </Button>
            <LoginForm open={logInopen} handleClose={handleLogInClose} />
          </div>
          <div>
            <Button onClick={handleSignUpClickOpen} color="inherit">
              SignUp
            </Button>
            <SignUpForm open={signUpopen} handleClose={handleSignUpClose} />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
