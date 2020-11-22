import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { useHistory } from 'react-router-dom';

import { SUCCESS, URL, ERROR } from '../utils/constants';
import LikeBtn from '../components/layout/LikeBtn';
import CommentBtn from '../components/layout/CommentBtn';
import WinSkeleton from '../components/skeletons/WinSkeleton';
import CommentField from '../components/layout/CommentField';
import EachComment from '../components/layout/EachComment';
import { selectUser } from '../redux/slices/authSlice';
import { SET_LOADING_FALSE, SET_LOADING_TRUE } from '../redux/slices/winsSlice';
import { deleteAWin } from '../redux/actions/winsActions';
import { setSnackbar } from '../redux/slices/snackbarSlice';
import Carousel from '../components/layout/Carousel';
import EachWinHeader from '../components/layout/EachWinHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  container: {
    marginTop: theme.spacing(2),
    maxWidth: '750px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 99999,
    color: '#fff',
  },
}));

const EachWin = () => {
  const classes = useStyles();
  const { winId } = useParams();
  const loading = useSelector((state) => state.wins.loading);
  const user = useSelector(selectUser);

  const [data, setData] = useState(null);

  useEffect(() => {
    async function getAWin() {
      try {
        const res = await axios.get(`${URL}/win/${winId}`);
        setData(res.data);
      } catch (error) {
        console.log('error finding a single post');
      }
    }
    getAWin();
  }, [winId]);
  if (!data || !user) {
    return <WinSkeleton />;
  }
  console.log(data);
  return (
    <Container className={classes.container}>
      <Paper>
        <Card className={classes.root}>
          <EachWinHeader data={data} user={user} />
          <Carousel images={data.postImageUrls} />
          <CardContent>
            <Typography variant='h6' color='black' component='p'>
              {data.title}
            </Typography>
            <Typography variant='body1' color='textSecondary' component='p'>
              {data.body}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Grid container>
              <LikeBtn likesCount={data?.likesCount} winId={winId} />
              <CommentBtn winId={winId} commentsCount={data.commentsCount} />
            </Grid>
          </CardActions>
          <CommentField
            setData={setData}
            showComment={true}
            winId={data.winId}
          />
          {data.comments &&
            data.comments.map((comment) => (
              <EachComment setData={setData} comment={comment} />
            ))}
        </Card>
      </Paper>
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </Container>
  );
};

export default EachWin;
