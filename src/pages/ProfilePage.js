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
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { selectUser } from '../redux/slices/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  container: {
    marginTop: theme.spacing(4),
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
      <Card>
        <CardHeader title={user?.info.username} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {user?.info.email}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {user?.info.createdAt}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
