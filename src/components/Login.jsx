// src/components/Login.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.get('http://localhost:3000/users');
    const user = res.data.find(
      u => u.username === formData.username && u.password === formData.password
    );
    if (user) {
      alert(`Welcome ${user.username}!`);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} placeholder="Username" />
      <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
