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
}));

const CreatePost = () => {
  const classes = useStyles();
  const [data, setData] = useState({ body: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state) => state.wins.loading);

  const handlePostSubmit = async (e) => {
    console.log('about to create a post');
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
              <Button type="submit" variant="outlined" color="primary">
                Submit
              </Button>
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
