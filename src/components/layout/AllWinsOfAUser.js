/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import axios from 'axios';

import { URL } from '../../utils/constants';
import AllMyWinsSkeleton from '../skeletons/AllMyWinsSkeleton';

const useStyles = makeStyles((theme) => ({
  img: {
    borderRadius: '50%',
    width: '200px',
    objectFit: 'contain',
  },
  grid: {
    marginBottom: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(3),
  },
  root: {
    boxShadow: 'none',
    marginBottom: theme.spacing(2),
  },
  count: {
    padding: theme.spacing(2),
  },
  title: {
    cursor: 'pointer',
  },
}));

const AllWinsOfAUser = ({ username }) => {
  const classes = useStyles();
  const history = useHistory();
  const [wins, setWins] = useState([]);

  useEffect(() => {
    const getWIns = async () => {
      console.log('running useEffect');
      const res = await axios.get(`${URL}/wins/${username}`);
      setWins(res.data.wins);
    };
    getWIns();
  }, []);

  console.log(wins);

  if (wins.length === 0) {
    return <AllMyWinsSkeleton />;
  }

  return (
    <Paper className={classes.paper} elevation={3} square={true}>
      <Grid container alignItems='center' justify='space-between'>
        {wins.map((win) => {
          return (
            <>
              <Grid xs={12} className={classes.grid}>
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label='recipe'
                        className={classes.avatar}
                        src={win.profileImgUrl}
                      />
                    }
                    title={username}
                    subheader={moment(win.createdAt).format('MMMM Do YYYY')}
                  />
                  <CardContent>
                    <Typography
                      variant='h6'
                      color='black'
                      component='p'
                      className={classes.title}
                      onClick={() => {
                        history.push(`/win/${win.id}`);
                      }}
                    >
                      {win.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      {win.body}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.count}>
                    <Typography variant='body2' color='secondary'>
                      {win.likesCount} likes
                    </Typography>
                    <Typography variant='body2' color='primary'>
                      {win.commentsCount} comments
                    </Typography>
                  </CardActions>
                </Card>
                <Divider />
              </Grid>
            </>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default AllWinsOfAUser;
