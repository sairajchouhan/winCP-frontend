import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/slices/authSlice';
import AddIcon from '@material-ui/icons/Add';
import { logoutUser } from '../../redux/actions/authActions';
import Container from '@material-ui/core/Container';

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
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await dispatch(logoutUser());
    history.push('/');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h5"
              component={Link}
              to="/"
              className={classes.title}
            >
              winCP
            </Typography>
            {isAuthenticated === null ? (
              <></>
            ) : isAuthenticated === true ? (
              <>
                <Button color="inherit" component={Link} to="/create-post">
                  <AddIcon />
                </Button>
                <Button color="inherit" component={Link} to="/profile">
                  My Profile
                </Button>
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>

                <Button component={Link} to="/signup" color="inherit">
                  SignUp
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
