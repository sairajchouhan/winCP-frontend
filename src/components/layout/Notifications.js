import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { db } from '../../firebase/config';
import { selectUser } from '../../redux/slices/authSlice';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  button: {
    color: 'white',
  },
}));

const Notifications = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection('notifications')
        .where('recipient', '==', user.info.username)
        .onSnapshot(
          (querySnapshot) => {
            const notifications = [];
            querySnapshot.forEach((doc) => {
              notifications.push(doc.data());
            });
            setNotificationData(notifications);
          },
          (err) => {
            console.log(`Encountered error: ${err}`);
          }
        );
    }
  }, [user]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen(open);
  };
  console.log(notificationData.length);
  const list = (notificationsArray) => (
    <div
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={classes.list}
    >
      {notificationsArray.map((noti) => {
        return (
          <>
            <List>
              <ListItem
                button
                onClick={() => toggleDrawer(false)}
                component={Link}
                to={`/win/${noti.winId}`}
              >
                <ListItemText
                  primary={`${noti.sender} ${
                    noti.type === 'comment'
                      ? 'commented'
                      : noti.type === 'like' && 'liked'
                  } on your win`}
                />
              </ListItem>
            </List>
            <Divider />
          </>
        );
      })}
    </div>
  );
  return (
    <>
      <Tooltip title='Notifications' placement='bottom'>
        <Button onClick={toggleDrawer(true)} className={classes.button}>
          <Badge badgeContent={notificationData.length} color='secondary'>
            <NotificationsIcon color='white' />
          </Badge>
        </Button>
      </Tooltip>
      <Drawer anchor={'right'} open={drawerOpen} onClose={toggleDrawer(false)}>
        {list(notificationData)}
      </Drawer>
    </>
  );
};

export default Notifications;
