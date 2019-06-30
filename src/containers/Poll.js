import { connect } from 'react-redux';
import Poll from './../components/Poll';

import { sendVote } from './../actions/polls';
import { fetchQuestion } from './../actions/questions';

import { getFromLocalStorage } from './../utils/localstorage';
import commons from './../utils/commons';

function mapStateToProps({ questions, users }) {
  return {
    users,
    question: questions.question,
    getAuthedUserData: () => getFromLocalStorage(commons.user),
  };
}

const mapDispatchToProps = dispatch => ({
  handleVotePoll: data => dispatch(sendVote(data)),
  handleGetQuestion: id => dispatch(fetchQuestion(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
