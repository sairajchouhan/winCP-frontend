import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { URL } from '../../utils/constants';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: 0,
    paddingBottom: theme.spacing(1),
  },

  username: {
    marginRight: theme.spacing(1),
    color: '#34495e',
  },
  threeDotIcon: {
    marginLeft: 'auto',
  },
}));

const EachComment = ({
  comment: { winId, body, createdAt, username, commentId },
  setData,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteComment = async () => {
    console.log('will delete a comment');
    try {
      await axios.delete(`${URL}/win/${winId}/${commentId}`);
      console.log('deleted successfully');
      const refetch = await axios.get(`${URL}/win/${winId}`);
      setData(refetch.data);
    } catch (err) {
      console.log('something went wrong');
    }
    handleClose();
  };

  return (
    <Container>
      <CardContent className={classes.cardContent}>
        <Grid container alignItems="center" justify="space-between">
          <Grid container alignItems="center">
            <Grid item>
              <Typography
                className={classes.username}
                variant="subtitle1"
                color="textSecondary"
                component="p"
              >
                {username}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" color="textSecondary" component="p">
                {moment(createdAt).fromNow()}
              </Typography>
            </Grid>
            <Grid item justify="flex-end" className={classes.threeDotIcon}>
              <IconButton
                aria-controls="comments-options-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDeleteComment}>Delete </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>

        <Typography variant="subtitle2" color="textSecondary" component="p">
          {body}
        </Typography>
      </CardContent>
    </Container>
  );
};

export default EachComment;
