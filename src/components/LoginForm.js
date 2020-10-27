import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles({
  field: {
    marginBottom: '20px',
  },
});

export default function LoginForm({ open, handleClose }) {
  const styles = useStyles();
  const [logInFormData, setLogInFormData] = useState({
    email: '',
    password: '',
  });
  const [token, setToken] = useState('');
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    console.log('change is happenes');
    setLogInFormData({
      ...logInFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5001/wincp-9d49a/us-central1/api/login',
        logInFormData
      );
      console.log(res.data.token);
      setToken(res.data.token);
    } catch (err) {
      setErrors(err.response.data.errors);
      console.log(err.response.data.errors);
    }

    // axios.get('https://example.com/getSomething', {
    //   headers: {
    //     Authorization: 'Bearer ' + token, //the token is a variable which holds the token
    //   },
    // });
    // handleClose();
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
          <Typography variant="h4" gutterBottom color="secondary">
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
      </Dialog>
    </div>
  );
}
