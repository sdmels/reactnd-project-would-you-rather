import history from '../utils/history';
import routes from '../utils/routes';
import { fetchQuestion } from './questions';
import { saveQuestionAnswer, saveQuestion } from '../utils/api';

function redirectToHome() {
  history.push({
    pathname: routes.home,
  });
}

export function sendQuestion(data) {
  return dispatch => (
    saveQuestion(data)
      .then(() => {
        redirectToHome();
      })
  );
}

export function sendVote(data) {
  return dispatch => (
    saveQuestionAnswer(data)
      .then(() => {
        dispatch(fetchQuestion(data.qid));
      })
  );
}
