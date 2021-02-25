import { useClient } from '../client/client.hooks';
import { callAPI } from '../services/api';

export const usePayments = () => {
  const { client, setClient } = useClient();
  
  async function register() {
    const res = await callAPI('/payment/register')
    setClient({...client, stripeCustomerID: res.data.stripeCustomerID})
  }

  async function addCard(cardToken: string) {
    const res = await callAPI('/payment/card', {
      token: cardToken,
      stripeCustomerID: client.stripeCustomerID,
    })
    console.log(res)
  }
  
  return {
    register,
    addCard,
  };
};
