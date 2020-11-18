import React from 'react';
import Image from 'material-ui-image';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  // imageContainer: {
  //   width: '200px',
  //   height: '200px',
  //   overflow: 'hidden',
  //   borderRadius: '50%',
  //   backgroundColor: 'gray',
  //   position: 'relative',
  // },
  // image: {
  //   width: '200%',
  //   objectFit: 'contain',
  //   position: 'absolute',
  //   top: -80,
  //   left: -220,
  //   bottom: 0,
  //   right: 0,
  // },
}));

const ImageComp = ({ src, w, h }) => {
  const classes = useStyles();
  return <Avatar src={src} style={{ width: w, height: h }} />;
};

export default ImageComp;
