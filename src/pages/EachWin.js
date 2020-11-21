import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardActions from '@material-ui/core/CardActions';
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
  const history = useHistory();
  const classes = useStyles();
  const { winId } = useParams();
  const loading = useSelector((state) => state.wins.loading);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClickOpenAlert = () => {
    setOpen((open) => !open);
  };

  const handleCloseAlert = () => {
    setOpen((open) => !open);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async (winId) => {
    dispatch(SET_LOADING_TRUE());
    const errorWhileDeleting = await deleteAWin(winId);
    setAnchorEl(null);
    dispatch(SET_LOADING_FALSE());
    if (!errorWhileDeleting) {
      history.push('/home');
      setSnackbar(dispatch, true, SUCCESS, 'Win deleted successfully');
    } else {
      setSnackbar(dispatch, true, ERROR, 'Sonething went wrong');
    }
    handleCloseAlert();
  };
  useEffect(() => {
    async function getAWin() {
      try {
        const res = await axios.get(`${URL}/win/${winId}`);
        console.log(res);
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log('error finding a single post');
      }
    }
    getAWin();
  }, [winId]);
  if (data === null || !user) {
    return <WinSkeleton />;
  }
  return (
    <Container className={classes.container}>
      <Paper>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar
                aria-label='recipe'
                src={data.profileImgUrl}
                className={classes.avatar}
              />
            }
            action={
              user?.info?.username === data.username && (
                <>
                  <IconButton
                    aria-label='settings'
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClickOpenAlert}>
                      Delete Win
                    </MenuItem>

                    <Dialog
                      open={open}
                      onClose={handleCloseAlert}
                      aria-labelledby='alert-dialog-title'
                      aria-describedby='alert-dialog-description'
                    >
                      <DialogTitle id='alert-dialog-title'>
                        {'Are you sure you want to delete this win ?'}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                          All the images, likes and comments realated to the win
                          will be delted
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseAlert} color='primary'>
                          Disagree
                        </Button>
                        <Button
                          onClick={() => handleDelete(data.winId)}
                          color='secondary'
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </Menu>
                </>
              )
            }
            title={data.username}
            subheader={moment(data?.createdAt).fromNow()}
          />

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
