import React, { useEffect, useReducer } from 'react';

const fetchCheckoutSession = async ({ quantity }) => {
  return fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity,
    }),
  }).then((res) => res.json());
};

const formatProduct = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

function reducer(state, action) {
  switch (action.type) {
    case 'useEffectUpdate':
      return {
        ...state,
        ...action.payload,
        product: formatProduct({
          amount: action.payload.unitAmount,
          currency: action.payload.currency,
          quantity: state.quantity,
        }),
      };
    case 'increment':
      return {
        ...state,
        quantity: state.quantity + 1,
        product: formatProduct({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity + 1,
        }),
      };
    case 'decrement':
      return {
        ...state,
        quantity: state.quantity - 1,
        product: formatProduct({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity - 1,
        }),
      };
    case 'setLoading':
      return { ...state, loading: action.payload.loading };
    case 'setError':
      return { ...state, error: action.payload.error };
    default:
      throw new Error();
  }
}

const Checkout = () => {
  const [state, dispatch] = useReducer(reducer, {
    quantity: 1,
    product: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const { unitAmount, currency } = await fetch(
        '/config'
      ).then((res) => res.json());

      dispatch({
        type: 'useEffectUpdate',
        payload: { unitAmount, currency },
      });
    }
    fetchConfig();
  }, []);

  const handleClick = async (event) => {
    // Call your backend to create the Checkout session.
    dispatch({ type: 'setLoading', payload: { loading: true } });
    const { checkoutUrl } = await fetchCheckoutSession({
      quantity: state.quantity,
    });
    // When the customer clicks on the button, redirect them to Checkout.
    window.location.href = checkoutUrl;
  };

  return (
    <div className="sr-root">
      <div className="sr-main">
        <header className="sr-header">
          <div className="sr-header__logo"></div>
        </header>
        <section className="container">
          <div>
            <h1>Single photo</h1>
            <h4>Purchase a Lorem Picsum photo</h4>
            <div className="picsum-image">
              <img
                alt="Random asset from Picsum"
                src="https://picsum.photos/280/320?random=4"
                width="140"
                height="160"
              />
            </div>
          </div>
          <div className="quantity-setter">
            <button
              className="increment-btn"
              disabled={state.quantity === 1}
              onClick={() => dispatch({ type: 'decrement' })}
            >
              -
            </button>
            <input
              type="number"
              id="quantity-input"
              min="1"
              max="10"
              value={state.quantity}
              readOnly
            />
            <button
              className="increment-btn"
              disabled={state.quantity === 10}
              onClick={() => dispatch({ type: 'increment' })}
            >
              +
            </button>
          </div>
          <p className="sr-legal-text">Number of copies (max 10)</p>

          <button
            role="link"
            onClick={handleClick}
            disabled={state.loading}
          >
            {state.loading || !state.product
              ? `Loading...`
              : `Buy for ${state.product}`}
          </button>
          <div className="sr-field-error">{state.error?.message}</div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;