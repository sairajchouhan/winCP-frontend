import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  imageCarousel: {
    position: 'relative',
  },
  pre: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 99999,
  },
  next: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 99999,
  },
  navigationButtons: {
    fontSize: '2.5rem',
  },
}));

const Carousel = ({ images }) => {
  const classes = useStyles();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const mediaRef = useRef();

  const showPreImg = () => {
    const lastIndex = images.length - 1;
    const shouldResetIndex = currentImageIndex === 0;
    const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;
    setCurrentImageIndex(index);
  };
  const showNextImg = () => {
    const lastIndex = images.length - 1;
    const shouldResetIndex = currentImageIndex === lastIndex;
    const index = shouldResetIndex ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(index);
  };
  return (
    <div className={classes.imageCarousel}>
      <div className={classes.pre}>
        <IconButton onClick={showPreImg}>
          <NavigateBeforeIcon className={classes.navigationButtons} />
        </IconButton>
      </div>
      <CardMedia
        ref={mediaRef}
        className={classes.media}
        image={images[currentImageIndex]}
        title='Paella dish'
      />
      <div className={classes.next}>
        <IconButton onClick={showNextImg}>
          <NavigateNextIcon className={classes.navigationButtons} />
        </IconButton>
      </div>
    </div>
  );
};

export default Carousel;
