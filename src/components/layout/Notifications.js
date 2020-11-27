import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Badge from '@material-ui/core/Badge';

import { db } from '../../firebase/config';
import { selectUser } from '../../redux/slices/authSlice';
import { SET_NOTIFICATION } from '../../redux/slices/notificationsSlice';
import EachNotification from './EachNotification';

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

  const notificationData = useSelector(
    (state) => state?.notifications?.notifications
  );

  useEffect(() => {
    if (user) {
      db.collection('notifications')
        .orderBy('createdAt', 'desc')
        .where('recipient', '==', user.info.username)
        .onSnapshot(
          (snap) => {
            console.log('fetching the notifications');
            const notifications = [];
            snap.forEach((doc) => {
              notifications.push(doc.data());
            });
            console.log(notifications);
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
                <EachNotification setDrawerOpen={setDrawerOpen} noti={noti} />
                <Divider />
              </>
            );
          })}
        </div>
      </Drawer>
    </>
  );
};

export default Notifications;
