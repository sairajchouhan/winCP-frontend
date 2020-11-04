import React, { useState } from 'react';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { URL } from '../../utils/constants';

const useStyles = makeStyles((theme) => ({
  comment: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    width: '100%',
  },
  commentGridItem: {
    width: '90%',
  },
}));

const Comment = ({ showComment, winId, setData }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log('submited');
    try {
      const res = await axios.post(`${URL}/win/${winId}/comment`, {
        body: comment,
      });
      console.log(res.data);
    } catch (err) {
      console.log('error in posting the comment');
    }
    setComment('');
  };

  return (
    <CardActions>
      <Grid container justify="center">
        <Grid item className={classes.commentGridItem}>
          <Collapse in={showComment} timeout="auto" unmountOnExit>
            <form onSubmit={handleCommentSubmit}>
              <TextField
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={classes.comment}
                label="Comment"
                fullWidth={true}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <SendIcon onClick={handleCommentSubmit} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Collapse>
        </Grid>
      </Grid>
    </CardActions>
  );
};

export default Comment;
