import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Misc
import Types from './../../utils/types';
import Loading from './../Loading';
import PollAnswered from './PollAnswered';
import PollUnanswered from './PollUnanswered';

const styles = theme => ({
  error: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '50%',
    margin: '2em auto',
  },
});


class Poll extends Component {
  state = {
    error: false,
    isLoading: true,
    sendingVote: false,
  };

  componentDidMount() {
    const {
      match,
      isUserLogged,
      redirectToLogin,
    } = this.props;

    if (!isUserLogged()) {
      const { url } = match;
      redirectToLogin(url);
    } else {
      this.getQuestions();
    }
  }

  getQuestions() {
    const {
      match,
      handleGetQuestion,
    } = this.props;

    const { params } = match;
    const { id } = params;

    handleGetQuestion(id)
      .then(() => {
        this.setState({
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoading: false,
        });
      });
  }

  getAuthedData() {
    const { getAuthedUserData } = this.props;
    return getAuthedUserData();
  }

  getAuthorData(author) {
    const { users } = this.props;

    if (isEmpty(users)) {
      return {};
    }

    return users[author];
  }

  handleVote = (answer) => {
    const { match, handleVotePoll } = this.props;
    const { id: qid } = match.params;
    const authedUser = this.getAuthedData();

    this.setState({
      sendingVote: true,
    });

    handleVotePoll({
      qid,
      answer,
      authedUser: authedUser.id,
    });
  }

  isPollAnswered() {
    const { question } = this.props;
    const authedUser = this.getAuthedData();

    const optionsOne = question.optionOne.votes.find(id => id === authedUser.id);
    const optionsTwo = question.optionTwo.votes.find(id => id === authedUser.id);

    return (optionsOne || optionsTwo);
  }

  render() {
    const { isLoading, error, sendingVote } = this.state;
    const { classes, question } = this.props;
    const authedUser = this.getAuthedData();

    if (error) {
      return (
        <Paper className={classes.error} elevation={1}>
          <Typography variant="headline" component="h3">
            Ups!
          </Typography>
          <Typography component="p">
            That question does not exists
          </Typography>
        </Paper>
      );
    }

    return (
      isLoading ? <Loading />
        : (
          <Fragment>
            {
              this.isPollAnswered()
                ? (
                  <PollAnswered
                    question={question}
                    authedUser={authedUser}
                    author={this.getAuthorData(question.author)}
                  />
                )
                : (
                  <PollUnanswered
                    question={question}
                    onVotePoll={this.handleVote}
                    sendingVote={sendingVote}
                    author={this.getAuthorData(question.author)}
                  />
                )
            }
          </Fragment>
        )
    );
  }
}

Poll.propTypes = {
  match: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
  isUserLogged: PropTypes.func.isRequired,
  redirectToLogin: PropTypes.func.isRequired,
  question: Types.question.isRequired,
  users: PropTypes.shape().isRequired,
  getAuthedUserData: PropTypes.func.isRequired,
  handleGetQuestion: PropTypes.func.isRequired,
  handleVotePoll: PropTypes.func.isRequired,
};

export default withStyles(styles)(Poll);
