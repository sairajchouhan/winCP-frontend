import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';

import { selectUser } from '../redux/slices/authSlice';
import ProfileCard from '../components/layout/ProfileCard';
import AllWinsOfAUser from '../components/layout/AllWinsOfAUser';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!user) {
    return <h1>chinna inka time undhi</h1>;
  }
  return (
    <Container className={classes.container} maxWidth='md'>
      <AppBar position='static' color='transparent'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <Tab label='profile' {...a11yProps(0)} />
          <Tab label='my wins' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProfileCard user={user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AllWinsOfAUser username={user?.info?.username} />
      </TabPanel>
    </Container>
  );
};

export default ProfilePage;
