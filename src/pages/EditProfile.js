import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { useHistory } from 'react-router-dom';
import ButtonBase from '@material-ui/core/ButtonBase';

import { selectUser } from '../redux/slices/authSlice';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { editUserProfile } from '../redux/actions/userActions';
import { loadUser } from '../redux/actions/authActions';
import UpdateProfileSkeleton from '../components/skeletons/UpdateProfileSkeleton';
import { setSnackbar } from '../redux/slices/snackbarSlice';
import { ERROR, SUCCESS } from '../utils/constants';
import ProgressBar from '../components/layout/ProgressBar';
import ImageComp from '../components/layout/ImageComp';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  formContainer: {
    marginTop: theme.spacing(3),
    width: '70%',
  },
  field: {
    marginBottom: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  img: {
    borderRadius: '50%',
    width: '200px',
    objectFit: 'contain',
  },
}));

const EditProfile = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const imageChangeHandler = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setImage(selected);
      setError(null);
    } else {
      setImage(null);
      setSnackbar(dispatch, true, ERROR, 'Image upload failed');
    }
  };
  const [data, setData] = useState({
    username: user?.info.username,
    bio: user?.info.bio,
    location: user?.info.location,
    website: user?.info.website,
  });

  useEffect(() => {
    setData({
      username: user?.info.username,
      bio: user?.info.bio,
      location: user?.info.location,
      website: user?.info.website,
    });
  }, [user]);

  if (!user) {
    return <UpdateProfileSkeleton />;
  }

  const handleSubmit = async (e) => {
    setLoading((loading) => !loading);
    e.preventDefault();
    const success = await editUserProfile(data);
    if (success) {
      await dispatch(loadUser());
      history.push('/profile');
      setSnackbar(dispatch, true, SUCCESS, 'Profile updated successfully');
    } else {
      setSnackbar(dispatch, true, ERROR, 'Something went wrong');
    }
    setLoading((loading) => !loading);
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className={classes.container} maxWidth='md'>
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h4'>Edit Profile</Typography>
          </Grid>
          <Grid item xs={6} className={classes.formContainer}>
            <form onSubmit={handleSubmit}>
              <TextField
                id='standard-read-only-input-email'
                label='Email'
                className={classes.field}
                defaultValue={user.info.email}
                fullWidth={true}
                disabled={true}
              />
              <TextField
                id='standard-read-only-input-username'
                label='Username'
                className={classes.field}
                value={data.username}
                onChange={handleChange}
                fullWidth={true}
                name='username'
              />
              <TextField
                id='standard-read-only-input-bio'
                label='Bio'
                className={classes.field}
                value={data.bio}
                onChange={handleChange}
                fullWidth={true}
                name='bio'
              />
              <TextField
                id='standard-read-only-input-location'
                label='Location'
                className={classes.field}
                value={data.location}
                onChange={handleChange}
                fullWidth={true}
                name='location'
              />
              <TextField
                id='standard-read-only-input-website'
                label='Website'
                className={classes.field}
                value={data.website}
                onChange={handleChange}
                fullWidth={true}
                name='website'
                helperText='Include http:// or https:// before your website '
              />
              <Button type='submit' variant='outlined' color='secondary'>
                Submit
              </Button>
            </form>
          </Grid>
          <Grid
            item
            xs={6}
            container
            alignItems='center'
            direction='column'
            justify='space-around'
          >
            <Grid item>
              <ButtonBase className={classes.image}>
                <ImageComp w={250} h={250} src={user.info.profileImgUrl} />
              </ButtonBase>
            </Grid>
            <Grid item>
              <label htmlFor='upload-photo'>
                <input
                  style={{ display: 'none' }}
                  id='upload-photo'
                  name='upload-photo'
                  type='file'
                  onChange={imageChangeHandler}
                />
                <Button color='secondary' variant='outlined' component='span'>
                  Upload Image
                </Button>
              </label>
            </Grid>
            <Grid item className={classes.img}>
              {error && (
                <Typography variant='h1' color='error'>
                  {error}
                </Typography>
              )}
              {image && <ProgressBar image={image} setImage={setImage} />}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </Container>
  );
};

export default EditProfile;
