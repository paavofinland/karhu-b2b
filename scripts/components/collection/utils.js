export const fetchHtml = async url =>
  fetch(url)
    .then(response => response.text())
    .then(responseText => new DOMParser().parseFromString(responseText, 'text/html'));

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
  updateURLHash,
};
