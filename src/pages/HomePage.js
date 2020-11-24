import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { getAllWins } from '../redux/actions/winsActions';
import Win from '../components/layout/Win';
import WinSkeleton from '../components/skeletons/WinSkeleton';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    maxWidth: '750px',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wins = useSelector((state) => state.wins.allWins);

  useEffect(() => {
    async function callThis() {
      await dispatch(getAllWins());
    }
    callThis();
  }, [dispatch]);

  if (!wins) {
    return <WinSkeleton />;
  }

  return (
    <Container className={classes.container}>
      {wins &&
        wins.map((eachWin) => (
          <Win
            username={eachWin.username}
            title={eachWin.title}
            body={eachWin.body}
            createdAt={eachWin.createdAt}
            likesCount={eachWin.likesCount}
            commentsCount={eachWin.commentsCount}
            key={eachWin.id}
            winId={eachWin.id}
            profileImgUrl={eachWin.profileImgUrl}
          />
        ))}
    </Container>
  );
};

export default Home;
