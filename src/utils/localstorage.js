export function saveOnLocalStorage(name, data) {
  return new Promise((res) => {
    localStorage.setItem(name, JSON.stringify(data));
    res({ status: 'ok' });
  });
}

export function getFromLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name));
}

export function removeFromLocalStorage(name) {
  return new Promise((res) => {
    localStorage.removeItem(name);
    res({ status: 'ok' });
  });
}
