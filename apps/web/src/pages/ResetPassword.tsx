import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');

    if (!password || !confirm) {
      setError('Both fields are required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:3001/api/user/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = (await res.json()) as { success: boolean; message: string };

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      setSuccess(true);
      // ✅ redirect to login after 2 seconds
      setTimeout(() => {
        void navigate('/login');
      }, 2000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        {/* ✅ same blue header as ForgotPassword */}
        <div className="primary-color text-white px-6 py-4 text-lg font-semibold">
          Reset Password
        </div>

        <div className="px-6 py-10 text-center">
          <div className="text-5xl mb-4">🔐</div>

          <h2 className="text-2xl font-bold mb-2">Create New Password</h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            Enter and confirm your new password below.
          </p>

          {/* ✅ new password field */}
          <div className="mb-4 text-left">
            <label className="block text-sm font-semibold mb-2">NEW PASSWORD</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={success}
            />
          </div>

          {/* ✅ confirm password field */}
          <div className="mb-6 text-left">
            <label className="block text-sm font-semibold mb-2">CONFIRM PASSWORD</label>
            <input
              type="password"
              placeholder="Repeat your new password"
              value={confirm}
              onChange={(e) => {
                setConfirm(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={success}
            />
          </div>

          {/* ✅ error message */}
          {error && <p className="text-red-500 text-sm mb-4">❌ {error}</p>}

          <button
            onClick={() => {
              void handleSubmit();
            }}
            disabled={loading || success}
            className="w-full primary-color text-white py-3 rounded-md text-lg font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>

          {/* ✅ success message */}
          {success && (
            <p className="text-green-600 text-sm mt-4">
              ✅ Password reset successfully! Redirecting to login...
            </p>
          )}

          <p className="text-gray-600 mt-6 text-sm sm:text-base">
            Remember your password?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
