import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { createWin } from '../redux/actions/winsActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SET_LOADING_TRUE, SET_LOADING_FALSE } from '../redux/slices/winsSlice';
import { ERROR, SUCCESS } from '../utils/constants';
import { setSnackbar } from '../redux/slices/snackbarSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  form: {
    width: '100%',
  },
  media: {
    height: 100,
    paddingTop: '56.25%', // 16:9
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  progress: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

const CreatePost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.wins.loading);

  const [data, setData] = useState({ body: '', title: '' });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    console.log('inside of handle change');

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    dispatch(SET_LOADING_TRUE());
    const resErrors = await createWin(data);
    setErrors({ ...resErrors });
    dispatch(SET_LOADING_FALSE());
    if (!resErrors) {
      history.push('/home');
      setSnackbar(dispatch, true, SUCCESS, 'Win created successfully');
    } else {
      setSnackbar(dispatch, true, ERROR, 'Something went wrong');
    }
  };
  return (
    <Container className={classes.container} maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid item>
            <Typography variant="h4">Create Win</Typography>
          </Grid>

          <Grid container item xs={12}>
            <form
              className={classes.form}
              onSubmit={handlePostSubmit}
              noValidate
            >
              <TextField
                value={data.title}
                error={errors?.title}
                helperText={errors?.title}
                className={classes.title}
                onChange={handleChange}
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title of the win"
                name="title"
              />

              <TextField
                value={data.body}
                error={errors?.body}
                helperText={errors?.body}
                onChange={handleChange}
                className={classes.body}
                multiline={true}
                rows={10}
                variant="filled"
                margin="normal"
                required
                fullWidth
                id="body"
                label="Body of the win"
                name="body"
              />

              <Grid container justify="space-between">
                <Grid item>
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: 'none' }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                    />
                    <Button
                      color="secondary"
                      variant="outlined"
                      component="span"
                    >
                      Upload Image
                    </Button>
                  </label>
                </Grid>
                <Button type="submit" variant="outlined" color="primary">
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
};

export default CreatePost;
