import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setToken, setUsername }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setToken(data.token);
      const payload = JSON.parse(atob(data.token.split('.')[1]));
      setUsername(payload.username);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', payload.username);
      navigate('/');
    } else {
      setError(data.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input name="email" placeholder="Email" type="email" onChange={onChange} required />
        <br />
        <input name="password" placeholder="Password" type="password" onChange={onChange} required />
        <br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Login;
