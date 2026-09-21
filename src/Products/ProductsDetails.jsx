import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import image from '../images/cart.png'

const ProductsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState('');
    const [cartMessage, setCartMessage] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [delivery, setDelivery] = useState({
        type: '',
        state: '',
        lga: '',
        address: '',
        contact: ''
    });

    const getImageUrl = image => {
        if (!image) return '';
        if (image.startsWith('http://') || image.startsWith('https://')) return image;
        return `http://localhost:5000/uploads/${image.replace(/^uploads[\\/]/, '')}`;
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/products/${id}`);
                if (!response.ok) throw new Error(`Product request failed with status ${response.status}`);
                setProduct(await response.json());
            } catch (requestError) {
                setError(requestError.message);
            }
        };

        getProduct();
    }, [id]);

    const updateDelivery = (field, value) => {
        setDelivery(current => ({ ...current, [field]: value }));
    };

    const addToCart = async () => {
        if (Object.values(delivery).some(value => !value.trim())) {
            setCartMessage('Complete your delivery information before adding this product.');
            return;
        }

        try {
            const signedInUser = JSON.parse(localStorage.getItem('signinData') || 'null');

            const response = await fetch('http://localhost:5000/cart/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartId: localStorage.getItem('cartId'),
                    userId: signedInUser?._id || null,
                    userEmail: signedInUser?.email || null,
                    productId: product._id,
                    quantity,
                    delivery
                })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Unable to add product to cart');

            localStorage.setItem('cartId', data.cartId);
            setCartMessage('');
            setShowSuccessModal(true);
        } catch (requestError) {
            setCartMessage(requestError.message);
        }
    };

    if (error) return <h2>Unable to load product: {error}</h2>;
    if (!product) return <h2>Loading Product...</h2>;

    return (
        <div className='productDetails'>
            <div className='productImage'>
                <img src={getImageUrl(product.image)} alt={product.name} />
            </div>

            <div className='info'>
                <div className='productInfo'>
                    <h1>{product.name}</h1>
                    <p>Brand: <strong>{product.brand}</strong></p>
                </div>
                <div className='productRating'>
                    {"*".repeat(Number(product.rating) || 0)}
                    <p style={{ width: '20px', height: '20px' }}>
                        {"⭐".repeat(Math.max(0, 5 - (Number(product.rating) || 0)))}
                    </p>
                    <span>Customer's Rating</span>
                </div>
                <h2 className='ProductPrice'>{Number(product.price || 0).toLocaleString()}</h2>
                <div className='ProductBtn'>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
                <div className='CartBtn'>
                    <button onClick={addToCart} style={{ background: '#211d1d', color: '#fff' }}>Add to cart</button>
                    <button>Buy Now</button>
                </div>
                {cartMessage && <p>{cartMessage}</p>}
            </div>

            <div className='delivery'>
                <h3 style={{ marginBottom: '5px' }}>Delivery</h3>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <input
                        style={{ width: '15px', cursor: 'pointer' }}
                        type='radio'
                        name='deliveryType'
                        value='Pickup at the office'
                        checked={delivery.type === 'Pickup at the office'}
                        onChange={event => updateDelivery('type', event.target.value)}
                    />
                    Pickup at the office
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '5px'}}>
                    <input
                        style={{ width: '15px', cursor: 'pointer' }}
                        type='radio'
                        name='deliveryType'
                        value='Home Delivery'
                        checked={delivery.type === 'Home Delivery'}
                        onChange={event => updateDelivery('type', event.target.value)}
                    />
                    Home Delivery
                </label>
                <select value={delivery.state} onChange={event => updateDelivery('state', event.target.value)} style={{ marginTop: '30px' }}>
                    <option value=''>Select state</option>
                    <option value='Lagos State'>Lagos State</option>
                    <option value='Ogun State'>Ogun State</option>
                    <option value='Oyo State'>Oyo State</option>
                </select>
                <select value={delivery.lga} onChange={event => updateDelivery('lga', event.target.value)} style={{ marginTop: '10px' }}>
                    <option value=''>Select L.G.A</option>
                    <option value='Lagos, Lagos L.G.A'>Lagos, Lagos L.G.A</option>
                    <option value='Ikeja, Lagos L.G.A'>Ikeja, Lagos L.G.A</option>
                    <option value='Abeokuta, Ogun L.G.A'>Abeokuta, Ogun L.G.A</option>
                </select>
                <textarea
                    value={delivery.address}
                    onChange={event => updateDelivery('address', event.target.value)}
                    style={{ marginTop: '10px' }}
                    placeholder='Input Delivery Street Address'
                />
                <input
                    value={delivery.contact}
                    onChange={event => updateDelivery('contact', event.target.value)}
                    style={{ marginTop: '10px' }}
                    type='tel'
                    placeholder='Input Contact Number'
                />
                <div style={{ marginTop: '30px' }}>
                    <h3 style={{ marginBottom: '20px', lineHeight: '20px' }}>Pickup at the Office<br />21, Kodesho Street, beside Juli Pharmacy, Ikeja, Lagos.</h3>
                    <h3 style={{ marginBottom: '20px' }}>Home delivery<br />Delivery fees would be charged irrespective of your location.</h3>
                </div>
            </div>

            <div className='productInfo productSpecs'>
                <h2>Product Details</h2>
                <div><strong>Colour:</strong><span>{product.color || product.colour || 'Not specified'}</span></div>
                <div><strong>Capacity:</strong><span>{product.capacity}</span></div>
                <div><strong>Size:</strong><span>{product.size}</span></div>
                <div><strong>Weight:</strong><span>{product.weight}</span></div>
            </div>

            {showSuccessModal && (
                <div className='cartSuccessOverlay' role='dialog' aria-modal='true' aria-labelledby='cart-success-title'>
                    <div className='cartSuccessModal'>
                        <div className='sucessfulImg'>
                            <img src={image} alt="" srcset="" />
                            <h2 id='cart-success-title'>Successful</h2>
                        </div>

                        <div className='cartSuccessActions'>
                            <button type='button' onClick={() => navigate('/Cart')}>Continue to cart</button>
                            <button type='button' onClick={() => navigate('/Home')}>Back to home</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsDetails;
