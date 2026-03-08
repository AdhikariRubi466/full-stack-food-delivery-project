import './Footer.css';

const Footer = () => (
  <footer className="footer" id="contact">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">🍅 <span>Tomato</span></div>
          <p className="footer-desc">Delicious food delivered to your doorstep in minutes. Fresh, fast, and always hot.</p>
          <div className="footer-social">
            <a href="#" className="social-link" aria-label="Facebook">📘</a>
            <a href="#" className="social-link" aria-label="Instagram">📸</a>
            <a href="#" className="social-link" aria-label="Twitter">🐦</a>
            <a href="#" className="social-link" aria-label="YouTube">📺</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="#mobile-app">Mobile App</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="/admin">Admin Panel</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            <li><a href="/menu?category=Pizza">🍕 Pizza</a></li>
            <li><a href="/menu?category=Burger">🍔 Burger</a></li>
            <li><a href="/menu?category=Biryani">🍛 Biryani</a></li>
            <li><a href="/menu?category=Momos">🥟 Momos</a></li>
            <li><a href="/menu?category=Desserts">🍰 Desserts</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="contact-list">
            <li>📍 123 Food Street, Mumbai, MH 400001</li>
            <li>📞 +91 98765 43210</li>
            <li>✉️ hello@tomato.food</li>
            <li>🕐 Open 7 days | 9 AM – 11 PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Tomato Food Delivery. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
