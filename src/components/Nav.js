import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

// Misc
import NavSimple from './NavSimple';
import NavAuthed from './NavAuthed';


const Nav = (props) => {
  const { getAuthedUserData, onLogout } = props;
  const authedUser = getAuthedUserData();

  return (
    isEmpty(authedUser)
      ? <NavSimple />
      : <NavAuthed onLogout={onLogout} authedUser={authedUser} />
  );
};

Nav.propTypes = {
  onLogout: PropTypes.func.isRequired,
  getAuthedUserData: PropTypes.func.isRequired,
};

export default Nav;
