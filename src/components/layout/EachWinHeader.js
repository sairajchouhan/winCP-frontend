import React, { useState } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import DialogTitle from '@material-ui/core/DialogTitle';
import {
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
} from '../../redux/slices/winsSlice';
import { deleteAWin } from '../../redux/actions/winsActions';
import { setSnackbar } from '../../redux/slices/snackbarSlice';
import { ERROR, SUCCESS } from '../../utils/constants';

const EachWinHeader = ({ data, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

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

  return (
    <CardHeader
      avatar={<Avatar aria-label='recipe' src={data.profileImgUrl} />}
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
              <MenuItem onClick={handleClickOpenAlert}>Delete Win</MenuItem>

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
                    All the images, likes and comments realated to the win will
                    be delted
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
  );
};

export default EachWinHeader;
