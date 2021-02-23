import * as AWS from 'aws-sdk';
import Stripe from 'stripe';
import { Request, Response } from 'express';
import { PackageItem } from '@theraply/lib';
import config from './config';
import { getHeaderData } from './utils';

AWS.config.update({ region: config.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();
const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: '2020-08-27',
});

export async function paymentRegister(req: Request, res: Response) {
  try {
    console.log('Checkout called');
    const { username, email, firstName } = getHeaderData(req, res);
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

export async function paymentCard(req: Request, res: Response) {
  try {
    const { stripeCustomerID, token } = req.body;
    if (!token || !stripeCustomerID) return res.status(500);
    const result = await createCard(stripeCustomerID, token);
    console.log(result);
    return res.json({ success: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

async function createCard(stripeCustomerID, cardToken) {
  return stripe.customers.createSource(
    stripeCustomerID,
    { source: cardToken },
  );
}

export async function paymentCharge(req: Request, res: Response) {
  try {
    const { packages, stripeCustomerID } = req.body;
    if (!packages || packages?.length === 0) return res.status(500);
    let amount = 0; // in cents
    if (packages.includes(PackageItem.Texting)) {
      amount = 7000;
    } else if (packages.includes([PackageItem.Texting, PackageItem.LiveSession])) {
      amount = 10000;
    } else {
      console.error('Unknown package item combination');
      return res.status(500);
    }
    await charge(stripeCustomerID, amount, packages.toString);
    return res.json({ success: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

async function charge(stripeCustomerID: string, amount: number, desc: string) {
  return stripe.charges
    .create({
      customer: stripeCustomerID,
      amount,
      currency: 'aud',
      description: desc,
    }).then((res) => {
      console.log(res);
    });
}
