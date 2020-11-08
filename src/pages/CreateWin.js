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
import ProgressBar from '../components/layout/ProgressBar';

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
  const [data, setData] = useState({ body: '' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.wins.loading);

  const types = ['image/png', 'image/jpeg'];

  const imageChangeHandler = (e) => {
    let selected = e.target.files[0];
    console.log(selected);
    if (selected && types.includes(selected.type)) {
      setImage(selected);
      setError(null);
    } else {
      setImage(null);
      setError('please select a image file(png or jpeg)');
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    dispatch(SET_LOADING_TRUE());
    await createWin(data);
    dispatch(SET_LOADING_FALSE());
    history.push('/home');
  };

  return (
    <Container className={classes.container} maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid item>
            <Typography variant="h4">Create Post</Typography>
          </Grid>

          <Grid container item xs={12}>
            <form className={classes.form} onSubmit={handlePostSubmit}>
              <TextField
                value={data.body}
                onChange={(e) => {
                  console.log('chaning');
                  setData((data) => ({ ...data, body: e.target.value }));
                }}
                className={classes.body}
                multiline={true}
                rows={10}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="body"
                label="Body of the post"
                name="body"
              />
              <Grid item container className={classes.progress}>
                {error && (
                  <Typography color="error" gutterBottom>
                    {error}
                  </Typography>
                )}
                {image && <Typography gutterBottom>{image.name}</Typography>}
                {image && (
                  <ProgressBar
                    style={{ width: '100%' }}
                    image={image}
                    setImage={setImage}
                  />
                )}
              </Grid>
              <Grid container justify="space-between">
                <Grid item>
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: 'none' }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={imageChangeHandler}
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
