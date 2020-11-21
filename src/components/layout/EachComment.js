import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import { ERROR, URL } from '../../utils/constants';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { setSnackbar } from '../../redux/slices/snackbarSlice';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    position: 'relative',
    marginBottom: theme.spacing(1),
  },

  username: {
    marginRight: theme.spacing(1),
    color: '#34495e',
  },
  threeDotIcon: {
    marginLeft: 'auto',
  },
  deleteComment: {
    position: 'absolute',
    backgroundColor: 'rgba(231, 127, 103, 0.3)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const EachComment = ({
  comment: { winId, body, createdAt, username, commentId },
  setData,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  const handleDeleteComment = async () => {
    setLoading((loading) => !loading);
    console.log('will delete a comment');
    try {
      await axios.delete(`${URL}/win/${winId}/${commentId}`);
      console.log('deleted successfully');
      const refetch = await axios.get(`${URL}/win/${winId}`);
      setData(refetch.data);
    } catch (err) {
      setSnackbar(dispatch, true, ERROR, 'cannot post the comment');
    }
    setLoading((loading) => !loading);
  };

  return (
    <Container>
      <CardContent className={classes.cardContent}>
        <Grid container alignItems='center' justify='space-between'>
          <Grid container alignItems='center'>
            <Grid item>
              <Typography
                className={classes.username}
                variant='subtitle1'
                color='textSecondary'
                component='p'
              >
                {username}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='caption' color='textSecondary' component='p'>
                {moment(createdAt).fromNow()}
              </Typography>
            </Grid>
            <Grid item justify='flex-end' className={classes.threeDotIcon}>
              {user && user.info.username === username && (
                <IconButton
                  aria-controls='comments-options-menu'
                  aria-haspopup='true'
                  onClick={handleDeleteComment}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Typography variant='subtitle2' color='textSecondary' component='p'>
          {body}
        </Typography>
        {loading && (
          <div className={classes.deleteComment}>
            <CircularProgress />
          </div>
        )}
      </CardContent>
    </Container>
  );
};

export default EachComment;
