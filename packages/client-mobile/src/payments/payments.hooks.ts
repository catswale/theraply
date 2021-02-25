import { API } from 'aws-amplify';
import { useAuth } from '../auth/auth.hooks';
import { useClient } from '../client/client.hooks';

export const usePayments = () => {
  const { client, setClient } = useClient();
  const {getBearerToken} = useAuth();

  async function register() {
    console.log('registering with stripe');
    try {
      const myInit = {
        headers: { Authorization: await getBearerToken() },
      };
      const res = await API.post('paymentAPI', '/payment/register', myInit);
      setClient({...client, stripeCustomerID: res.data.stripeCustomerID})
    } catch (err) {
      console.log(err.response.data);
      err.friendlyMessage = err.response.data.friendlyMessage || 'Something went wrong, please try again.'
      throw err;
    }
  }

  async function addCard(cardToken: string) {
    console.log('adding card');
    try {
      const myInit = {
        headers: { Authorization: await getBearerToken() },
        body: {
          token: cardToken,
          stripeCustomerID: client.stripeCustomerID,
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
