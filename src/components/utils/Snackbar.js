import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { SET_SNACKBAR } from '../../redux/slices/snackbarSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbars = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const snackbarOpen = useSelector((state) => state?.snackbar?.snackbarOpen);
  const snackbarType = useSelector((state) => state?.snackbar?.snackbarType);
  const snackbarMessage = useSelector(
    (state) => state.snackbar?.snackbarMessage
  );
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(
      SET_SNACKBAR({ snackbarOpen: false, snackbarType, snackbarMessage })
    );
  };
  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant='filled'
          onClose={handleClose}
          color={snackbarType}
          severity={snackbarType}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbars;
