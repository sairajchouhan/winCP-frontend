/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import LikeBtn from '../layout/LikeBtn';
import CommentBtn from '../layout/CommentBtn';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(4),
    maxWidth: '750px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Win = ({
  username,
  createdAt,
  body,
  likesCount,
  commentsCount,
  winId,
}) => {
  const classes = useStyles();

  return (
    <Paper>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {username[0].toUpperCase()}
            </Avatar>
          }
          title={username}
          subheader={moment(createdAt).fromNow()}
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container>
            <LikeBtn likesCount={likesCount} winId={winId} />
            <CommentBtn winId={winId} commentsCount={commentsCount} />
          </Grid>
        </CardActions>
        {/* <CommentField winId={winId} showComment={showComment} /> */}
        {/* <EachComment showComment={showComment} /> */}
      </Card>
    </Paper>
  );
};

export default Win;
