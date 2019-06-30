import React from 'react';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// Misc
import Types from './../utils/types';

// Styles
const styles = theme => ({
  title: {
    flexGrow: 1,
  },
  user: {
    color: 'white',
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    margin: theme.spacing(),
  },
  leftIcon: {
    marginRight: theme.spacing(),
  },
  iconSmall: {
    fontSize: 20,
  },
});

function NavSimple(props) {
  const { classes } = props;

  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h4" color="inherit" className={classes.title}>
          Would You Rather?
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

NavSimple.propTypes = {
  classes: Types.classes.isRequired,
};

export default withStyles(styles)(NavSimple);
