import * as AWS from 'aws-sdk';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import config from './config';
import {getHeaderData} from './utils';

AWS.config.update({ region: config.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();
const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: '2020-08-27',
});

export async function paymentRegister(req: Request, res: Response) {
  try {
    console.log('Checkout called');
    const {username, email, firstName} = getHeaderData(req, res);
    console.log(`got username ${username}`);
    const params = {
      TableName: config.CLIENT_TABLE_NAME,
      Key: {
        id: username,
      },
    };
    const data = await dynamodb.get(params).promise() as any;
    console.log(data);
    if (!data.stripeCustomerID) {
      console.log('creating stripe customer');
      const customer = await stripe.customers.create({ email, name: firstName });
      const params = {
        TableName: config.CLIENT_TABLE_NAME,
        Key: {
          id: username,
        },
        UpdateExpression: 'set stripeCustomerID = :s',
        ExpressionAttributeValues: {
          ':s': customer.id,
        },
        ReturnValues: 'UPDATED_NEW',
      };
      const data = await dynamodb.update(params).promise();
      console.log('updated a client');
      console.log(data);
    }
    return res.json({ success: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

export async function paymentCharge(req: Request, res: Response) {
  const paymentIntent = await createPaymentIntent(1099);

}

/**
 * @param {*} amount in cents, eg 1099 is $10.99
 */
 async function createPaymentIntent(amount) {
  return stripe.paymentIntents.create({
    confirm: true,
    amount,
    currency: 'aud',
  });
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

