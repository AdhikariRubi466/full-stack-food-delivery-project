import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const DELIVERY_FEE = 40;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet. Let's fix that!</p>
        <Link to="/menu" className="btn btn-primary">Browse Menu →</Link>
      </div>
    );
  }

  const grandTotal = cartTotal + DELIVERY_FEE;

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Your <span>Cart</span> 🛒</h1>
          <p>{cartItems.reduce((s, i) => s + i.quantity, 0)} items</p>
        </div>

        <div className="cart-layout">
          {/* ── Left: Items ── */}
          <div className="cart-items">
            <div className="cart-items-header">
              <span>Item</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Total</span>
              <span></span>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&q=80'}
                    alt={item.name}
                    className="cart-item-img"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=80&q=80'; }}
                  />
                  <div>
                    <h3 className="cart-item-name">{item.name}</h3>
                    <span className="cart-item-cat">{item.category}</span>
                  </div>
                </div>
                <span className="cart-item-price">₹{item.price}</span>
                <div className="qty-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <span className="cart-item-total">₹{item.price * item.quantity}</span>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove">✕</button>
              </div>
            ))}
          </div>

          {/* ── Right: Summary ── */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-list">
              {cartItems.map(item => (
                <div key={item.id} className="summary-row">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="summary-divider" />
            <div className="summary-row"><span>Subtotal</span><span>₹{cartTotal}</span></div>
            <div className="summary-row"><span>Delivery Fee</span><span className="free-delivery">₹{DELIVERY_FEE}</span></div>
            <div className="summary-divider" />
            <div className="summary-row total-row">
              <strong>Grand Total</strong>
              <strong className="grand-total">₹{grandTotal}</strong>
            </div>

            <div className="promo-input">
              <input type="text" placeholder="Promo Code (e.g. TOMATO50)" />
              <button className="btn btn-outline btn-sm">Apply</button>
            </div>

            <button
              className="btn btn-primary checkout-btn"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout →
            </button>
            <Link to="/menu" className="continue-shopping">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
