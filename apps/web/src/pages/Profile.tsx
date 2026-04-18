import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp, signOut, getSession } from '../services/auth.service';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const check = async () => {
      try {
        const user = await getSession();
        if (user) setLoggedInUser(user);
      } catch {
        // session invalid
      } finally {
        setCheckingSession(false);
      }
    };
    void check();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, email, phone, password } = form;

    if (!name || !email || !password) {
      alert('Please fill name, email and password');
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters');
      return;
    }
    if (phone && phone.length < 10) {
      alert('Please enter a valid phone number');
      return;
    }

    try {
      setLoading(true);
      await signUp(name, email, password, phone);
      alert('Account created successfully ✅');
      void navigate('/otp', { state: { phone } });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setLoggedInUser(null);
    void navigate('/login');
  };

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (loggedInUser) {
    // ✅ name is string (non-nullable) — no need for ?. or ??
    const avatarLetter = loggedInUser.name.charAt(0).toUpperCase();

    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="primary-color text-white px-6 py-4 text-lg font-semibold text-center">
            My Account
          </div>

          <div className="px-6 sm:px-8 py-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full primary-color flex items-center justify-center text-white text-3xl font-bold">
                {avatarLetter}
              </div>
            </div>

            <div className="space-y-4">
              <div className="border rounded-md px-4 py-3">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Full Name</p>
                {/* ✅ name is string — no fallback needed */}
                <p className="text-gray-800 font-medium">{loggedInUser.name}</p>
              </div>

              <div className="border rounded-md px-4 py-3">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Email</p>
                <div className="flex items-center justify-between">
                  <p className="text-gray-800 font-medium">{loggedInUser.email}</p>
                  {/* ✅ emailVerified is boolean | undefined — plain if is fine */}
                  {loggedInUser.emailVerified ? (
                    <span className="text-xs text-green-600 font-semibold">✓ Verified</span>
                  ) : (
                    <span className="text-xs text-orange-500 font-semibold">Not verified</span>
                  )}
                </div>
              </div>

              <div className="border rounded-md px-4 py-3">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Phone</p>
                <p className="text-gray-800 font-medium">
                  {/* ✅ phone is string | undefined — simple ternary */}
                  {loggedInUser.phone ? (
                    loggedInUser.phone
                  ) : (
                    <span className="text-gray-400 italic">Not provided</span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => void handleSignOut()}
              className="w-full mt-8 border-2 border-red-500 text-red-500 py-3 rounded-md font-semibold hover:bg-red-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-lg overflow-hidden">
        <div className="primary-color text-white px-6 py-4 text-lg font-semibold text-center">
          Create Account
        </div>

        <div className="px-6 sm:px-8 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6">
            Join JoJo Flora
          </h1>

          <div className="mb-4">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              name="phone"
              type="tel"
              placeholder="Phone (optional)"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <input
              name="password"
              type="password"
              placeholder="Password (min 8 characters)"
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={() => void handleSubmit()}
            disabled={loading}
            className="w-full primary-color text-white py-3 rounded-md font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Account'}
          </button>

          <p className="text-center mt-5 text-sm sm:text-base">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
