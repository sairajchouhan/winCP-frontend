import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

// import { getAllWins, selectAllWins } from '../redux/slices/winsSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    maxWidth: '750px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container}>
        this is the container inthe home page
      </Container>
    </div>
  );
};

export default Home;
