import history from '../utils/history';
import routes from '../utils/routes';
import commons from '../utils/commons';
import { saveOnLocalStorage, removeFromLocalStorage } from '../utils/localStorage';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

function loggedIn(user) {
  return {
    type: LOGGED_IN,
    payload: {
      user,
    },
  };
}

function loggedOut() {
  return {
    type: LOGGED_OUT,
  };
}

function filterUser(users, id) {
  const usersFiltered = users.filter(user => user.id === id);
  return usersFiltered[0];
}

function updatePathTo(pathname) {
  history.push({
    pathname,
  });
}

export function login({ users, userID, redirectTo }) {
  return (dispatch) => {
    const user = filterUser(users, userID);

    saveOnLocalStorage(commons.user, user)
      .then(() => {
        const pathname = redirectTo || routes.home;
        updatePathTo(pathname);
        dispatch(loggedIn(user));
      });
  };
}

export function logout() {
  return (dispatch) => {
    removeFromLocalStorage(commons.user)
      .then(() => {
        updatePathTo(routes.login);
        dispatch(loggedOut());
      });
  };
}
