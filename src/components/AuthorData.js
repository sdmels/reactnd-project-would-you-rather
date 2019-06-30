import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// Misc
import dateNormalized from './../utils/date';

const styles = () => ({
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

const AuthorData = (props) => {
  const { classes, author, timestamp } = props;

  if (isEmpty(author)) {
    return null;
  }

  return (
    <List>
      <ListItem>
        <Avatar
          alt={author.name}
          src={author.avatarURL}
          className={classes.avatar}
        />
        <ListItemText
          primary={`By ${author.name}`}
          secondary={`posted at ${dateNormalized(timestamp)}`}
        />
      </ListItem>
    </List>
  );
};

AuthorData.propTypes = {
  classes: PropTypes.shape().isRequired,
  author: PropTypes.shape().isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default withStyles(styles)(AuthorData);
