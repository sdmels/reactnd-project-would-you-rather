import { LOGGED_IN, LOGGED_OUT } from './../actions/auth';

const initialState = {};

export default function users(state = initialState, { type, payload }) {
  switch (type) {
    case LOGGED_IN: {
      return payload.user;
    }
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }
}
