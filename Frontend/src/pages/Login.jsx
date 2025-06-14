import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col gap-4 w-full max-w-sm">
        <input
          type="email"
          className="px-4 py-2 rounded bg-zinc-700 text-white"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="px-4 py-2 rounded bg-zinc-700 text-white"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-purple-600 py-2 rounded font-semibold hover:opacity-90"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

