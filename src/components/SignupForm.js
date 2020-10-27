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

import { useAuthFormStyles } from '../utils/styles/formStyles';

export default function SignUpForm({ open, handleClose }) {
  const styles = useAuthFormStyles();
  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleChange = (e) => {
    console.log('change is happenes');
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    try {
      const res = await axios.post(
        'http://localhost:5001/wincp-9d49a/us-central1/api/signup',
        signUpFormData
      );
      console.log('res is', res);
      const token = res.data.token;
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
      signUpFormData.username = '';
      signUpFormData.email = '';
      signUpFormData.password = '';
      signUpFormData.confirmPassword = '';
      handleClose();
    } catch (err) {
      console.log(err.response.data.errors);
      setErrors(err.response.data.errors);
      setOpenBackdrop(false);
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
            SignUp
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            error={errors.username ? true : false}
            helperText={errors.username ? errors.username : null}
            autoFocus
            name="username"
            margin="dense"
            label="Username"
            type="text"
            value={signUpFormData.username}
            onChange={handleChange}
            fullWidth
            className={styles.field}
          />
          <TextField
            error={errors.email ? true : false}
            helperText={errors.email ? errors.email : null}
            name="email"
            margin="dense"
            label="Email Address"
            type="email"
            value={signUpFormData.email}
            onChange={handleChange}
            fullWidth
            className={styles.field}
          />
          <TextField
            error={errors.password ? true : false}
            helperText={errors.password ? errors.password : null}
            name="password"
            margin="dense"
            label="Password"
            type="password"
            value={signUpFormData.password}
            onChange={handleChange}
            fullWidth
            className={styles.field}
          />
          <TextField
            error={
              errors.confirmPassword || errors.confirmPassword === ''
                ? true
                : false
            }
            helperText={errors.confirmPassword ? errors.confirmPassword : null}
            name="confirmPassword"
            margin="dense"
            label="Confirm Password"
            type="password"
            value={signUpFormData.confirmPassword}
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
