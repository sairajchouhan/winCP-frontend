import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import { useSelector, useDispatch } from 'react-redux';
// import { loadUser, selectIsAuthenticated } from '../../redux/slices/authSlice';

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
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  const classes = useStyles();

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
            <Button component={Link} to="/login" color="inherit">
              Login
            </Button>
          </div>
          <div>
            <Button component={Link} to="/signup" color="inherit">
              SignUp
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
