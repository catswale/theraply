import {palette, queries} from '@theraply/lib';
import { callGraphQLFromServer, callGraphQL } from './utils';

export async function sendEmail(req: any, res: any) {
  try {
    const graphql = callGraphQL(req);
    console.log('Email called');
    const {
      recipient, sender, topic, text,
    } = req.body;
    console.log(`recipient ${recipient}`);
    console.log('palette2 ' + palette.gray)
    return res.json({ success: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}
