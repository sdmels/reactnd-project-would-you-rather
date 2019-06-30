import { getUsers } from './../utils/api';

export const GET_USER = 'GET_USER';
export const SAVE_USERS = 'SAVE_USERS';

function setUsers(users) {
  return {
    type: SAVE_USERS,
    payload: {
      users,
    },
  };
}

export function fetchUsers() {
  return dispatch => (
    getUsers()
      .then((users) => {
        dispatch(setUsers(users));
      })
  );
}
