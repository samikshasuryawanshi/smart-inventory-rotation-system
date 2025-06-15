import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

const Login = () => {
  const { login, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login error:', error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-zinc-900 text-white">
      <h2 className="text-2xl mb-4 font-bold">Login</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 rounded-xl shadow-md flex flex-col gap-4 w-full max-w-sm"
      >
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

      <div className="mt-6">
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 py-2 px-6 rounded font-semibold hover:opacity-90"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
