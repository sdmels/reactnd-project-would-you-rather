import {
  shape,
  string,
  number,
  object,
  arrayOf,
} from 'prop-types';

const userProps = {
  id: string,
  name: string,
  avatarURL: string,
  answers: object,
  questions: arrayOf(string),
};

const user = shape(userProps);

const auth = shape({
  data: shape(userProps),
  loading: string,
});

const classes = shape();

const option = shape({
  votes: arrayOf(string),
  text: string,
});

const question = shape({
  id: string,
  author: string,
  timestamp: number,
  optionOne: option,
  optionTwo: option,
});

export default {
  user,
  auth,
  classes,
  question,
};
