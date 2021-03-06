# Accept payments with Magpie Checkout

This sample shows you how to integrate with [Magpie Checkout](https://developer.magpie.im/docs/checkout_guide/).

Building a payment form UI from scratch is difficult -- input field validation, error message handing, and localization are just a few things to think about when designing a simple checkout flow.

We built [Checkout](https://developer.magpie.im/docs/checkout_guide/) to do that work for you so now you can focus on building the best storefront experience for your customers.

Once your customer is ready to pay, redirect them to the URL of your Magpie hosted payment page. π₯³

## Demo

- [HTML + Vanilla JavaScript](client/html)
- [React](client/react-cra)

~~The demo is running in test mode -- use `4242 4242 4242 4242` as a test card number with any CVC + future expiration date.~~

The demo is currently running in live mode while test environment is still under development.

#### Cards

Use actual card number, expiry and CVC for testing.

#### Wallets (Gcash, Paymaya, Alipay, Wechat Pay, etc.)

Use live wallet account for testing.

#### Banks (BPI, BDO, Metrobank, Unionbank, etc.)

Use live bank account for testing.

Read more about testing on Magpie at https://developer.magpie.im.

## Features

- π Built-in dynamic 3D Secure (ready for SCA)
- π§Ύπ΅ Support for various payment methods. See the [docs](https://developer.magpie.im/docs/checkout_guide/) for details.
- π¨ HTML + Vanilla JavaScript as well as βοΈ React clients

For more features see the [Checkout documentation](https://developer.magpie.im/docs/checkout_guide/).

<!-- prettier-ignore -->
|     | β
:--- | :---:
π¨ **Prebuilt checkout page.** Create a payment page that is customizable with your business' name and logo. |  β |
π’ **Dynamic checkout amounts.** Dynamically define product amounts rather than relying on predefined product prices.   | β |

## How to run locally

This sample includes 3 server implementations in JavaScript (Node), PHP, Python, and Ruby. All servers implement the same routes for the client to communicate with. There is a HTML + Vanilla JavaScript as well as a React client implemention available.

Follow the steps below to run locally.

**1. Clone and configure the sample**

```
git clone https://github.com/magpiedev/checkout-session-samples
```

Copy the .env.example file into a file named .env in the folder of the server you want to use. For example:

```
cp .env.example server/node/.env
```

You will need a Magpie account in order to run the demo. Once you set up your account, go to the Magpie [developer dashboard](https://dashboard.magpie.im) to find your API keys.

```
MAGPIE_PUBLISHABLE_KEY=<replace-with-your-publishable-key>
MAGPIE_SECRET_KEY=<replace-with-your-secret-key>
```

The other environment variables are configurable:

`STATIC_DIR` tells the server where to the client files are located and does not need to be modified unless you move the server files.

`DOMAIN` is the domain of your website, where Checkout will redirect back to after the customer completes the payment on the Checkout page.

**2. Follow the server instructions on how to run**

Pick the server language you want and follow the instructions in the server folder README on how to run.

For example, if you want to run the Node server:

```
cd server/node # there's a README in this folder with instructions
npm install
npm start
```

If you're running the react client, then the sample will run in the browser at
`localhost:3000` otherwise visit `localhost:4242`.

## FAQ

Q: Why did you pick these frameworks?

A: We chose the most minimal framework to convey the key Magpie calls and concepts you need to understand. These demos are meant as an educational tool that helps you roadmap how to integrate Magpie within your own system independent of the framework.

## Get support

If you found a bug or want to suggest a new [feature/use case/sample], please [file an issue](../../issues).

If you have questions, comments, or need help with code, we're here to help:

- by [email](mailto:hello@magpie.im)
