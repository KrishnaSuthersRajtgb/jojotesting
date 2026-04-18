import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn, getSession } from '../services/auth.service';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    const check = async () => {
      const user = await getSession();
      if (user) {
        void navigate('/');
      } else {
        setCheckingSession(false);
      }
    };
    void check();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = form;

    if (!email || !password) {
      alert('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
      void navigate('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 mt-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="primary-color text-white px-6 py-4 text-lg font-semibold">Welcome Back</div>

        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold mb-2">Sign in to your account</h2>

          <div className="mb-5 mt-6">
            <label className="block text-sm font-semibold mb-2">EMAIL</label>
            <input
              name="email"
              type="email"
              placeholder="priya@email.com"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-semibold mb-2">PASSWORD</label>
            <input
              name="password"
              type="password"
              placeholder="Your password"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-right mb-6">
            <Link
              to="/forgotpassword"
              className="text-blue-600 text-sm cursor-pointer hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            onClick={() => void handleLogin()}
            disabled={loading}
            className="w-full primary-color text-white py-3 rounded-md text-lg font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <a
            href="http://localhost:3001/api/google"
            className="w-full border py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-100"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
