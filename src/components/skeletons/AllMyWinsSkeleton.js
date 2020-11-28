import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

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

const AllMyWinsSkeleton = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={3} square={true}>
      <Grid container alignItems='center' justify='space-between'>
        <>
          <Grid xs={12} className={classes.grid}>
            <Card className={classes.root}>
              <CardContent>
                <Grid item container direction='row' alignItems='center'>
                  <Skeleton
                    animation='circle'
                    variant='rect'
                    height={50}
                    width={50}
                  />
                  <Skeleton
                    style={{ marginLeft: '1em' }}
                    animation='wave'
                    variant='rect'
                    height={30}
                    width={300}
                  />
                </Grid>
                <Grid item>
                  <Skeleton
                    style={{ marginTop: '1em' }}
                    animation='wave'
                    variant='rect'
                    height={150}
                    width='100%'
                  />
                </Grid>
              </CardContent>
              <CardActions className={classes.count}></CardActions>
            </Card>
          </Grid>
        </>
      </Grid>
    </Paper>
  );
};

export default AllMyWinsSkeleton;
