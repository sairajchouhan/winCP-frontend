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
import { DropzoneArea } from 'material-ui-dropzone';

import { SET_LOADING_TRUE, SET_LOADING_FALSE } from '../redux/slices/winsSlice';
import { ERROR, SUCCESS } from '../utils/constants';
import { setSnackbar } from '../redux/slices/snackbarSlice';
import {
  uploadPostImagesToFirebase,
  savePostImageUrlsToFirestore,
} from '../redux/actions/postImageUploadActions';

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
  const user = useSelector((state) => state.auth.user);

  const [files, setFiles] = useState({ files: [] });
  const [data, setData] = useState({ body: '', title: '' });
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (files) => {
    setFiles({
      files,
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    dispatch(SET_LOADING_TRUE());
    const response = await createWin(data);
    dispatch(SET_LOADING_FALSE());
    if (!response.hasError) {
      try {
        const urls = await uploadPostImagesToFirebase(
          files.files,
          user.info.username
        );
        await savePostImageUrlsToFirestore(urls, response.winId);
        console.log(urls);
        history.push('/home');
        setSnackbar(dispatch, true, SUCCESS, 'Win created successfully');
      } catch (err) {
        setSnackbar(dispatch, true, ERROR, 'Something went wrong');
        console.log(err);
      }

      setFiles({ files: [] });
    } else {
      setErrors({ ...errors, ...response.errors });
      setSnackbar(dispatch, true, ERROR, 'Something went wrong');
    }
  };

  if (!user) {
    return <h1>Loading ra machas</h1>;
  }
  return (
    <Container className={classes.container} maxWidth='md'>
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid item>
            <Typography variant='h4'>Create Win</Typography>
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
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='title'
                label='Title of the win'
                name='title'
              />

              <TextField
                value={data.body}
                error={errors?.body}
                helperText={errors?.body}
                onChange={handleChange}
                className={classes.body}
                multiline={true}
                rows={10}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='body'
                label='Body of the win'
                name='body'
              />

              <Grid
                container
                justify='space-between'
                style={{ marginTop: '1em' }}
              >
                <Grid item xs={12}>
                  <DropzoneArea onChange={handleImageChange} />
                </Grid>
                <Button
                  type='submit'
                  variant='outlined'
                  color='secondary'
                  style={{ marginTop: '1em', marginLeft: 'auto' }}
                >
                  Submit
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </Container>
  );
};

export default CreatePost;
