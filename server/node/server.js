const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json())

const { resolve } = require('path');
// Copy the .env.example in the root into a .env file in this folder
require('dotenv').config({ path: './.env' });

// Ensure environment variables are set.
checkEnv();

const generateHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(process.env.MAGPIE_SECRET_KEY + ":").toString('base64'),
  }
};

const product = {
  name: 'Picsum photo',
  unit_amount: 2500,
  currency: 'php',
  image: 'https://picsum.photos/280/320?random=1',
};

app.use(express.static(process.env.STATIC_DIR));

app.get('/', (req, res) => {
  const path = resolve(process.env.STATIC_DIR + '/index.html');
  res.sendFile(path);
});

app.get('/config', async (req, res) => {
  res.send({
    publicKey: process.env.MAGPIE_PUBLISHABLE_KEY,
    secretKey: process.env.MAGPIE_SECRET_KEY,
    unitAmount: product.unit_amount,
    currency: product.currency,
  });
});

// Fetch the Checkout Session to display the JSON result on the success page
app.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const response = await fetch(process.env.MAGPIE_CHECKOUT_API_HOST + 'sessions/' + sessionId, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: generateHeaders(),
  });
  const session = await response.json();

  res.send(session);
});

app.post('/create-checkout-session', async (req, res) => {
  const domainURL = process.env.DOMAIN;

  const { quantity } = req.body;

  // You can choose which payment methods you want your customers to use
  const paymentMethods = ['card', 'bdo', 'bpi', 'metrobank', 'pnb', 'rcbc', 'unionbank', 'alipay', 'gcash', 'paymaya', 'unionpay', 'wechat'];

  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Magpie Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // For full details see https://developer.magpie.im/checkout/operation/Create_Checkout_Session_v2_sessions__post/
  const params = {
    currency: product.currency,
    payment_method_types: paymentMethods,
    line_items: [
      {
        name: product.name,
        amount: product.unit_amount,
        currency: product.currency,
        image: product.image,
        quantity: quantity
      },
    ],
    // the success URL means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success.html`,
    cancel_url: `${domainURL}/canceled.html`,
  };
  const response = await fetch(process.env.MAGPIE_CHECKOUT_API_HOST + 'sessions', {
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    headers: generateHeaders(),
    body: JSON.stringify(params)
  });
  const session = await response.json();
  console.log('session', session);

  res.send({
    checkoutUrl: session.payment_url,
  });
});

app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));


function checkEnv() {
  const publicKey = process.env.MAGPIE_PUBLISHABLE_KEY;
  const secretKey = process.env.MAGPIE_SECRET_KEY;
  const domain = process.env.DOMAIN;

  if (!publicKey) {
    console.log("You must set your Magpie Publishable Key in the environment variables. Please see the README.");
    process.exit(0);
  } else if (!secretKey) {
    console.log("You must set your Magpie Secret Key in the environment variables. Please see the README.");
    process.exit(0);
  } else if (!domain) {
    console.log("You must set your Domain URL in the environment variables. Please see the README.");
    process.exit(0);
  }
}