import { connect } from 'react-redux';
import PollNew from '../components/Poll/PollNew';
import commons from './../utils/commons';
import { sendQuestion } from './../actions/polls';
import { getFromLocalStorage } from './../utils/localstorage';

function mapStateToProps() {
  return {
    getAuthedUserData: () => getFromLocalStorage(commons.user),
  };
}

const mapDispatchToProps = dispatch => ({
  handleSendQuestion: data => dispatch(sendQuestion(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PollNew);
