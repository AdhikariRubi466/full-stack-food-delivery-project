import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import './Menu.css';

const CATEGORIES = ['All', 'Pizza', 'Burger', 'Salad', 'Momos', 'Biryani', 'Pasta', 'Desserts', 'Drinks'];
const CAT_ICONS = { All: '🍽️', Pizza: '🍕', Burger: '🍔', Salad: '🥗', Momos: '🥟', Biryani: '🍛', Pasta: '🍝', Desserts: '🍰', Drinks: '🥤' };

const Menu = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || 'All';
  const searchQuery = searchParams.get('search') || '';
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (activeCategory !== 'All') params.category = activeCategory;
    if (localSearch) params.search = localSearch;
    axios.get('http://localhost:5000/api/food', { params })
      .then(res => setFoods(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [activeCategory, localSearch]);

  const setCategory = (cat) => {
    const p = {};
    if (cat !== 'All') p.category = cat;
    if (localSearch) p.search = localSearch;
    setSearchParams(p);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const p = {};
    if (activeCategory !== 'All') p.category = activeCategory;
    if (localSearch) p.search = localSearch;
    setSearchParams(p);
  };

  return (
    <div className="menu-page">
      <div className="menu-header">
        <div className="container">
          <h1 className="menu-title">Our <span>Menu</span></h1>
          <p className="menu-subtitle">Explore {foods.length}+ delicious dishes made with love</p>
          <form className="menu-search" onSubmit={handleSearch}>
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search for dishes, cuisines or categories..."
              value={localSearch}
              onChange={e => setLocalSearch(e.target.value)}
            />
            {localSearch && (
              <button type="button" className="clear-search" onClick={() => { setLocalSearch(''); setSearchParams({}); }}>✕</button>
            )}
          </form>
        </div>
      </div>

      <div className="container menu-body">
        {/* Category Tabs */}
        <div className="category-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {CAT_ICONS[cat]} {cat}
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="menu-results-header">
          {activeCategory !== 'All' || localSearch ? (
            <p>Showing <strong>{foods.length}</strong> results {localSearch && `for "${localSearch}"`} {activeCategory !== 'All' && `in ${activeCategory}`}</p>
          ) : (
            <p>Showing all <strong>{foods.length}</strong> dishes</p>
          )}
        </div>

        {/* Food Grid */}
        {loading ? (
          <div className="food-grid">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="food-card">
                <div className="skeleton" style={{ height: 200 }} />
                <div style={{ padding: 16 }}>
                  <div className="skeleton" style={{ height: 20, marginBottom: 8, borderRadius: 8 }} />
                  <div className="skeleton" style={{ height: 14, borderRadius: 8, width: '70%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : foods.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🍽️</div>
            <h3>No dishes found</h3>
            <p>Try a different category or search term</p>
            <button className="btn btn-primary" onClick={() => { setLocalSearch(''); setSearchParams({}); }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="food-grid">
            {foods.map(food => <FoodCard key={food.id} food={food} />)}
          </div>
        )}
      </div>

      <div style={{ marginTop: 80 }}>
        <Footer />
      </div>
    </div>
  );
};

export default Menu;
