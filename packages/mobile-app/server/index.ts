import Stripe from 'stripe';
var jwt = require('jsonwebtoken');
var jwkToPem = require('jwk-to-pem');

const jwk = {
	"keys": [{
		"kid": "1234example=",
		"alg": "RS256",
		"kty": "RSA",
		"e": "AQAB",
		"n": "1234567890",
		"use": "sig"
	}, {
		"kid": "5678example=",
		"alg": "RS256",
		"kty": "RSA",
		"e": "AQAB",
		"n": "987654321",
		"use": "sig"
	}]
}
const token = 'eyJraWQiOiJBYTcrbldkMStjazJCUkxuSnVpSHVwcGhKOEFkWDNFM05hcllEUUhnc3RnPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI0MGJlYzQ3OC02NmI3LTQ0ZDItYjMyNy01ZmE2ZmJlNDJkZTQiLCJhdWQiOiIzZDZpa2JsaHV2ZjI3bGw0ZHExZmRlbjljcCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjE2ZjJiMjE1LTdmOWEtNDUyNC05OGEyLTE2NDMzZDk4ZGY4ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjA5MzE5OTM5LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTJfeU1pZU16ejVvIiwiY29nbml0bzp1c2VybmFtZSI6IjQwYmVjNDc4LTY2YjctNDRkMi1iMzI3LTVmYTZmYmU0MmRlNCIsImV4cCI6MTYwOTU5OTA5MywiZ2l2ZW5fbmFtZSI6IkNhdCIsImlhdCI6MTYwOTU5NTQ5NCwiZW1haWwiOiJjYXRzd2FsZUBnbWFpbC5jb20ifQ.ePgozW4-Gz4F1Os8UIlP60-P5IR_5keijRPBi5_5_pMVsqpOaNUd0bfh9f4rxcCVEIxZWnEXE36YYNz83Vye6KfYkS41QtchY0EEgs9LLMXdvpACQVnyiIOt9aTmBiLLbtURCb3Z2IwU_wJoBEx2PMXUk5rOqhFVAPa37ti1K9nF4GNc-RLhdpPsX_6WHmxugwNQ6QJwMCBWzr3xNEAtikZbrrtrZXxweSkAtx11qYW_1FX-eaAqFg2YE3sXbjsnBgnwPTnYfIpaucCSsz1qTupE-T_gfuyS-UTyhTocyO8Zw6pGsVihRYUbM_DMQVuiq2vgb_Q_Hkh8HCTNbX-7Gw'
var pem = jwkToPem(jwk);
jwt.verify(token, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
  console.log(err)
  console.log(decodedToken)
});

// const stripe = new Stripe('sk_test_51HyBbcLY5UjkiodXhwHka09RsUIn8elbXZ7d2cPEK7ISbJh0o2THkIJl38rzrlcKzuz2SB5fcbTxbqSghGTKAtq700DIQYFLfS', {
//   apiVersion: '2020-08-27',
// });
// async function test() {
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: 1000,
//     currency: 'aud',
//     payment_method_types: ['card'],
//     receipt_email: 'jenny.rosen@example.com',
//   });
//   console.log(paymentIntent)
// }

// (async () => {
//   // const customer = await stripe.customers.create({
//   //   email: 'customer@example.com',
//   //   idempotencyKey: '3242'
//   // });
//   const customer = {id: 'cus_IfgEnwlMhmEHQs'}
//   // const intent = await stripe.paymentIntents.create({
//   //   amount: 1099,
//   //   currency: 'aud',
//   //   customer: customer.id,
//   // });
//   const card = await stripe.customers.createSource(
//     'cus_IfgEnwlMhmEHQs',
//     {source: 'tok_1I4LsvLY5UjkiodXXYMYu6uP'}
//   );
//   console.log(card)
// })();