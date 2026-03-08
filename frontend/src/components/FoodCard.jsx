import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './FoodCard.css';

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(food);
    toast.success(`🍅 ${food.name} added to cart!`, {
      position: 'bottom-right',
      autoClose: 2000,
      theme: 'dark'
    });
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return Array.from({ length: 5 }, (_, i) => {
      if (i < full) return '★';
      if (i === full && half) return '⭐';
      return '☆';
    }).join('');
  };

  return (
    <div className="food-card">
      <div className="food-card-img-wrap">
        <img
          src={food.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80`}
          alt={food.name}
          className="food-card-img"
          loading="lazy"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80'; }}
        />
        <span className="food-card-badge">{food.category}</span>
      </div>
      <div className="food-card-body">
        <h3 className="food-card-name">{food.name}</h3>
        <div className="food-card-rating">
          <span className="stars">{renderStars(food.rating)}</span>
          <span className="rating-num">{food.rating}</span>
        </div>
        <p className="food-card-desc">{food.description}</p>
      </div>
      <div className="food-card-footer">
        <span className="food-card-price">₹{food.price}</span>
        <button className="add-btn" onClick={handleAdd} aria-label="Add to cart" title="Add to cart">+</button>
      </div>
    </div>
  );
};

export default FoodCard;
