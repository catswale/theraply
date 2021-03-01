import Stripe from 'stripe';
import { Request, Response } from 'express';
import {
  PackageItem, getPkg, Package, PackageName,
} from '@theraply/lib';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import config from './config';
import { getHeaderData } from './utils';
import { getClient, updateClient } from './client';

const stripe = new Stripe(config.STRIPE_KEY, {
  apiVersion: '2020-08-27',
});

export async function paymentRegister(req: Request, res: Response) {
  try {
    console.log('payment register');
    const pkgName = req.body.pkgName as PackageName;
    const cardToken = req.body.cardToken as string;
    if (!cardToken || !pkgName) return res.status(500).send({ success: false });
    const { id, email, firstName } = getHeaderData(req, res);
    const client = await getClient(req, id);
    let { stripeCustomerID } = client;
    if (!stripeCustomerID) {
      console.log('creating stripe customer');
      const customer = await stripe.customers.create({ email, name: firstName });
      console.log(customer);
      stripeCustomerID = customer.id;
      const card = await createCard(stripeCustomerID, cardToken);
      console.log(card);
    }
    const pkg = getPkg(pkgName);
    const oldPackageItems = client.packageItems || [];
    const packageItems = [...oldPackageItems, ...createPackageItems(pkg)];
    console.log(packageItems);
    await charge(req, id, stripeCustomerID, pkg);
    await updateClient(req, { id: client.id, packageItems, stripeCustomerID });
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ success: false });
  }
}

export async function paymentCard(req: Request, res: Response) {
  try {
    console.log('calling /payment/card api');
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
    const { id } = getHeaderData(req, res);
    const pkgName = req.body.pkgName as PackageName;
    const stripeCustomerID = req.body.stripeCustomerID as string;
    const pkg = getPkg(pkgName);
    if (!stripeCustomerID || !pkg) return res.status(500);
    await charge(req, id, stripeCustomerID, pkg);
    const client = await getClient(req, id);
    const oldPackageItems = client.packageItems || [];
    const packageItems = [...oldPackageItems, ...createPackageItems(pkg)];
    await updateClient(req, { ...client, packageItems });
    return res.json({ success: true });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}

async function charge(req, id: string, stripeCustomerID: string, pkg: Package) {
  await stripe.charges.create({
    customer: stripeCustomerID,
    amount: pkg.price,
    currency: 'aud',
    description: `${pkg.name}: ${pkg.itemNames.toString}`,
  });
}

function createPackageItems(pkg: Package) {
  const packageItems: PackageItem[] = [];
  pkg.itemNames.forEach((itemName) => {
    packageItems.push({
      id: uuidv4(),
      name: itemName,
      packageName: pkg.name,
      expiry: moment.utc().add(pkg.daysValid, 'days').format(),
      createdAt: moment.utc().format(),
      sessions: itemName === 'TextingAndLiveSession' ? 1 : undefined,
    });
  });
  return packageItems;
}
