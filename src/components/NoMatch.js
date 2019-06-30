import React from 'react';
import PropTypes from 'prop-types';

const NoMatch = ({ location }) => (
  <p>
    No match for
    <code>
      {location.pathname}
    </code>
  </p>
);

NoMatch.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default NoMatch;
