import React, { useState } from 'react';
import { Link as routerLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { URL } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 450,
  },
  button: {
    color: 'white',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 99999,
    color: '#fff',
  },
}));

const EachNotification = ({ noti, setDrawerOpen }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const markNotificationAsRead = async () => {
    setLoading((loading) => !loading);
    try {
      await axios.post(`${URL}/notifications`, {
        notificationId: noti.notificationId,
      });
    } catch (err) {
      console.log(err.response.data);
    }

    setLoading((loading) => !loading);
    setDrawerOpen(false);
  };

  return (
    <Grid container justify='space-between' alignItems='center'>
      <Grid xs={10} item>
        <ListItem
          onClick={markNotificationAsRead}
          button
          component={routerLink}
          to={!noti.read ? `/win/${noti.winId}` : ''}
          key={noti?.notificationId}
        >
          {noti.type === 'comment' && (
            <ListItemIcon>
              <Badge color='secondary' variant={!noti.read ? 'dot' : ''}>
                <ChatBubbleOutlineIcon color='primary' />
              </Badge>
            </ListItemIcon>
          )}
          {noti.type === 'like' && (
            <ListItemIcon>
              <Badge color='secondary' variant={!noti.read ? 'dot' : ''}>
                <FavoriteBorderIcon color='secondary' />
              </Badge>
            </ListItemIcon>
          )}
          <Grid container direction='column'>
            <Grid item>
              {noti.type === 'comment' && (
                <Typography variant='body1'>
                  <Link
                    href='#'
                    onClick={() =>
                      console.log('will take to that user profile')
                    }
                  >
                    @{noti.sender}
                  </Link>{' '}
                  commented on your win
                </Typography>
              )}
              {noti.type === 'like' && (
                <Typography variant='body1'>
                  <Link
                    href='#'
                    onClick={() =>
                      console.log('will take to that user profile')
                    }
                  >
                    @{noti.sender}
                  </Link>{' '}
                  liked your win
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography variant='body2' display='block' gutterBottom>
                {moment(noti.createdAt).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        </ListItem>
      </Grid>
      <Grid xs={2} item>
        <IconButton>
          <DeleteIcon color='secondary' fontSize='small' />
        </IconButton>
      </Grid>
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </Grid>
  );
};

export default EachNotification;
