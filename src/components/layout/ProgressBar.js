import React, { useEffect } from 'react';
import useStorage from '../../hooks/useStorage';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  progress: {
    width: '100%',
  },
}));

const ProgressBar = ({ image, setImage }) => {
  const classes = useStyles();
  const { url, progress } = useStorage(image);
  console.log(progress, url);
  useEffect(() => {
    if (url) {
      setImage(null);
    }
  }, [url, setImage]);
  return (
    <LinearProgress
      className={classes.progress}
      variant="determinate"
      value={progress}
    />
  );
};

export default ProgressBar;
