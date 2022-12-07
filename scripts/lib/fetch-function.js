/**
 * Used to fetch serverless functions
 */

const apiUrl = process.env.API_URL;

const tryJson = async response =>
  response.json().catch(e => {
    return null;
  });

/**
 *
 * @param {string} url
 * @param {RequestInit | undefined} init
 */
const fetchFunction = async (url, init) => {
  return fetch(`${apiUrl}${url}`, init)
    .then(async response => {
      //   response.headers;
      const data = await tryJson(response);

      if (
        !response.ok ||
        (response.status >= 400 && response.status < 500 && response.status !== 404)
      )
        throw Error(data.message || 'Something went wrong, please try again later.');

      return data;
    })
    .catch(error => {
      // TODO: Show warning for user
      console.info(`⚡️⚠️ Function error [${url}]`);
      throw error;
    });
};

export default fetchFunction;
