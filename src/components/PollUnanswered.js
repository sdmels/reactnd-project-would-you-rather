import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash.isempty';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import VoteIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';

// Misc
import Types from './../utils/types';
import Loading from './Loading';
import AuthorData from './AuthorData';

const VALUE_OPTION_ONE = 'optionOne';
const VALUE_OPTION_TWO = 'optionTwo';

const styles = theme => ({
  card: {
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    margin: theme.spacing(1),
  },
});

class PollUnanswered extends Component {
  state = {
    answer: '',
    sending: false,
  };

  handleOptionChange = (event) => {
    this.setState({
      answer: event.target.value,
    });
  }

  handleVote = (event) => {
    event.preventDefault();
    const { answer } = this.state;
    const { onVotePoll } = this.props;

    this.setState({ sending: true });

    onVotePoll(answer);
  }

  isDisabled() {
    const { answer, sending } = this.state;
    return isEmpty(answer) || sending;
  }

  render() {
    const { answer } = this.state;
    const {
      classes,
      author,
      question,
      sendingVote,
    } = this.props;

    const { timestamp, optionOne, optionTwo } = question;

    return (
      sendingVote ? <Loading />
        : (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Card className={classes.card}>
              <CardContent>
                <AuthorData
                  author={author}
                  timestamp={timestamp}
                />
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <RadioGroup
                    name="poll"
                    value={answer}
                    aria-label="Poll"
                    className={classes.group}
                    onChange={this.handleOptionChange}
                  >
                    <FormControlLabel
                      value={VALUE_OPTION_ONE}
                      control={<Radio />}
                      label={optionOne.text}
                    />
                    <FormControlLabel
                      value={VALUE_OPTION_TWO}
                      control={<Radio />}
                      label={optionTwo.text}
                    />
                  </RadioGroup>
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  disabled={this.isDisabled()}
                  color="primary"
                  variant="contained"
                  type="submit"
                  className={classes.button}
                  onClick={this.handleVote}
                >
                  <VoteIcon />
                  &nbsp;
                  Vote
                </Button>
              </CardActions>
            </Card>
          </Grid>
        )
    );
  }
}

PollUnanswered.propTypes = {
  classes: PropTypes.shape().isRequired,
  author: PropTypes.shape().isRequired,
  question: Types.question.isRequired,
  sendingVote: PropTypes.bool.isRequired,
  onVotePoll: PropTypes.func.isRequired,
};

export default withStyles(styles)(PollUnanswered);
