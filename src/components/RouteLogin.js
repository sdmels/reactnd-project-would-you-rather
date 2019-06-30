import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from './../utils/routes';
import commons from './../utils/commons';
import { getFromLocalStorage } from '../utils/localStorage';

export default (ProtectedRoute) => {
  class LoginHOC extends Component {
    isUserLogged = () => getFromLocalStorage(commons.user) !== null;

    redirectToHome = () => {
      const { history } = this.props;
      history.push({ pathname: routes.home });
    }

    render() {
      return (
        <ProtectedRoute
          {...this.props}
          isUserLogged={this.isUserLogged}
          redirectToHome={this.redirectToHome}
        />
      );
    }
  }

  LoginHOC.propTypes = {
    history: PropTypes.shape().isRequired,
  };

  return withRouter(LoginHOC);
};
