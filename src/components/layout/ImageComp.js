import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const ImageComp = ({ src, w, h }) => {
  return <Avatar src={src} style={{ width: w, height: h }} />;
};

export default ImageComp;
