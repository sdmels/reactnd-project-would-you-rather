import { connect } from 'react-redux';
import LeaderBoard from './../components/LeaderBoard';
import { fetchQuestions } from './../actions/questions';

function mapStateToProps({ users, questions }) {
  return {
    users: Object.values(users),
    questions: questions.all,
  };
}

const mapDispatchToProps = dispatch => ({
  handleGetQuestions: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
