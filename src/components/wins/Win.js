/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import classNames from 'classnames';

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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const Win = ({ username, createdAt, body }) => {
  const classes = useStyles();
  const [like, setLike] = useState(false);
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
          <div>
            {like ? (
              <IconButton
                aria-label="like"
                onClick={() => setLike((like) => !like)}
              >
                <FavoriteIcon color="secondary" />
              </IconButton>
            ) : (
              <IconButton
                aria-label="like"
                onClick={() => setLike((like) => !like)}
              >
                <FavoriteBorderOutlinedIcon color="secondary" />
              </IconButton>
            )}
          </div>

          <IconButton aria-label="comment">
            <ChatBubbleOutlineIcon color="primary" />
          </IconButton>
        </CardActions>
      </Card>
    </Paper>
  );
};

export default Win;
