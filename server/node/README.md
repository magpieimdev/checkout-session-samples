# Checkout single product

An [Express server](http://expressjs.com) implementation

## Requirements

- Node v10+
- [Configured .env file](../../README.md)

## How to run

1. Confirm `.env` configuration

This sample requires a Magpie account API keys in the environment variable.

Open `.env` and confirm that `MAGPIE_PUBLISHABLE_KEY` and `MAGPIE_SECRET_KEY` is set . It should look something like:

```
MAGPIE_PUBLISHABLE_KEY=pk_live_TYooMQauvdEDq54NiTphI7jx
MAGPIE_SECRET_KEY=sk_live_TYooMQauvdEDq54NiTphI7jx
```

Note that `pk_live...` and `sk_live...` is a placeholder and the sample will not work with that API keys. You can retrieve your API keys from Magpie [developer dashboard](https://dashboard.magpie.im).

2. Install dependencies

```
npm install
```

3. Run the application

```
npm start
```

4. If you're using the html client, go to `localhost:4242` to see the demo. For
   react, visit `localhost:3000`.
