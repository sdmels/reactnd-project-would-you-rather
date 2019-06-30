import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Login from './../containers/Login';
import Home from './../containers/Home';
import Poll from './../containers/Poll';
import NewPoll from './../containers/PollNew';
import LeaderBoard from './../containers/LeaderBoard';
import Nav from './../containers/Nav';
import routes from './../utils/routes';
import history from './../utils/history';
import NoMatch from './NoMatch';
import withAuthorization from './RouteProtector';
import withoutAuthorization from './RouteLogin';

import Loading from './Loading';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = theme => ({
  root: {
    flexGrow: 1,
    // height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
});

class App extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    const { handleGetUsers } = this.props;
    handleGetUsers()
      .then(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { isLoading } = this.state;

    return (
      isLoading ? <Loading />
        : (
          <Router history={history}>
            <div className={classes.root}>
              <CssBaseline />
              <Nav />
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                  <Route exact path={routes.login} component={withoutAuthorization(Login)} />
                  <Route path={routes.home} component={withAuthorization(Home)} />
                  <Route path={`${routes.questions}/:id`} component={withAuthorization(Poll)} />
                  <Route path={routes.add} component={withAuthorization(NewPoll)} />
                  <Route path={routes.leaderboard} component={withAuthorization(LeaderBoard)} />
                  <Route component={NoMatch} />
                </Switch>
              </main>
            </div>
          </Router>
        )
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape().isRequired,
  handleGetUsers: PropTypes.func.isRequired,
};


export default withStyles(styles)(App);
