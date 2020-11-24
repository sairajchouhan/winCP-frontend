import React, { useState, useEffect } from 'react';
import { Link as routerLink } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { db } from '../../firebase/config';
import { selectUser } from '../../redux/slices/authSlice';
import { SET_NOTIFICATION } from '../../redux/slices/notificationsSlice';

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

const Notifications = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const notificationData = useSelector(
    (state) => state?.notifications?.notifications
  );

  console.log(notificationData);
  useEffect(() => {
    if (user) {
      db.collection('notifications')
        .orderBy('createdAt', 'desc')
        .where('recipient', '==', user.info.username)
        .onSnapshot(
          (querySnapshot) => {
            console.log('fetching the notifications');
            const notifications = [];
            querySnapshot.forEach((doc) => {
              notifications.push(doc.data());
            });
            dispatch(SET_NOTIFICATION(notifications));
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
    }
  }, []);

  if (!notificationData) {
    return <></>;
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const getUnreadNotifications = (notificationData) => {
    return notificationData
      ?.map((noti) => {
        return noti.read;
      })
      .filter((eachRead) => !eachRead).length;
  };

  const marknotificationAsRead = (notificationId, winId) => {
    console.log('I will mark notification as read');
    console.log(notificationId, winId);
    setDrawerOpen(false);
  };

  return (
    <>
      <Tooltip title='Notifications' placement='bottom'>
        <Button onClick={toggleDrawer(true)} className={classes.button}>
          <Badge
            badgeContent={getUnreadNotifications(notificationData)}
            color='secondary'
          >
            <NotificationsIcon color='white' />
          </Badge>
        </Button>
      </Tooltip>
      <Drawer
        className={classes.drawer}
        anchor={'right'}
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <div role='presentation' className={classes.list}>
          {notificationData?.map((noti) => {
            return (
              <>
                <Grid container justify='space-between' alignItems='center'>
                  <Grid xs={10} item>
                    <ListItem
                      button
                      component={routerLink}
                      to={`/win/${noti.winId}`}
                      key={noti?.notificationId}
                    >
                      {noti.type === 'comment' && (
                        <ListItemIcon>
                          <Badge color='secondary' variant='dot'>
                            <ChatBubbleOutlineIcon color='primary' />
                          </Badge>
                        </ListItemIcon>
                      )}
                      {noti.type === 'like' && (
                        <ListItemIcon>
                          <Badge color='secondary' variant='dot'>
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
                          <Typography
                            variant='body2'
                            display='block'
                            gutterBottom
                          >
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
                </Grid>
                <Divider />
              </>
            );
          })}
        </div>
      </Drawer>
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </>
  );
};

export default Notifications;
