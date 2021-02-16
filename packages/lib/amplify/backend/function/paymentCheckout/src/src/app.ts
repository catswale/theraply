/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

import { postTherapist } from './client';

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const jwt_decode = require('jwt-decode');
const stripe = require('stripe')(process.env.STRIPE_SK);
const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();

const configs = {
  dev: { clientTableName: 'Client-p54d5mes25bmth6vaw6op53j6e-dev' },
  prod: { clientTableName: 'Client-5yhmoyxy3rhddfjlj3kqhjij5i-prod' },
};
const config = configs[process.env.ENV];

// declare a new express app
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

app.post('/email', async (req, res) => {
  try {
    console.log('Email called');
    const {
      recipient, sender, topic, text,
    } = req.body;
    console.log(`recipient ${recipient}`);

    return res.json({ success: 'success' });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
});

app.listen(3000, () => {
  console.log('App started');
});
