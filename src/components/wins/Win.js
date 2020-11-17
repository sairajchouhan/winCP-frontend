/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
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

  title: {
    cursor: 'pointer',
  },
}));

const Win = ({
  username,
  createdAt,
  body,
  title,
  likesCount,
  commentsCount,
  winId,
  profileImgUrl,
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Paper>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={profileImgUrl}
            />
          }
          title={username}
          subheader={moment(createdAt).fromNow()}
        />
        <CardContent>
          <Typography
            variant="h6"
            color="black"
            component="p"
            className={classes.title}
            onClick={() => {
              history.push(`/win/${winId}`);
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Grid container>
            <LikeBtn likesCount={likesCount} winId={winId} />
            <CommentBtn winId={winId} commentsCount={commentsCount} />
          </Grid>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default Win;
