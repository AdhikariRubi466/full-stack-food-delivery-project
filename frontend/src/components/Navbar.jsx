import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) navigate(`/menu?search=${encodeURIComponent(searchVal.trim())}`);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍅</span>
          <span className="logo-text">Tomato</span>
        </Link>

        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/menu" className="nav-link" onClick={() => setMenuOpen(false)}>Menu</Link>
          <a href="#mobile-app" className="nav-link" onClick={() => setMenuOpen(false)}>Mobile App</a>
          <a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact Us</a>
        </div>

        <form className="nav-search" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search food items..."
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
          />
        </form>

        <div className="nav-actions">
          <Link to="/cart" className="cart-btn" aria-label="Cart">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
          <Link to="/admin" className="btn btn-primary btn-sm nav-signin">Sign In</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
