import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './Checkout.css';

const DELIVERY_FEE = 40;

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: ''
  });
  const [cardData, setCardData] = useState({
    cardNumber: '', expiry: '', cvv: '', cardName: ''
  });
  const [success, setSuccess] = useState(false);

  const grandTotal = cartTotal + DELIVERY_FEE;

  const handleInput = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleCard = (e) => setCardData(p => ({ ...p, [e.target.name]: e.target.value }));

  const formatCardNumber = (val) => val.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const formatExpiry = (val) => {
    const v = val.replace(/\D/g,'').slice(0,4);
    return v.length >= 3 ? v.slice(0,2) + '/' + v.slice(2) : v;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) { toast.error('Cart is empty!'); return; }
    const allFields = Object.values(formData).every(v => v.trim());
    if (!allFields) { toast.error('Please fill all delivery details'); return; }

    setLoading(true);
    try {
      // Create payment intent
      await axios.post('http://localhost:5000/api/payment/create-intent', {
        amount: grandTotal, currency: 'inr'
      });

      // Place order
      await axios.post('http://localhost:5000/api/orders', {
        items: cartItems,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        total: grandTotal,
        payment: { method: 'card', ...cardData }
      });

      setSuccess(true);
      clearCart();
      toast.success('🎉 Order placed successfully!');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-screen">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>Order Placed!</h2>
          <p>Your delicious food is on its way. Estimated delivery: <strong>30 minutes</strong></p>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Home</button>
            <button className="btn btn-outline" onClick={() => navigate('/menu')}>Order More</button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        <form onSubmit={handleSubmit} className="checkout-layout">
          {/* ── Left: Form ── */}
          <div className="checkout-forms">
            {/* Delivery Info */}
            <div className="form-section">
              <h2>📍 Delivery Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name *</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInput} placeholder="Rahul" required />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInput} placeholder="Sharma" required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input name="email" type="email" value={formData.email} onChange={handleInput} placeholder="rahul@email.com" required />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input name="phone" value={formData.phone} onChange={handleInput} placeholder="+91 98765 43210" required />
                </div>
                <div className="form-group col-2">
                  <label>Street Address *</label>
                  <input name="address" value={formData.address} onChange={handleInput} placeholder="123, MG Road, Near City Mall" required />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input name="city" value={formData.city} onChange={handleInput} placeholder="Mumbai" required />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input name="state" value={formData.state} onChange={handleInput} placeholder="Maharashtra" required />
                </div>
                <div className="form-group">
                  <label>Pincode *</label>
                  <input name="pincode" value={formData.pincode} onChange={handleInput} placeholder="400001" required />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="form-section">
              <h2>💳 Payment Details</h2>
              <div className="stripe-notice">
                🔒 Secured by Stripe • Use test card: <code>4242 4242 4242 4242</code>
              </div>
              <div className="form-grid">
                <div className="form-group col-2">
                  <label>Cardholder Name</label>
                  <input name="cardName" value={cardData.cardName} onChange={handleCard} placeholder="Rahul Sharma" />
                </div>
                <div className="form-group col-2">
                  <label>Card Number</label>
                  <div className="card-input-wrap">
                    <input
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={e => setCardData(p => ({ ...p, cardNumber: formatCardNumber(e.target.value) }))}
                      placeholder="4242 4242 4242 4242"
                      maxLength={19}
                    />
                    <span className="card-icon">💳</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    name="expiry"
                    value={cardData.expiry}
                    onChange={e => setCardData(p => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    name="cvv"
                    value={cardData.cvv}
                    onChange={e => setCardData(p => ({ ...p, cvv: e.target.value.replace(/\D/g,'').slice(0,4) }))}
                    placeholder="• • •"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Summary ── */}
          <div className="checkout-summary">
            <h2>🛒 Order Summary</h2>
            <div className="checkout-items">
              {cartItems.map(item => (
                <div key={item.id} className="checkout-item">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&q=80'}
                    alt={item.name}
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&q=80'; }}
                  />
                  <div className="checkout-item-details">
                    <span className="ci-name">{item.name}</span>
                    <span className="ci-qty">× {item.quantity}</span>
                  </div>
                  <span className="ci-price">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div className="ct-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
              <div className="ct-row"><span>Delivery</span><span>₹{DELIVERY_FEE}</span></div>
              <div className="ct-divider" />
              <div className="ct-row ct-grand"><strong>Total</strong><strong className="total-amount">₹{grandTotal}</strong></div>
            </div>
            <button type="submit" className="btn btn-primary place-order-btn" disabled={loading}>
              {loading ? '⏳ Processing...' : '🍽️ Place Order'}
            </button>
            <p className="checkout-security">🔒 100% Secure & Encrypted Payment</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
