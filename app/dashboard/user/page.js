'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
//import Navbar from '../components/Navbar'; // optional, if you want a shared nav

export default function UserDashboard() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@gmail.com",
  });

  const [orders, setOrders] = useState([
    { id: 1, item: "Pizza", status: "Delivered" },
    { id: 2, item: "Burger", status: "In Progress" },
  ]);

  const router = useRouter();

  useEffect(() => {
    // Simple check for demo: redirect if not logged in
    if (typeof window !== 'undefined' && localStorage.getItem('userLoggedIn') !== 'true') {
      router.push('/login/user');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userLoggedIn');
    router.push('/login/user');
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-content">
        <h2>Welcome, {userData.name}!</h2>
        <p>Email: {userData.email}</p>

        <h3>Your Orders</h3>
        <div className="order-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <p><strong>Item:</strong> {order.item}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </div>
          ))}
        </div>

        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
