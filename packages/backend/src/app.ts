import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';
import { postTherapist } from './client';
import { sendEmail } from './email';
import { paymentRegister } from './payment';

export const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

app.post('/client/therapist', postTherapist);
app.post('/payment/register', paymentRegister);
app.post('/email', sendEmail);

app.listen(3000, () => {
  console.log('App started');
});