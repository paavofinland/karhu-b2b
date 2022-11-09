export const fetchHtml = async url =>
  fetch(url)
    .then(response => response.text())
    .then(responseText => new DOMParser().parseFromString(responseText, 'text/html'));

export const getParameter = paramName => {
  const searchString = window.location.search.substring(1);
  let i;
  let val;
  const params = searchString.split('&');

  for (i = 0; i < params.length; i++) {
    val = params[i].split('=');
    if (val[0] === paramName) {
      return val[1];
    }
  }
  return null;
};

export const updateURLHash = searchParams =>
  // eslint-disable-next-line no-restricted-globals
  history.pushState(
    { searchParams },
    '',
    `${window.location.pathname}${
      searchParams.includes('?') ? searchParams : '?'.concat(searchParams)
    }`
  );

export default {
  fetchHtml,
  getParameter,
  updateURLHash,
};
