import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL } from '../config';

const PAYSTACK_SCRIPT_URL = 'https://js.paystack.co/v1/inline.js';

const ConfirmOrder = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(location.state?.total || 0);
  const [status, setStatus] = useState('');
  const [isPaystackReady, setIsPaystackReady] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${PAYSTACK_SCRIPT_URL}"]`);

    if (existingScript) {
      setIsPaystackReady(true);
      return;
    }

    const script = document.createElement('script');
    script.src = PAYSTACK_SCRIPT_URL;
    script.async = true;
    script.onload = () => setIsPaystackReady(true);
    script.onerror = () => setStatus('Unable to load Paystack. Please try again.');
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    if (amount) return;

    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      setStatus('Your cart is empty.');
      return;
    }

    fetch(`${API_URL}/cart/${cartId}`)
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Unable to load cart');
        return data;
      })
      .then(data => {
        const cartTotal = data.items.reduce(
          (sum, item) => sum + (Number(item.product?.price) || 0) * item.quantity,
          0
        );
        setAmount(cartTotal);
        if (!cartTotal) setStatus('Your cart is empty.');
      })
      .catch(error => setStatus(error.message));
  }, [amount]);

  const handleSubmit = event => {
    event.preventDefault();
    setStatus('');

    if (!email || !name || !amount) {
      setStatus('Enter your name and email to continue with payment.');
      return;
    }

    if (!isPaystackReady || !window.PaystackPop) {
      setStatus('Payment is still loading. Please try again.');
      return;
    }

    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      setStatus('Paystack is not configured. Add VITE_PAYSTACK_PUBLIC_KEY to your environment.');
      return;
    }

    const payment = window.PaystackPop.setup({
      key: publicKey,
      email,
      amount: Math.round(Number(amount) * 100),
      currency: 'NGN',
      metadata: { custom_fields: [{ display_name: 'Customer name', variable_name: 'customer_name', value: name }] },
      callback: response => setStatus(`Payment successful. Reference: ${response.reference}`),
      onClose: () => setStatus('Payment window closed.')
    });

    payment.openIframe();
  };

  return (
    <main className="confirmOrder">
      <h1>Confirm Order</h1>
      <p>Total: #{Number(amount).toLocaleString()}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="customerName">Full name</label>
        <input
          id="customerName"
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
          required
        />

        <label htmlFor="customerEmail">Email address</label>
        <input
          id="customerEmail"
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />

        <button type="submit" disabled={!amount || !isPaystackReady}>
          Pay with Paystack
        </button>
      </form>

      {status && <p role="status">{status}</p>}
    </main>
  );
};

export default ConfirmOrder;
