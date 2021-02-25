import { API, Auth } from 'aws-amplify';

export const callAPI = async (route: string, body = {}) => {
  try {
    console.log('calling ' + route)
    const bearer = `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;
    const init = {headers: { Authorization: bearer }, body};
    return await API.post('paymentAPI', route, init);
  } catch(err) {
    console.log(err);
    const defaultErrorMsg = 'Something went wrong, please try again.';
    err.friendlyMessage = err.response.data.friendlyMessage || defaultErrorMsg;
    throw err;
  }
}