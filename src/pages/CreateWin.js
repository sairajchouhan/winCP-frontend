import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(3),
  },
  form: {
    width: '100%',
  },
}));

const CreatePost = () => {
  const classes = useStyles();
  const [body, setBody] = useState('');
  const handlePostSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container className={classes.container} maxWidth="md">
      <Paper className={classes.paper} elevation={3}>
        <Grid container>
          <Grid item>
            <Typography variant="h4">Create Post</Typography>
          </Grid>
          <Grid container item xs={12}>
            <form className={classes.form} onSubmit={handlePostSubmit}>
              <TextField
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className={classes.body}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="body"
                label="Body of the post"
                name="body"
              />
              <Button variant="outlined" color="primary">
                Submit
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreatePost;
