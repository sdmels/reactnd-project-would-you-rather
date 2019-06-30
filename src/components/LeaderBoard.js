import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// Misc
import Loading from './Loading';
import Types from './../utils/types';

const styles = theme => ({
  root: {
    width: '60%',
    marginTop: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowX: 'auto',
  },
  tableCell: {
    textAlign: 'center',
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

class LeaderBoard extends Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    const {
      match,
      handleGetQuestions,
      isUserLogged,
      redirectToLogin,
    } = this.props;

    const { path } = match;

    if (!isUserLogged()) {
      redirectToLogin(path);
    } else {
      handleGetQuestions()
        .then(() => this.setState({
          isLoading: false,
        }));
    }
  }

  getQuestionsCreated(author) {
    const { questions } = this.props;
    const list = questions.filter(question => question.author === author);
    return list.length;
  }

  getQuestionsAnswered(author) {
    const { questions } = this.props;
    const list = questions.filter((question) => {
      const { optionOne, optionTwo } = question;
      return (
        optionOne.votes.includes(author) || optionTwo.votes.includes(author)
      );
    });
    return list.length;
  }

  usersSorted() {
    const { users } = this.props;

    return users.map(({ id, name, avatarURL }) => {
      const created = this.getQuestionsCreated(id);
      const answered = this.getQuestionsAnswered(id);
      return {
        id,
        name,
        avatarURL,
        created,
        answered,
        score: created + answered,
      };
    }).sort((a, b) => b.score - a.score);
  }

  render() {
    const { classes } = this.props;

    const { isLoading } = this.state;

    return (
      isLoading ? <Loading />
        : (
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell data-numeric>Created</TableCell>
                  <TableCell data-numeric>Answered</TableCell>
                  <TableCell data-numeric>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.usersSorted().map(user => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      <List>
                        <ListItem>
                          <Avatar
                            alt={user.name}
                            src={user.avatarURL}
                            className={classes.avatar}
                          />
                          <ListItemText primary={user.name} />
                        </ListItem>
                      </List>
                    </TableCell>
                    <TableCell className={classes.tableCell} data-numeric>
                      {user.created}
                    </TableCell>
                    <TableCell className={classes.tableCell} data-numeric>
                      {user.answered}
                    </TableCell>
                    <TableCell className={classes.tableCell} data-numeric>
                      {user.score}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )
    );
  }
}

LeaderBoard.propTypes = {
  match: PropTypes.shape().isRequired,
  users: PropTypes.arrayOf(Types.user).isRequired,
  questions: PropTypes.arrayOf(Types.question).isRequired,
  handleGetQuestions: PropTypes.func.isRequired,
  isUserLogged: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles, { withTheme: true })(LeaderBoard);
