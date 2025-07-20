'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin123') {
      alert('Admin login successful!');
      router.push('/dashboard/admin');
    } else {
      alert('Invalid admin credentials!');
    }
  };

  return (
    <div className="login-form">
      <h2>Admin Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
