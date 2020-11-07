import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { URL } from '../utils/constants';
import LikeBtn from '../components/layout/LikeBtn';
import CommentBtn from '../components/layout/CommentBtn';
import WinSkeleton from '../components/skeletons/WinSkeleton';
import CommentField from '../components/layout/CommentField';
import EachComment from '../components/layout/EachComment';

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
  avatar: {
    backgroundColor: 'red',
  },
}));

const EachWin = () => {
  const classes = useStyles();
  const { winId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getAWin() {
      try {
        const res = await axios.get(`${URL}/win/${winId}`);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log('error finding a single post');
      }
    }
    getAWin();
  }, [winId]);
  if (data === null) {
    return <WinSkeleton />;
  }
  return (
    <Container className={classes.container}>
      <Paper>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                S
              </Avatar>
            }
            title={data.username}
            subheader={moment(data?.createdAt).fromNow()}
          />
          <CardMedia
            className={classes.media}
            image="https://images.unsplash.com/photo-1595835018346-5f8fb50fa837?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
            title="sample"
          />
          <CardContent>
            <Typography variant="body1" color="textSecondary" component="p">
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
    </Container>
  );
};

export default EachWin;
