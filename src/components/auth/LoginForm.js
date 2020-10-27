import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

import { useAuthFormStyles } from '../../utils/styles/formStyles';

export default function LoginForm({ open, handleClose }) {
  const styles = useAuthFormStyles();
  const [logInFormData, setLogInFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleChange = (e) => {
    console.log('change is happenes');
    setLogInFormData({
      ...logInFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    try {
      const res = await axios.post(
        'http://localhost:5001/wincp-9d49a/us-central1/api/login',
        logInFormData
      );
      const token = res.data.token;
      localStorage.setItem('token', token);
      console.log(token);
      // const userDetailsResponse = await axios.get(
      //   'http://localhost:5001/wincp-9d49a/us-central1/api/user',
      //   {
      //     headers: {
      //       Authorization: 'Bearer ' + token,
      //     },
      //   }
      // );
      // const userDetails = userDetailsResponse.data;
      // console.log(userDetails);
      setOpenBackdrop(false);
      logInFormData.email = '';
      logInFormData.password = '';
      handleClose();
    } catch (err) {
      setErrors(err.response.data.errors);
      setOpenBackdrop(false);
      console.log(err.response.data.errors);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
      >
        <DialogTitle>
          <Typography gutterBottom color="secondary">
            LogIn
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email : null}
            id="my-login-email-adress"
            autoFocus
            name="email"
            margin="dense"
            label="Email Address"
            type="email"
            value={setLogInFormData.email}
            onChange={handleChange}
            fullWidth
            className={styles.field}
          />
          <TextField
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password : null}
            id="my-login-password"
            name="password"
            margin="dense"
            label="Password"
            type="password"
            value={setLogInFormData.password}
            onChange={handleChange}
            fullWidth
            className={styles.field}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
        <Backdrop className={styles.backdrop} open={openBackdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
    </div>
  );
}
