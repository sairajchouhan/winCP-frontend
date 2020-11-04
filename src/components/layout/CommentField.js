import React, { useState } from 'react';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  comment: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  commentGridItem: {
    width: '90%',
  },
}));

const Comment = ({ showComment }) => {
  const classes = useStyles();
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log('submited');

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
