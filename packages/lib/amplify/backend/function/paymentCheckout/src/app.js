/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const jwt_decode = require('jwt-decode')
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SK);
const AWS = require('aws-sdk')

AWS.config.update({ region: process.env.TABLE_REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();

const configs = {
  dev: {clientTableName: 'Client-p54d5mes25bmth6vaw6op53j6e-dev'},
  prod: {clientTableName: 'Client-5yhmoyxy3rhddfjlj3kqhjij5i-prod'}
}
const config = configs[process.env.ENV];

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

app.post('/payment/register', async function(req, res) {
  try {
    console.log('Checkout called')
    console.log(req)
    const accessToken = req.headers.authorization.split(" ")[1];
    if (!accessToken) return res.status(500)
    var {sub: username} = jwt_decode(accessToken);
    console.log('got username ' + username)
    let params = {
      TableName: config.clientTableName,
      Key: {
        id: username
      }
    }
    const data = await dynamodb.get(params).promise()
    console.log(data)
    if (!data.stripeCustomerID) {
      console.log('creating stripe customer')
      const customer = await stripe.customers.create();
      params = {
        TableName: config.clientTableName,
        Key: {
            id: username,
        },
        UpdateExpression: "set stripeCustomerID = :s",
        ExpressionAttributeValues:{
          ":s": customer.id,
      },
        ReturnValues:"UPDATED_NEW"
      };
      const data = await dynamodb.update(params).promise()
      console.log('updated a client')
      console.log(data)
    }
    const clientSecret = await createPaymentIntent(1099);
    return res.json({success: 'success', clientSecret});
  } catch (err) {
    console.log(err)
    return res.status(500)
  }
});

/**
 * @param {*} amount in cents, eg 1099 is $10.99
 */
async function createPaymentIntent(amount) {
  return stripe.paymentIntents.create({
    amount: amount,
    currency: 'aud',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  });
}

app.listen(3000, function() {
    console.log("App started")
});

module.exports = app