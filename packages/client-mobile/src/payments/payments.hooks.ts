import { API, Auth } from 'aws-amplify';
import { useAuth } from '../auth/auth.hooks';
import { useClient } from '../client/client.hooks';

export const usePayments = () => {
  const { client } = useClient();

  async function register() {
    console.log('registering with stripe');
    try {
      console.log(`${(await Auth.currentSession()).getIdToken().getJwtToken()}`);
      const myInit = {
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
        body: {
          email: client.email,
          firstName: client.firstName,
        },
      };
      const res = await API.post('paymentAPI', '/payment/register', myInit);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function addCard() {
    console.log('adding card');
    try {
      const myInit = {
        headers: { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` },
        body: {
          email: client.email,
          firstName: client.firstName,
        },
      };
      const res = await API.post('paymentAPI', '/payment/card', myInit);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return {
    register,
    addCard,
  };
};
