import * as AWS from 'aws-sdk';
import jwtDecode from 'jwt-decode';
import Stripe from 'stripe';
import { Client } from '@theraply/lib';
import config from './config';

AWS.config.update({ region: config.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();
const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: '2020-08-27',
});

export async function paymentRegister(req: any, res: any) {
  try {
    console.log('Checkout called');
    // const accessToken = req.headers.authorization.split(' ')[1];
    // if (!accessToken) return res.status(500);
    // const { sub: username, given_name: firstName, email } = jwtDecode(accessToken);
    // console.log(`got username ${username}`);
    // const params = {
    //   TableName: config.CLIENT_TABLE_NAME,
    //   Key: {
    //     id: username,
    //   },
    // };
    // const data = await dynamodb.get(params).promise();
    // console.log(data);
    // if (!data.stripeCustomerID) {
    //   console.log('creating stripe customer');
    //   const customer = await stripe.customers.create({ email, name: firstName });
    //   const params = {
    //     TableName: config.CLIENT_TABLE_NAME,
    //     Key: {
    //       id: username,
    //     },
    //     UpdateExpression: 'set stripeCustomerID = :s',
    //     ExpressionAttributeValues: {
    //       ':s': customer.id,
    //     },
    //     ReturnValues: 'UPDATED_NEW',
    //   };
    //   const data = await dynamodb.update(params).promise();
    //   console.log('updated a client');
    //   console.log(data);
    // }
    // const paymentIntent = await createPaymentIntent(1099);
    // return res.json({ success: 'success', clientSecret: paymentIntent.client_secret });
    return res.json({ success: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

async function charge(source, amount, customer) {
  return stripe.charges
    .create({
      customer,
      amount,
      currency: 'aud',
      source,
      description: 'Test payment',
    }).then((res) => {
      console.log(res);
    });
}

/**
 * @param {*} amount in cents, eg 1099 is $10.99
 */
async function createPaymentIntent(amount) {
  return stripe.paymentIntents.create({
    amount,
    currency: 'aud',
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: 'accept_a_payment' },
  });
}
