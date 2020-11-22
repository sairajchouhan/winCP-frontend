import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';

import { SUCCESS, URL } from '../utils/constants';
import { setSnackbar } from '../redux/slices/snackbarSlice';
import { selectIsAuthenticated } from '../redux/slices/authSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '70vh',
  },
  grid: {
    height: '100%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }

  const sendPasswordResetEmail = async () => {
    setLoading((loading) => !loading);
    const emailRegEx = /^(([^<>([\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.trim() === '') {
      setError('Email cannot be blank');
      setLoading((loading) => !loading);
      return;
    }
    if (!email.match(emailRegEx)) {
      setError('Enter a valid email');
      setLoading((loading) => !loading);
      return;
    }
    try {
      await axios.post(`${URL}/reset-password`, { email });
      setEmail('');
      setError('');
      history.push('/login');
      setSnackbar(
        dispatch,
        true,
        SUCCESS,
        'Password reset email sent successfully, check your inbox'
      );
    } catch (err) {
      setError(err.response.data.error);
    }
    setLoading((loading) => !loading);
  };

  return (
    <div>
      <Container maxWidth='xs' className={classes.container}>
        <Grid
          container
          justify='center'
          alignItems='center'
          className={classes.grid}
        >
          <Grid item xs={12}>
            <TextField
              value={email}
              error={error}
              helperText={error}
              onChange={(e) => setEmail(e.target.value)}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='password-reset-email'
              label='Enter Your Email Adress'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <Button
              onClick={sendPasswordResetEmail}
              fullWidth
              variant='contained'
              color='primary'
            >
              send password reset email
            </Button>
          </Grid>
        </Grid>
        {loading && (
          <Backdrop className={classes.backdrop} open={true}>
            <CircularProgress color='inherit' />
          </Backdrop>
        )}
      </Container>
    </div>
  );
};

export default ResetPassword;
