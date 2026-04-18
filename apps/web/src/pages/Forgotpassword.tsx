import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      alert('Please enter your registered email');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Enter valid email address');
      return;
    }

    try {
      setLoading(true);
      // ✅ /api/user not /api/auth — avoids better-auth conflict
      const res = await fetch('http://localhost:3001/api/user/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json()) as { success: boolean; message: string };

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setSuccess(true);
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="primary-color text-white px-6 py-4 text-lg font-semibold">
          Reset Password
        </div>

        <div className="px-6 py-10 text-center">
          <div className="text-5xl mb-4">🔑</div>

          <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Enter your registered email address and we'll send a reset link.
          </p>

          <div className="mb-6 text-left">
            <label className="block text-sm font-semibold mb-2">REGISTERED EMAIL</label>
            <input
              type="email"
              placeholder="priya@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={success}
            />
          </div>

          <button
            onClick={() => {
              void handleSubmit();
            }}
            disabled={loading || success}
            className="w-full primary-color text-white py-3 rounded-md text-lg font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          {success && (
            <p className="text-green-600 text-sm mt-4">
              ✅ Reset link sent! Check your email inbox.
            </p>
          )}

          <p className="text-gray-600 mt-6 text-sm sm:text-base">
            Remember password?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
