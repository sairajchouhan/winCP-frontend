/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { URL } from '../../utils/constants';

import { likeAWin } from '../../redux/actions/winsActions';
import { selectUser } from '../../redux/slices/authSlice';
import Comment from '../layout/CommentField';

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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const allLikes = user?.likes.map((like) => like.winId);
  const likedDB = allLikes?.includes(winId);

  const [liked, setLiked] = useState(likedDB);
  const [dummyLikesCount, setDummyLikesCount] = useState(likesCount);
  const [showComment, setShowComment] = useState(false);

  const handleLike = async () => {
    console.log('I am liking');
    setLiked((like) => !like);
    setDummyLikesCount((dummyLikes) => dummyLikes + 1);
    try {
      const res = await axios.get(`${URL}/win/${winId}/like`);
      console.log(res.data);
    } catch (err) {
      console.log('Error in liking the post');
    }
  };
  const handleUnlike = async () => {
    console.log('I am unliking ');
    setLiked((like) => !like);
    setDummyLikesCount((dummyLikes) => dummyLikes - 1);
    try {
      const res = await axios.get(`${URL}/win/${winId}/unlike`);
      console.log(res.data);
    } catch (err) {
      console.log('Error in unliking the post');
    }
  };

  useEffect(() => {
    setLiked(likedDB);
  }, [likedDB]);

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
            <Grid item>
              <Grid
                container
                alignItems="flex-end"
                style={{ marginRight: '10px' }}
              >
                {liked ? (
                  <IconButton
                    className={classes.icon}
                    aria-label="like"
                    onClick={() => handleUnlike()}
                  >
                    <FavoriteIcon color="secondary" />
                  </IconButton>
                ) : (
                  <IconButton
                    className={classes.icon}
                    aria-label="like"
                    onClick={() => handleLike()}
                  >
                    <FavoriteBorderOutlinedIcon color="secondary" />
                  </IconButton>
                )}
                <Typography
                  variant="button"
                  color="textSecondary"
                  component="p"
                >
                  {dummyLikesCount}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="flex-end">
                {showComment ? (
                  <IconButton
                    aria-label="comment"
                    onClick={() =>
                      setShowComment((showComment) => !showComment)
                    }
                  >
                    <ChatBubbleIcon color="primary" />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="comment"
                    onClick={() =>
                      setShowComment((showComment) => !showComment)
                    }
                  >
                    <ChatBubbleOutlineIcon color="primary" />
                  </IconButton>
                )}

                <Typography
                  variant="button"
                  color="textSecondary"
                  component="p"
                >
                  {commentsCount}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardActions>
        <Comment showComment={showComment} />
      </Card>
    </Paper>
  );
};

export default Win;
