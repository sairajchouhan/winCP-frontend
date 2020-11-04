import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Typography from '@material-ui/core/Typography';

const CommentBtn = ({ showComment, setShowComment, commentsCount }) => {
  return (
    <Grid item>
      <Grid container alignItems="flex-end">
        {showComment ? (
          <IconButton
            aria-label="comment"
            onClick={() => setShowComment((showComment) => !showComment)}
          >
            <ChatBubbleIcon color="primary" />
          </IconButton>
        ) : (
          <IconButton
            aria-label="comment"
            onClick={() => setShowComment((showComment) => !showComment)}
          >
            <ChatBubbleOutlineIcon color="primary" />
          </IconButton>
        )}

        <Typography variant="button" color="textSecondary" component="p">
          {commentsCount}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CommentBtn;
