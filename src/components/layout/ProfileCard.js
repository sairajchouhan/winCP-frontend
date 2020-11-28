import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core';
import ImageComp from './ImageComp';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  img: {
    borderRadius: '50%',
    width: '200px',
    objectFit: 'contain',
  },

  paper: {
    padding: theme.spacing(3),
  },

  large: {
    width: '200px',
    height: '200px',
  },
}));

const ProfileCard = ({ user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Paper className={classes.paper} elevation={3} square={true}>
      <Grid container alignItems='center' justify='flex-end'>
        <Grid item>
          <IconButton
            aria-label='settings'
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={RouterLink}
              to='/profile/edit'
              onClick={handleClose}
            >
              Edit Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>Delete Account</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Grid
        container
        className={classes.gridTwo}
        alignItems='center'
        justify='space-around'
      >
        <Grid item direction='column'>
          <Typography gutterBottom variant='h5'>
            {user.info.username}
          </Typography>
          <Typography gutterBottom variant='subtitle1'>
            {user.info.email}
          </Typography>
          {user.info.bio && (
            <Typography gutterBottom variant='body1'>
              {user.info.bio}
            </Typography>
          )}
          {user.info.location && (
            <Typography gutterBottom variant='body1'>
              {user.info.location}
            </Typography>
          )}
          <Typography gutterBottom variant='body1'>
            User since {moment(user.info.createdAt).format('MMMM Do YYYY')}
          </Typography>
          {user.info.website && (
            <Typography gutterBottom variant='body1'>
              <Link href={user.info.website} target='_blank' rel='noreferrer'>
                {user.info.website}
              </Link>
            </Typography>
          )}
        </Grid>
        <Grid item justify='center' alignItems='center'>
          <ButtonBase>
            <ImageComp w={250} h={250} src={user.info.profileImgUrl} />
          </ButtonBase>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileCard;
