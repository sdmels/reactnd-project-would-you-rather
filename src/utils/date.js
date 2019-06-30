const dateFormat = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

function dateNormalized(date) {
  return new Date(date).toLocaleString('en-AU', dateFormat);
}

export default dateNormalized;
