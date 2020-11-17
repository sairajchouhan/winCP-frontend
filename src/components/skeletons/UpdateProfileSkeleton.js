import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
    height: '80vh',
  },
  formContainer: {
    marginTop: theme.spacing(5),
    width: '70%',
  },
  field: {
    marginBottom: theme.spacing(5),
  },
}));

const UpdateProfileSkeleton = () => {
  const classes = useStyles();
  return (
    <Container className={classes.container} maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid item xs={12}>
            <Skeleton animation="wave" variant="rect" height={50} width={400} />
          </Grid>
          <Grid item xs={12} className={classes.formContainer}>
            <Skeleton
              animation="wave"
              variant="rect"
              height={30}
              className={classes.field}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              height={30}
              className={classes.field}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              height={30}
              className={classes.field}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              height={30}
              className={classes.field}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              height={30}
              className={classes.field}
            />
            <Skeleton
              animation="wave"
              variant="rect"
              height={30}
              width={170}
              className={classes.field}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UpdateProfileSkeleton;
