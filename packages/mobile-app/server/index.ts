import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51HyBbcLY5UjkiodXhwHka09RsUIn8elbXZ7d2cPEK7ISbJh0o2THkIJl38rzrlcKzuz2SB5fcbTxbqSghGTKAtq700DIQYFLfS', {
  apiVersion: '2020-08-27',
});
async function test() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'aud',
    payment_method_types: ['card'],
    receipt_email: 'jenny.rosen@example.com',
  });
  console.log(paymentIntent)
}

(async () => {
  // const customer = await stripe.customers.create({
  //   email: 'customer@example.com',
  //   idempotencyKey: '3242'
  // });
  const customer = {id: 'cus_IfgEnwlMhmEHQs'}
  // const intent = await stripe.paymentIntents.create({
  //   amount: 1099,
  //   currency: 'aud',
  //   customer: customer.id,
  // });
  const card = await stripe.customers.createSource(
    'cus_IfgEnwlMhmEHQs',
    {source: 'tok_1I4LsvLY5UjkiodXXYMYu6uP'}
  );
  console.log(card)
})();