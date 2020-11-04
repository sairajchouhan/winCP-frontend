import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import { useHistory } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

const CommentBtn = ({ commentsCount, winId }) => {
  const history = useHistory();
  return (
    <Grid item>
      <Grid container alignItems="flex-end">
        <IconButton
          aria-label="comment"
          onClick={() => history.push(`/win/${winId}`)}
        >
          <InsertCommentIcon color="primary" />
        </IconButton>

        <Typography variant="button" color="textSecondary" component="p">
          {commentsCount}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default CommentBtn;
