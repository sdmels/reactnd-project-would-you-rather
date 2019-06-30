import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logout from '@material-ui/icons/PowerSettingsNew';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerIcon from '@material-ui/icons/ChevronLeft';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/LibraryAdd';
import LeaderboardIcon from '@material-ui/icons/Dashboard';

// Misc
import Types from '../../utils/types';
import history from '../../utils/history';
import routes from '../../utils/routes';

const drawerWidth = 240;

// Styles
const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  title: {
    flexGrow: 1,
  },
  user: {
    color: 'white',
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
});

function goToHome() {
  history.push({
    pathname: routes.home,
  });
}

function goToPollNew() {
  history.push({
    pathname: routes.add,
  });
}

function goToLeaderboard() {
  history.push({
    pathname: routes.leaderboard,
  });
}

class NavAuthenticated extends Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  renderUserData() {
    const { classes, onLogout, authenticatedUser } = this.props;

    return (
      <Fragment>
        <Typography className={classes.user} variant="subtitle1" gutterBottom>
          Hi {authenticatedUser.name}
        </Typography>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          onClick={onLogout}
        >
          <Logout className={classNames(classes.leftIcon, classes.iconSmall)} />
          Logout
        </Button>
      </Fragment>
    );
  }

  renderDrawer() {
    const { open } = this.state;
    const { classes } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={this.handleDrawerClose}>
            <DrawerIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            onClick={goToHome}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={goToPollNew}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Poll" />
          </ListItem>
          <ListItem
            button
            onClick={goToLeaderboard}
          >
            <ListItemIcon>
              <LeaderboardIcon />
            </ListItemIcon>
            <ListItemText primary="Leaderboard" />
          </ListItem>
        </List>
      </Drawer>
    );
  }

  renderIconButton() {
    const { open } = this.state;
    const { classes } = this.props;

    return (
      <IconButton
        color="inherit"
        aria-label="Open drawer"
        onClick={this.handleDrawerOpen}
        className={classNames(classes.menuButton, open && classes.hide)}
      >
        <MenuIcon />
      </IconButton>
    );
  }

  renderAppBar() {
    const { open } = this.state;
    const { classes } = this.props;

    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar disableGutters={!open}>
          {this.renderIconButton()}
          <Typography variant="h4" color="inherit" className={classes.title}>
            Would You Rather?
          </Typography>
          {this.renderUserData()}
        </Toolbar>
      </AppBar>
    );
  }

  render() {
    return (
      <Fragment>
        {this.renderAppBar()}
        {this.renderDrawer()}
      </Fragment>
    );
  }
}

NavAuthenticated.propTypes = {
  classes: Types.classes.isRequired,
  authenticatedUser: PropTypes.shape().isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default withStyles(styles)(NavAuthenticated);
