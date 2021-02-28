import { PackageName } from '@theraply/lib';
import { useClient } from '../client/client.hooks';
import { callAPI } from '../services/api';

export const usePayments = () => {
  const { client, setClient } = useClient();

  async function register(cardToken: string, pkgName: PackageName) {
    const res = await callAPI('/payment/register', { cardToken, pkgName });
    setClient({ ...client, stripeCustomerID: res.data.stripeCustomerID });
    return res.data.stripeCustomerID;
  }

  async function addCard(stripeCustomerID: string, cardToken: string) {
    const res = await callAPI('/payment/card', { token: cardToken, stripeCustomerID });
    console.log(res);
  }

  async function charge(stripeCustomerID: string, pkgName: PackageName) {
    const res = await callAPI('/payment/charge', { pkgName, stripeCustomerID });
    console.log(res);
  }

  return {
    register,
    addCard,
    charge,
  };
};
