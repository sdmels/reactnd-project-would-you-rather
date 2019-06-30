import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

// Misc
import NavSimple from './NavSimple';
import NavAuthenticated from './NavAuthenticated';


const Nav = (props) => {
  const { getAuthenticatedUserData, onLogout } = props;
  const authenticatedUser = getAuthenticatedUserData();

  return (
    isEmpty(authenticatedUser)
      ? <NavSimple />
      : <NavAuthenticated onLogout={onLogout} authenticatedUser={authenticatedUser} />
  );
};

Nav.propTypes = {
  onLogout: PropTypes.func.isRequired,
  getAuthenticatedUserData: PropTypes.func.isRequired,
};

export default Nav;
