import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '../redux/slices/authSlice';
import winSvg from '../utils/assets/winners.svg';
import Grid from '@material-ui/core/Grid';
import { Container, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  leftContainer: {
    padding: theme.spacing(4),
  },
}));

const PageLanding = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <div>
      <Grid container className={classes.container}>
        <Grid
          item
          xs={12}
          md={6}
          container
          justify='center'
          alignItems='center'
          direction='column'
        >
          <div className={classes.leftContainer}>
            <Typography variant='h1'>Your wins matters</Typography>
            <Typography variant='h3'>Your wins matters</Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <img style={{ width: '90%' }} src={winSvg} alt='' />
        </Grid>
      </Grid>
    </div>
  );
};

export default PageLanding;
