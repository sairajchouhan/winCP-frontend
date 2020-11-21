import React, { useState } from 'react';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { ERROR, URL } from '../../utils/constants';
import { useDispatch } from 'react-redux';
import { setSnackbar } from '../../redux/slices/snackbarSlice';

const useStyles = makeStyles((theme) => ({
  comment: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    width: '100%',
  },
  commentGridItem: {
    width: '90%',
    position: 'relative',
  },
  commentLoading: {
    position: 'absolute',
    top: -35,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Comment = ({ showComment, winId, setData }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async (e) => {
    setLoading((loading) => !loading);
    e.preventDefault();
    console.log('submited');
    try {
      await axios.post(`${URL}/win/${winId}/comment`, {
        body: comment,
      });
      const refetch = await axios.get(`${URL}/win/${winId}`);
      setData(refetch.data);
    } catch (err) {
      setSnackbar(dispatch, true, ERROR, 'something went wrong');
    }
    setComment('');
    setLoading((loading) => !loading);
  };

  return (
    <CardActions>
      <Grid container justify='center'>
        <Grid item className={classes.commentGridItem}>
          <Collapse in={showComment} timeout='auto' unmountOnExit>
            <form onSubmit={handleCommentSubmit}>
              <TextField
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={classes.comment}
                label='Comment'
                fullWidth={true}
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='start'>
                      <IconButton>
                        <SendIcon onClick={!loading && handleCommentSubmit} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Collapse>
          {loading && (
            <div className={classes.commentLoading}>
              <CircularProgress />
            </div>
          )}
        </Grid>
      </Grid>
    </CardActions>
  );
};

export default Comment;
