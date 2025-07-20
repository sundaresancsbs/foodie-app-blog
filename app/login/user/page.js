'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (email.trim() !== '' && password.trim() !== '') {
      setError('');
      localStorage.setItem('userLoggedIn', 'true');
      setEmail('');
      setPassword('');
      alert('Login successful!');
      router.push('/');
    } else {
      setError('Please enter both email and password!');
    }
  };

  return (
    <div className="login-form">
      <h2>User Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}
