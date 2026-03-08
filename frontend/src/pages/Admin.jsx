import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Admin.css';

const CATEGORIES = ['Pizza', 'Burger', 'Salad', 'Momos', 'Biryani', 'Pasta', 'Desserts', 'Drinks'];
const ADMIN_PASSWORD = 'admin123';

const BLANK_FORM = { name: '', description: '', price: '', rating: '4.0', category: 'Pizza', image: '' };

const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('add');
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState(BLANK_FORM);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      loadData();
    } else {
      toast.error('Invalid password!');
    }
  };

  const loadData = async () => {
    try {
      const [foodRes, orderRes] = await Promise.all([
        axios.get('http://localhost:5000/api/food'),
        axios.get('http://localhost:5000/api/orders')
      ]);
      setFoods(foodRes.data.data);
      setOrders(orderRes.data.data);
    } catch { toast.error('Failed to load data'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/food/${editingId}`, formData);
        toast.success('Item updated!');
      } else {
        await axios.post('http://localhost:5000/api/food', formData);
        toast.success('Item added!');
      }
      setFormData(BLANK_FORM);
      setEditingId(null);
      loadData();
      setActiveTab('list');
    } catch { toast.error('Failed to save item'); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await axios.delete(`http://localhost:5000/api/food/${id}`);
      toast.success('Deleted!');
      loadData();
    } catch { toast.error('Failed to delete'); }
  };

  const handleEdit = (food) => {
    setFormData({ ...food });
    setEditingId(food.id);
    setActiveTab('add');
  };

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, { status });
      toast.success('Status updated!');
      loadData();
    } catch { toast.error('Failed to update status'); }
  };

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="login-card">
          <div className="login-icon">🔐</div>
          <h2>Admin Login</h2>
          <p>Enter the admin password to access the panel</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter password (admin123)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
            />
            <button type="submit" className="btn btn-primary login-btn">Login →</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">🍅 <span>Tomato</span></div>
        <nav className="sidebar-nav">
          <button className={`sidebar-item ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
            <span>➕</span> {editingId ? 'Edit Item' : 'Add Food Item'}
          </button>
          <button className={`sidebar-item ${activeTab === 'list' ? 'active' : ''}`} onClick={() => { setActiveTab('list'); loadData(); }}>
            <span>📋</span> Food List
            <span className="sidebar-badge">{foods.length}</span>
          </button>
          <button className={`sidebar-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => { setActiveTab('orders'); loadData(); }}>
            <span>📦</span> Orders
            <span className="sidebar-badge">{orders.length}</span>
          </button>
          <button className="sidebar-item sidebar-logout" onClick={() => setAuthed(false)}>
            <span>🚪</span> Logout
          </button>
        </nav>
      </aside>

      {/* ── Main Content ── */}
      <main className="admin-main">
        {/* ── ADD / EDIT TAB ── */}
        {activeTab === 'add' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h1>{editingId ? '✏️ Edit Food Item' : '➕ Add New Food Item'}</h1>
              {editingId && (
                <button className="btn btn-outline btn-sm" onClick={() => { setFormData(BLANK_FORM); setEditingId(null); }}>
                  Cancel Edit
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-grid">
                <div className="form-group">
                  <label>Food Name *</label>
                  <input value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} placeholder="e.g. Pepperoni Pizza" required />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input type="number" value={formData.price} onChange={e => setFormData(p => ({...p, price: e.target.value}))} placeholder="299" required min="1" />
                </div>
                <div className="form-group">
                  <label>Rating (1-5)</label>
                  <input type="number" value={formData.rating} onChange={e => setFormData(p => ({...p, rating: e.target.value}))} step="0.1" min="1" max="5" placeholder="4.5" />
                </div>
                <div className="form-group col-2">
                  <label>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(p => ({...p, description: e.target.value}))}
                    placeholder="Short, appetizing description..."
                    rows={3}
                  />
                </div>
                <div className="form-group col-2">
                  <label>Image URL</label>
                  <input value={formData.image} onChange={e => setFormData(p => ({...p, image: e.target.value}))} placeholder="https://example.com/food.jpg" />
                </div>
                {formData.image && (
                  <div className="image-preview">
                    <img src={formData.image} alt="Preview" onError={e => e.target.style.display='none'} />
                    <span>Image Preview</span>
                  </div>
                )}
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '⏳ Saving...' : editingId ? '✅ Update Item' : '➕ Add Item'}
              </button>
            </form>
          </div>
        )}

        {/* ── FOOD LIST TAB ── */}
        {activeTab === 'list' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h1>📋 Food Items</h1>
              <span className="item-count">{foods.length} items</span>
            </div>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {foods.map(food => (
                    <tr key={food.id}>
                      <td>
                        <img
                          src={food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&q=80'}
                          alt={food.name}
                          className="table-img"
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=60&q=80'; }}
                        />
                      </td>
                      <td><strong>{food.name}</strong></td>
                      <td><span className="cat-pill">{food.category}</span></td>
                      <td><strong>₹{food.price}</strong></td>
                      <td>⭐ {food.rating}</td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-edit" onClick={() => handleEdit(food)}>✏️ Edit</button>
                          <button className="btn-delete" onClick={() => handleDelete(food.id, food.name)}>🗑️ Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {activeTab === 'orders' && (
          <div className="admin-section">
            <div className="admin-section-header">
              <h1>📦 Orders</h1>
              <span className="item-count">{orders.length} orders</span>
            </div>
            {orders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📦</div>
                <h3>No orders yet</h3>
                <p>Orders will appear here once customers start ordering</p>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Items</th>
                      <th>Address</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td><code>{order.id}</code></td>
                        <td>{order.items?.map(i => `${i.name} ×${i.quantity}`).join(', ')}</td>
                        <td style={{maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{order.address}</td>
                        <td><strong>₹{order.total}</strong></td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <select
                            className={`status-select status-${order.status?.toLowerCase()}`}
                            value={order.status}
                            onChange={e => handleUpdateStatus(order.id, e.target.value)}
                          >
                            <option>Pending</option>
                            <option>Confirmed</option>
                            <option>Preparing</option>
                            <option>Out for Delivery</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
