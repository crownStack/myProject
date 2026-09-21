import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../style/cart.css'

const Cart = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('Loading cart...');

  useEffect(() => {
    const cartId = localStorage.getItem('cartId');
    const signedInUser = JSON.parse(localStorage.getItem('signinData') || 'null');
    const cartUrl = signedInUser?.email
      ? `http://localhost:5000/cart/user/${encodeURIComponent(signedInUser.email)}`
      : cartId
        ? `http://localhost:5000/cart/${cartId}`
        : null;

    if (!cartUrl) {
      setStatus('Your cart is empty.');
      return;
    }

    fetch(cartUrl)
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Unable to load cart');
        return data;
      })
      .then(data => {
        const validItems = (data.items || []).filter(item => item.product);
        setItems(validItems);
        if (data.cartId) localStorage.setItem('cartId', data.cartId);
        setStatus(validItems.length ? '' : 'Your cart is empty.');
      })
      .catch(error => setStatus(error.message));
  }, []);

  const getImageUrl = image => {
    if (!image) return '';
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    return `http://localhost:5000/uploads/${image.replace(/^uploads[\\/]/, '')}`;
  };

  const total = items.reduce((sum, item) => sum + (Number(item.product?.price) || 0) * item.quantity, 0);

  return (
    <div className="cartPage">
      <h1 style={{ textAlign: 'center' }}>Cart</h1>
      <div className='cartProduct'>
        {status && <p>{status}</p>}
        {items.map(item => (
          <div className='box' key={`${item.product._id}-${item.quantity}`}>
            <article>
              <div className='cart'>
                <img src={getImageUrl(item.product.image)} alt={item.product.name} />
                <div className='cartItems'>
                  <div className='titlePrice'>
                    <h2>{item.product.name}</h2>
                    <p className='brand'>{item.product.brand}</p>
                    <p className='quantity'>Quantity: {item.quantity}</p>
                    <p className='price'>#{(Number(item.product.price) * item.quantity).toLocaleString()}</p>
                  </div>

                  <div className='deliveryInfo'>
                    {item.delivery ? (
                    <div>
                      <h3>Delivery information (1-2 days)</h3>
                      <p>Method: {item.delivery.type}</p>
                      <p>Address: {item.delivery.address}</p>
                      <p>Location: {item.delivery.lga}, {item.delivery.state}</p>
                      <p>Contact: {item.delivery.contact}</p>
                    </div>
                  ) : <p>Delivery information is not available for this item.</p>}
                  </div>
                </div>
              </div>
            </article>
          </div>  
        ))}

        <div className='cartTotal'>
          <h1>Cart Summary</h1>
          {items.length > 0 && <h2>Total: #{total.toLocaleString()}</h2>}
          {items.length > 0 && (
            <Link state={{ total }}>
              <button type="button">Confirm Order</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
