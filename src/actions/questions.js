import { getQuestions, getQuestion } from '../utils/api';

export const SET_QUESTION = 'SET_QUESTION';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const FILTER_QUESTIONS = 'FILTER_QUESTIONS';

function setQuestion(question) {
  return {
    type: SET_QUESTION,
    payload: {
      question,
    },
  };
}

export function fetchQuestion(id) {
  return dispatch => (
    getQuestion(id)
      .then((question) => {
        dispatch(setQuestion(question));
      })
  );
}

function filterQuestions(questions) {
  return {
    type: FILTER_QUESTIONS,
    payload: {
      questions,
    },
  };
}

export function fetchAndFilterQuestions() {
  return dispatch => (
    getQuestions()
      .then((questions) => {
        dispatch(filterQuestions(questions));
      })
  );
}

function saveQuestions(questions) {
  return {
    type: SAVE_QUESTIONS,
    payload: {
      questions,
    },
  };
}

export function fetchQuestions() {
  return dispatch => (
    getQuestions()
      .then((questions) => {
        dispatch(saveQuestions(questions));
      })
  );
}
