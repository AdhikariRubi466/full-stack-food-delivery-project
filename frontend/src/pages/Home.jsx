import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import './Home.css';

const CATEGORIES = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Salad', icon: '🥗' },
  { name: 'Momos', icon: '🥟' },
  { name: 'Biryani', icon: '🍛' },
  { name: 'Pasta', icon: '🍝' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Drinks', icon: '🥤' },
];

const REVIEWS = [
  { name: 'Priya Sharma', avatar: '👩', rating: 5, text: 'Best food delivery app! Always on time and the food is super fresh. Absolutely love the biryani!', location: 'Mumbai' },
  { name: 'Rahul Mehta', avatar: '👨', rating: 5, text: 'The pizza arrived piping hot and the packaging was excellent. Will definitely order again!', location: 'Delhi' },
  { name: 'Ananya Singh', avatar: '👩‍🦱', rating: 4, text: 'Amazing variety of food. The momos are to die for! Great customer service too.', location: 'Bangalore' },
];

const Home = () => {
  const [popularFoods, setPopularFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/food')
      .then(res => {
        const sorted = [...res.data.data].sort((a, b) => b.rating - a.rating).slice(0, 8);
        setPopularFoods(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">🚀 Fast Delivery in 30 Minutes</div>
            <h1 className="hero-title">
              Order Your <span>Favourite</span><br />Food Here
            </h1>
            <p className="hero-subtitle">
              Discover the best food from restaurants near you.<br />
              Fresh, delicious, delivered in minutes.
            </p>
            <div className="hero-actions">
              <Link to="/menu" className="btn btn-primary hero-cta">
                🍽️ Order Now
              </Link>
              <a href="#popular" className="btn btn-outline hero-cta-secondary">
                View Menu
              </a>
            </div>
            <div className="hero-stats">
              <div className="stat"><span className="stat-num">50k+</span><span>Happy Customers</span></div>
              <div className="stat-divider" />
              <div className="stat"><span className="stat-num">200+</span><span>Food Items</span></div>
              <div className="stat-divider" />
              <div className="stat"><span className="stat-num">30min</span><span>Avg. Delivery</span></div>
            </div>
          </div>
          <div className="hero-image-wrap">
            <div className="hero-image-bg" />
            <img
              src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80"
              alt="Delicious food"
              className="hero-img"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80'; }}
            />
            <div className="hero-float-card top-right">
              <span>🔥</span>
              <div><strong>Hot Deal!</strong><br /><small>50% off first order</small></div>
            </div>
            <div className="hero-float-card bottom-left">
              <span>⭐</span>
              <div><strong>4.8 Rating</strong><br /><small>1000+ reviews</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="categories-section section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Browse by Category</span>
            <h2 className="section-title">What are you <span>craving?</span></h2>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                className="category-chip"
                onClick={() => navigate(`/menu?category=${cat.name}`)}
              >
                <span className="cat-icon">{cat.icon}</span>
                <span className="cat-name">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR DISHES ── */}
      <section className="section popular-section" id="popular">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">🔥 Trending Now</span>
            <h2 className="section-title">Popular <span>Dishes</span></h2>
            <p className="section-subtitle">Handpicked favourites loved by thousands of customers</p>
          </div>
          {loading ? (
            <div className="food-grid">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="food-card skeleton-card">
                  <div className="skeleton" style={{ height: 200 }} />
                  <div style={{ padding: 16 }}>
                    <div className="skeleton" style={{ height: 20, marginBottom: 8, borderRadius: 8 }} />
                    <div className="skeleton" style={{ height: 14, marginBottom: 6, borderRadius: 8, width: '70%' }} />
                    <div className="skeleton" style={{ height: 14, borderRadius: 8, width: '90%' }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="food-grid">
              {popularFoods.map(food => <FoodCard key={food.id} food={food} />)}
            </div>
          )}
          <div className="section-cta">
            <Link to="/menu" className="btn btn-primary">View Full Menu →</Link>
          </div>
        </div>
      </section>

      {/* ── SPECIAL OFFER ── */}
      <section className="offers-section">
        <div className="container">
          <div className="offer-banner">
            <div className="offer-content">
              <span className="offer-tag">Limited Time</span>
              <h2>🎉 Get 50% OFF</h2>
              <p>On your first order! Use code <strong>TOMATO50</strong> at checkout.</p>
              <Link to="/menu" className="btn btn-secondary">Claim Offer →</Link>
            </div>
            <div className="offer-image">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80" alt="Special offer" />
            </div>
          </div>
        </div>
      </section>

      {/* ── MOBILE APP ── */}
      <section className="section app-section" id="mobile-app">
        <div className="container app-inner">
          <div className="app-content">
            <span className="section-tag">📱 Mobile App</span>
            <h2 className="section-title">Download the <span>Tomato App</span></h2>
            <p className="section-subtitle">Get exclusive app-only offers. Track your order in real-time. Available on iOS & Android.</p>
            <div className="app-badges">
              <a href="#" className="app-badge">🍎 App Store</a>
              <a href="#" className="app-badge">🤖 Google Play</a>
            </div>
          </div>
          <div className="app-image">
            <img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80" alt="Mobile app" />
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="section reviews-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">❤️ Customer Love</span>
            <h2 className="section-title">What our <span>customers say</span></h2>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card card">
                <div className="review-stars">{'★'.repeat(r.rating)}</div>
                <p className="review-text">"{r.text}"</p>
                <div className="review-author">
                  <span className="review-avatar">{r.avatar}</span>
                  <div>
                    <strong>{r.name}</strong>
                    <span className="review-loc">📍 {r.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
