import { connect } from 'react-redux';
import Poll from './../components/Poll/Poll';

import { sendVote } from './../actions/polls';
import { fetchQuestion } from './../actions/questions';

import { getFromLocalStorage } from './../utils/localStorage';
import commons from './../utils/commons';

function mapStateToProps({ questions, users }) {
  return {
    users,
    question: questions.question,
    getAuthenticatedUserData: () => getFromLocalStorage(commons.user),
  };
}

const mapDispatchToProps = dispatch => ({
  handleVotePoll: data => dispatch(sendVote(data)),
  handleGetQuestion: id => dispatch(fetchQuestion(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
