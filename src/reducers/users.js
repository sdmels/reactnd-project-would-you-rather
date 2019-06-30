import { SAVE_USERS } from './../actions/users';

export default function users(state = {}, { type, payload }) {
  switch (type) {
    case SAVE_USERS:
      return {
        ...state,
        ...payload.users,
      };
    default:
      return state;
  }
}
