import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  field: {
    marginBottom: '20px',
  },
});

export default function LoginForm({ open, handleClose }) {
  const [logInFormData, setLogInFormData] = useState({
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    console.log('change is happenes');
    setLogInFormData({
      ...logInFormData,
      [e.target.name]: e.target.value,
    });
  };
  const styles = useStyles();

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
          <Button onClick={handleClose} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
