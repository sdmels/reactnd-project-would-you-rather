import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing(2),
  },
});

function Loading(props) {
  const { classes } = props;

  return <CircularProgress className={classes.progress} size={50} />;
}

Loading.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Loading);
