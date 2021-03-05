import { API, Auth } from 'aws-amplify';

type Method = 'post' | 'get';
export const callAPI = async (method: Method = 'get', route: string, body = {}) => {
  try {
    console.log(`calling ${route}`);
    const bearer = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;
    const init = { headers: { Authorization: bearer }, body: method === 'get' ? undefined: body };
    return await API[method]('backend', route, init);
  } catch (err) {
    console.log('TEST')
    console.log(err);
    const defaultErrorMsg = 'Something went wrong, please try again.';
    err.friendlyMessage = err.response?.data?.friendlyMessage || defaultErrorMsg;
    throw err;
  }
};
  