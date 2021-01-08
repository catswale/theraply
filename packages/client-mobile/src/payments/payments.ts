import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import {API, Auth} from 'aws-amplify'

export async function createToken() {
  try {
    console.log('getting token')
    const params = {
        // mandatory
        number: '4242424242424242',
        expMonth: 11,
        expYear: 17,
        cvc: '223',
        // optional
        name: 'Test User',
        currency: 'usd',
        addressLine1: '123 Test Street',
        addressLine2: 'Apt. 5',
        addressCity: 'Test City',
        addressState: 'Test State',
        addressCountry: 'Test Country',
        addressZip: '55555',
      };
        
      const token = await Stripe.createTokenWithCardAsync(params);
      console.log('got token')
      console.log(token)
  } catch (err) {
    console.log(err)
  }
}

  export async function cardForm() {
    const options = {
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        billingAddress: {
          name: 'Gunilla Haugeh',
          line1: 'Canary Place',
          line2: '3',
          city: 'Macon',
          state: 'Georgia',
          country: 'US',
          postalCode: '31217',
        },
      },
    };
    
    const token = await Stripe.paymentRequestWithCardFormAsync(options);
    console.log(token)
  }


