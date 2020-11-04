import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';

const EachComment = ({ showComment }) => {
  return (
    <Collapse in={showComment} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography variant="subtitle1" color="textSecondary" component="p">
          username
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Collapse>
  );
};

export default EachComment;
