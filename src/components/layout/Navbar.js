import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectIsAuthenticated,
  selectUser,
} from '../../redux/slices/authSlice';
import AddIcon from '@material-ui/icons/Add';
import { logoutUser } from '../../redux/actions/authActions';
import Container from '@material-ui/core/Container';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getAllWins } from '../../redux/actions/winsActions';

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
  button: {
    color: 'white',
  },
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  list: {
    width: 250,
  },
}));

const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await dispatch(logoutUser());
    handleClose();
    history.push('/');
  };

  const refetchPosts = async () => {
    console.log('I will refetch wins');
    await dispatch(getAllWins());
  };

  const list = (anchor) => (
    <div
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={classes.list}
    >
      <List>
        <ListItem button>
          <ListItemText primary={'asdfasdf'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary={'asdfasdf'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary={'asdfasdf'} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h5"
              component={Link}
              onClick={refetchPosts}
              to="/home"
              className={classes.title}
            >
              winCP
            </Typography>
            {isAuthenticated === null ? (
              <></>
            ) : isAuthenticated === true ? (
              <>
                <Tooltip title="Add" placement="bottom">
                  <Button color="inherit" component={Link} to="/create-post">
                    <AddIcon />
                  </Button>
                </Tooltip>
                <>
                  <Tooltip title="Notifications" placement="bottom">
                    <Button
                      onClick={toggleDrawer(true)}
                      className={classes.button}
                    >
                      <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon color="white" />
                      </Badge>
                    </Button>
                  </Tooltip>
                  <Drawer
                    anchor={'right'}
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                  >
                    {list('right')}
                  </Drawer>
                </>

                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Avatar
                    className={classes.avatar}
                    alt="Remy Sharp"
                    src={user?.info?.profileImgUrl}
                  />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <>
                    <MenuItem
                      component={Link}
                      to="/profile"
                      onClick={handleClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>My Wins</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                </Menu>
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
