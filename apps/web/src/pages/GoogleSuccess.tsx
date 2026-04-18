import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      // ✅ void the promise — navigate returns a Promise
      void navigate('/', { replace: true });
    } else {
      void navigate('/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Logging in with Google...</p>
    </div>
  );
};

export default GoogleSuccess;
