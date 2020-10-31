import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

import { selectUser } from '../redux/slices/authSlice';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  img: {
    borderRadius: '50%',
  },
  paper: {
    padding: theme.spacing(3),
  },
  gridTwo: {
    marginTop: theme.spacing(5),
  },
}));

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  if (user === null || user === undefined) {
    return <h1>chinna inka time undhi</h1>;
  }
  return (
    <Container className={classes.container} maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <Typography variant="h4">User Profile</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container className={classes.gridTwo} gap={5}>
          <Grid item lg={4}>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt="complex"
                src="https://firebasestorage.googleapis.com/v0/b/wincp-9d49a.appspot.com/o/defaultProfilePic.svg?alt=media&token=e4dc1db7-fc01-4171-a950-3fe659d3b346"
              />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} md={8} container justify="center">
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {user.info.username}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {user.info.email}
                </Typography>
                <Typography gutterBottom variant="body1">
                  {user.info.createdAt}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ButtonBase className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://firebasestorage.googleapis.com/v0/b/wincp-9d49a.appspot.com/o/defaultProfilePic.svg?alt=media&token=e4dc1db7-fc01-4171-a950-3fe659d3b346"
                />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} md={8} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h6">
                    {user.info.username}
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    {user.info.email}
                  </Typography>
                  <Typography gutterBottom variant="body1">
                    {user.info.createdAt}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
      </Paper>
    </Container>
  );
};

export default ProfilePage;
