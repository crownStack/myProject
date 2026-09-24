import { useEffect, useState } from 'react';
import '../style/admin.css';

const AdminDashboard = () => {
  const [rows, setRows] = useState([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState('');
  const [viewMode, setViewMode] = useState('users');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionStatus, setActionStatus] = useState({ type: '', message: '' });
  const [deletingId, setDeletingId] = useState('');
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState('');
  const [productForm, setProductForm] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/admin/users-and-carts');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to load admin data');
      }

      const users = data.users || [];
      setRows(users);

      if (users.length > 0) {
        setSelectedUserEmail(current => current && users.some(item => item.user.email === current) ? current : users[0].user.email);
      } else {
        setSelectedUserEmail('');
      }
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Unable to load products');
      setProducts(data);
    } catch (loadError) {
      setActionStatus({ type: 'error', message: loadError.message });
    }
  };

  const selectedUser = rows.find(({ user }) => user.email === selectedUserEmail) || rows[0];

  const handleDeleteUser = async (userId, email) => {
    try {
      setActionStatus({ type: '', message: '' });
      setDeletingId(userId);
      const response = await fetch(`http://localhost:5000/admin/users/${userId}`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Unable to delete user');
      }

      setRows(prev => prev.filter(item => item.user._id !== userId));
      setPendingDelete(null);
      setSelectedUserEmail(current => {
        if (!current || current === email) {
          const remaining = rows.filter(item => item.user._id !== userId);
          return remaining[0]?.user?.email || '';
        }
        return current;
      });
      setActionStatus({ type: 'success', message: data.message || 'User deleted successfully.' });
    } catch (deleteError) {
      setActionStatus({ type: 'error', message: deleteError.message || 'Unable to delete user.' });
    } finally {
      setDeletingId('');
    }
  };

  const startEditingProduct = product => {
    setEditingProductId(product._id);
    setProductForm({
      name: product.name || '',
      price: product.price || '',
      description: product.description || '',
      brand: product.brand || '',
      color: product.color || product.colour || '',
      capacity: product.capacity || '',
      size: product.size || '',
      weight: product.weight || '',
      stock: product.stock ?? 0,
      sold: product.sold ?? 0,
      image: null
    });
  };

  const handleProductChange = event => {
    const { name, value, files } = event.target;
    setProductForm(current => ({ ...current, [name]: files ? files[0] : value }));
  };

  const handleSaveProduct = async event => {
    event.preventDefault();

    try {
      setActionStatus({ type: '', message: '' });
      const formData = new FormData();
      Object.entries(productForm).forEach(([key, value]) => {
        if (value !== null && value !== undefined) formData.append(key, value);
      });

      const response = await fetch(`http://localhost:5000/products/${editingProductId}`, {
        method: 'PUT',
        body: formData
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Unable to update product');

      setProducts(current => current.map(product => product._id === data._id ? data : product));
      setEditingProductId('');
      setProductForm(null);
      setActionStatus({ type: 'success', message: 'Product updated successfully.' });
    } catch (saveError) {
      setActionStatus({ type: 'error', message: saveError.message });
    }
  };

  const handleDeleteProduct = async product => {
    try {
      setActionStatus({ type: '', message: '' });
      const response = await fetch(`http://localhost:5000/products/${product._id}`, { method: 'DELETE' });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Unable to delete product');

      setProducts(current => current.filter(item => item._id !== product._id));
      setPendingDelete(null);
      setActionStatus({ type: 'success', message: data.message || 'Product deleted successfully.' });
    } catch (deleteError) {
      setActionStatus({ type: 'error', message: deleteError.message });
    }
  };

  if (loading) return <div className="admin-page"><h2>Loading admin dashboard...</h2></div>;
  if (error) return <div className="admin-page"><h2 className="admin-error">{error}</h2></div>;

  return (
    <div className="admin-page">
      <aside className="admin-sidebar">
        <h2 className="admin-sidebar-title">Admin</h2>

        <button
          type="button"
          onClick={() => setViewMode('users')}
          className={`admin-nav-button ${viewMode === 'users' ? 'admin-nav-button-active' : ''}`}
        >
          Users
        </button>

        <button
          type="button"
          onClick={() => setViewMode('cart')}
          className={`admin-nav-button ${viewMode === 'cart' ? 'admin-nav-button-active' : ''}`}
        >
          Cart
        </button>

        <button
          type="button"
          onClick={() => setViewMode('products')}
          className={`admin-nav-button ${viewMode === 'products' ? 'admin-nav-button-active' : ''}`}
        >
          Products
        </button>

        <div className="admin-user-list">
          {rows.length === 0 ? (
            <p className="admin-empty-text">No users</p>
          ) : (
            rows.map(({ user, cartItems }) => (
              <button
                key={user._id || user.email}
                type="button"
                className={`admin-user-item ${selectedUser?.user?.email === user.email ? 'admin-user-item-active' : ''}`}
                onClick={() => {
                  setSelectedUserEmail(user.email);
                  setViewMode('users');
                }}
              >
                <span className="admin-user-name">{user.firstName} {user.lastName}</span>
                <span className="admin-user-meta">{cartItems.length} items</span>
              </button>
            ))
          )}
        </div>
      </aside>

      <main className="admin-content">
        {actionStatus.message && (
          <p className={`admin-action-status admin-action-status-${actionStatus.type}`} role="status">
            {actionStatus.message}
          </p>
        )}
        {viewMode === 'products' ? (
          <div className="admin-products-view">
            <div className="admin-header-card">
              <p className="admin-kicker">Inventory</p>
              <h1 className="admin-main-title">Manage products</h1>
            </div>

            {products.length === 0 ? (
              <div className="admin-empty">No products found.</div>
            ) : (
              <div className="admin-product-cards-grid">
                {products.map(product => (
                  <article key={product._id} className="admin-product-card">
                    {product.image && <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} className="admin-product-image" />}
                    {editingProductId === product._id ? (
                      <form onSubmit={handleSaveProduct} className="admin-product-form">
                        {['name', 'price', 'brand', 'color', 'capacity', 'size', 'weight', 'stock', 'sold'].map(field => (
                          <label key={field}>
                            {field[0].toUpperCase() + field.slice(1)}
                            <input name={field} value={productForm[field]} onChange={handleProductChange} type={['stock', 'sold'].includes(field) ? 'number' : 'text'} required={['name', 'price'].includes(field)} />
                          </label>
                        ))}
                        <label>Description<textarea name="description" value={productForm.description} onChange={handleProductChange} required /></label>
                        <label>Replace image<input name="image" type="file" accept="image/*" onChange={handleProductChange} /></label>
                        <div className="admin-product-actions">
                          <button type="submit" className="admin-save-button">Save</button>
                          <button type="button" className="admin-cancel-button" onClick={() => { setEditingProductId(''); setProductForm(null); }}>Cancel</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p><strong>Price:</strong> {product.price}</p>
                        <p><strong>Stock:</strong> {product.stock}</p>
                        <div className="admin-product-actions">
                          <button type="button" className="admin-edit-button" onClick={() => startEditingProduct(product)}>Edit</button>
                          <button type="button" className="admin-delete-button" onClick={() => setPendingDelete({ type: 'product', id: product._id })}>Delete</button>
                        </div>
                        {pendingDelete?.type === 'product' && pendingDelete.id === product._id && (
                          <div className="admin-inline-confirm">
                            <p>Delete this product permanently?</p>
                            <button type="button" className="admin-delete-button" onClick={() => handleDeleteProduct(product)}>Confirm Delete</button>
                            <button type="button" className="admin-cancel-button" onClick={() => setPendingDelete(null)}>Cancel</button>
                          </div>
                        )}
                      </>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : viewMode === 'cart' ? (
          <div className="admin-cart-view">
            <div className="admin-header-card">
              <div>
                <p className="admin-kicker">Cart View</p>
                <h1 className="admin-main-title">Users and cart items</h1>
              </div>
            </div>

            {rows.length === 0 ? (
              <div className="admin-empty">No cart items found.</div>
            ) : (
              rows.map(({ user, cartItems }) => (
                <div key={user._id || user.email} className="admin-cart-card">
                  <div className="admin-cart-card-header">
                    <div>
                      <p className="admin-cart-label">Customer cart</p>
                      <h3 className="admin-cart-user-title">{user.firstName} {user.lastName}</h3>
                    </div>
                    <span className="admin-cart-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
                  </div>
                  <div className="admin-cart-user-details">
                    <p><strong>User ID</strong><span>{user._id}</span></p>
                    <p><strong>Email</strong><span>{user.email}</span></p>
                  </div>

                  {cartItems.length === 0 ? (
                    <p className="admin-empty-cart">No products added</p>
                  ) : (
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Address</th>
                            <th>Contact</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, index) => (
                            <tr key={`${user.email}-cart-${index}`}>
                              <td className="admin-product-name">{item.productName}</td>
                              <td className="admin-quantity">{item.quantity}</td>
                              <td className="admin-price">{item.productPrice}</td>
                              <td className="admin-address">{item.deliveryAddress}</td>
                              <td className="admin-contact">{item.deliveryContact}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        ) : rows.length === 0 ? (
          <div className="admin-empty">No users found.</div>
        ) : (
          <div className="admin-users-list-view">
            <div className="admin-header-card">
              <div>
                <p className="admin-kicker">Users</p>
                <h1 className="admin-main-title">All signed up users</h1>
              </div>
            </div>

            <div className="admin-user-cards-grid">
              {rows.map(({ user }) => (
                <div key={user._id || user.email} className="admin-user-card">
                  <h3 className="admin-user-card-title">{user.firstName} {user.lastName}</h3>
                  <p><strong>User ID:</strong> {user._id}</p>
                  <p><strong>First Name:</strong> {user.firstName}</p>
                  <p><strong>Last Name:</strong> {user.lastName}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Home Address:</strong> {user.homeAddress}</p>
                  <p><strong>Town:</strong> {user.town}</p>
                  <p><strong>State:</strong> {user.state}</p>
                  <p><strong>Country:</strong> {user.country}</p>
                  <p><strong>Contact:</strong> {user.contact}</p>
                  <p><strong>Password:</strong> {user.password}</p>

                  {pendingDelete?.type === 'user' && pendingDelete.id === user._id ? (
                    <div className="admin-inline-confirm">
                      <p>Delete this user and their cart data?</p>
                      <button type="button" className="admin-delete-button" onClick={() => handleDeleteUser(user._id, user.email)} disabled={deletingId === user._id}>
                        {deletingId === user._id ? 'Deleting...' : 'Confirm Delete'}
                      </button>
                      <button type="button" className="admin-cancel-button" onClick={() => setPendingDelete(null)}>Cancel</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setPendingDelete({ type: 'user', id: user._id })} className="admin-delete-button">
                      Delete User
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
