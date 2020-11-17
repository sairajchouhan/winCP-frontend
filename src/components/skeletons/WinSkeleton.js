import React from 'react';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

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

const WinSkeleton = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />

        <Skeleton animation="wave" variant="rect" className={classes.media} />

        <CardContent>
          <>
            <Skeleton
              animation="wave"
              height={15}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={15} width="80%" />
          </>
        </CardContent>
      </Card>
    </Container>
  );
};

export default WinSkeleton;
