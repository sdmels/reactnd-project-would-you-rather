import { connect } from 'react-redux';
import Home from './../components/Home';
import { fetchAndFilterQuestions } from './../actions/questions';

function mapStateToProps({ users, questions }) {
  return {
    users,
    answered: questions.answered,
    unanswered: questions.unanswered,
  };
}

const mapDispatchToProps = dispatch => ({
  handleGetAndFilterQuestions: () => dispatch(fetchAndFilterQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
