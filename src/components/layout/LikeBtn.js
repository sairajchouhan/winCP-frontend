import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { selectUserLikes } from '../../redux/slices/authSlice';
import { URL } from '../../utils/constants';

const LikeBtn = ({ likesCount, winId }) => {
  const isLiked = (likes, winId) =>
    likes?.map((like) => like.winId).includes(winId);
  const likes = useSelector(selectUserLikes);
  const [liked, setLiked] = useState(isLiked(likes, winId));
  const [dummyLikesCount, setDummyLikesCount] = useState(likesCount);

  const handleLike = async () => {
    console.log('I am liking');
    setLiked((like) => !like);

    try {
      const res = await axios.get(`${URL}/win/${winId}/like`);
      console.log(res.data);
      setDummyLikesCount(res.data);
    } catch (err) {
      console.log(err.message);
      console.log('error in liking the post');
    }
  };
  const handleUnlike = async () => {
    console.log('I am unliking ');
    setLiked((like) => !like);

    try {
      const res = await axios.get(`${URL}/win/${winId}/unlike`);

      setDummyLikesCount(res.data);
    } catch (err) {
      console.log(err.message);
      console.log('error in liking the post');
    }
  };

  useEffect(() => {
    setLiked(isLiked(likes, winId));
  }, [likes, winId]);

  return (
    <Grid item>
      <Grid container alignItems="flex-end" style={{ marginRight: '10px' }}>
        {liked ? (
          <IconButton aria-label="like" onClick={() => handleUnlike()}>
            <FavoriteIcon color="secondary" />
          </IconButton>
        ) : (
          <IconButton aria-label="like" onClick={() => handleLike()}>
            <FavoriteBorderOutlinedIcon color="secondary" />
          </IconButton>
        )}
        <Typography variant="button" color="textSecondary" component="p">
          {dummyLikesCount}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LikeBtn;
