import {
  FILTER_QUESTIONS,
  SAVE_QUESTIONS,
  SET_QUESTION,
} from './../actions/questions';

import commons from './../utils/commons';
import { getFromLocalStorage } from './../utils/localStorage';

const defaultState = {
  all: [],
  question: {},
  answered: [{}],
  unanswered: [{}],
};

export default function questions(state = defaultState, { type, payload }) {
  switch (type) {
    case SET_QUESTION: {
      const { question } = payload;
      return {
        ...state,
        question,
      };
    }
    case SAVE_QUESTIONS: {
      return {
        ...state,
        all: Object.values(payload.questions),
      };
    }
    case FILTER_QUESTIONS: {
      const answered = [];
      const unanswered = [];
      const filteredQuestions = Object.values(payload.questions);

      filteredQuestions.filter((question) => {
        const userID = getFromLocalStorage(commons.user).id;
        const optionsOne = question.optionOne.votes.find(id => id === userID);
        const optionsTwo = question.optionTwo.votes.find(id => id === userID);

        if (optionsOne || optionsTwo) {
          return answered.push(question);
        }

        return unanswered.push(question);
      });

      return {
        ...state,
        answered: answered.sort((a, b) => b.timestamp - a.timestamp),
        unanswered: unanswered.sort((a, b) => b.timestamp - a.timestamp),
      };
    }
    default:
      return state;
  }
}
