import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../redux/slices/authSlice';
import winSvg from '../utils/assets/winners.svg';
import Grid from '@material-ui/core/Grid';
import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1400px',
    margin: '0 auto',

    height: '90vh',
    display: 'flex',
  },
  left: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    width: '50%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
  },
  subheading: {
    color: '#2f2f2f',
  },
}));

const PageLanding = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Typography variant='h1' className={classes.heading}>
          Your wins matters
        </Typography>
        <Typography variant='h3' className={classes.subheading}>
          Let others know your wins and progress together
        </Typography>
      </div>
      <div className={classes.right}>
        <img src={winSvg} alt='' className={classes.img} />
      </div>
    </div>
  );
};

export default PageLanding;
