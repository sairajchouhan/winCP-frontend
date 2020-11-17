import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import { db } from '../../firebase/config';
import { selectUser } from '../../redux/slices/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../../redux/actions/authActions';

const useStyles = makeStyles((theme) => ({}));

const ProgressBar = ({ image, setImage }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(selectUser);
  const { url, progress } = useStorage(image);
  console.log(progress, url);
  useEffect(() => {
    if (url) {
      setImage(null);
      db.collection('users')
        .doc(user?.info?.username)
        .update({ profileImgUrl: url })
        .then(() => {
          dispatch(loadUser());
          return db
            .collection('wins')
            .where('username', '==', user?.info?.username)
            .get();
        })
        .then((data) => {
          data.forEach((doc) => {
            doc.ref.update({ profileImgUrl: url });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url, setImage, image, user?.info?.username, dispatch]);
  return (
    <LinearProgress
      className={classes.progress}
      variant="determinate"
      value={progress}
    />
  );
};

export default ProgressBar;
