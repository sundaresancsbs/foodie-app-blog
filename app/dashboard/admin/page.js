'use client';
import { useState } from 'react';
import '../../styles/adminDashboard.css'; // Make sure this file exists

export default function AdminDashboard() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Chinese Wok',
      details: 'Chinese, Asian, Tibetan, Desserts',
      price: '₹210 for two',
    },
  ]);
  const [form, setForm] = useState({ id: null, name: '', details: '', price: '' });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.details || !form.price) return alert("Fill all fields");

    const newItem = {
      id: Date.now(),
      name: form.name,
      details: form.details,
      price: form.price,
    };
    setItems([...items, newItem]);
    setForm({ id: null, name: '', details: '', price: '' });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(true);
  };

  const handleUpdate = () => {
    const updated = items.map((i) => (i.id === form.id ? form : i));
    setItems(updated);
    setEditing(false);
    setForm({ id: null, name: '', details: '', price: '' });
  };

  const handleDelete = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="admin-dashboard">
      <h2>Welcome Admin!</h2>
      <p>Manage Restaurant Items</p>

      <div className="form">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="details" placeholder="Details" value={form.details} onChange={handleChange} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        {editing ? (
          <button onClick={handleUpdate}>Update Item</button>
        ) : (
          <button onClick={handleAdd}>Add Item</button>
        )}
      </div>

      <div className="items-list">
        <h3>Items List</h3>
        {items.length === 0 && <p>No items yet.</p>}
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <strong>{item.name}</strong>
            <p>{item.details}</p>
            <p>{item.price}</p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
