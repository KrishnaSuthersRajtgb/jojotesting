import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendOtp, verifyOtp } from '../services/auth.service';

interface OtpLocationState {
  phone?: string;
}

const Otp: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as OtpLocationState | null;
  const phone = state?.phone ?? '+91 98765 43210';

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [timer, setTimer] = useState<number>(45);
  const [loading, setLoading] = useState<boolean>(false);
  const [resending, setResending] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete 6-digit OTP');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await verifyOtp(phone, otpString);
      void navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer !== 0) return;

    try {
      setError('');
      setResending(true);
      await sendOtp(phone);
      setTimer(45);
      setOtp(new Array(6).fill(''));
      inputs.current[0]?.focus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="primary-color text-white px-6 py-4 text-lg font-semibold">
          Verify Your Number
        </div>

        <div className="px-6 py-10 text-center">
          <div className="text-5xl mb-4">📲</div>

          <h2 className="text-2xl font-bold mb-2">OTP Sent!</h2>
          <p className="text-gray-600 mb-6">
            We sent a 6-digit code to <br />
            <span className="font-semibold">{phone}</span>
          </p>

          {/* OTP BOXES */}
          <div className="flex justify-center gap-3 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                onChange={(e) => {
                  handleChange(e.target.value, index);
                }}
                onKeyDown={(e) => {
                  handleKeyDown(e, index);
                }}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg border-2 border-gray-300 rounded-md focus:border-blue-600 focus:outline-none"
              />
            ))}
          </div>

          {/* ERROR MESSAGE */}
          {error ? <p className="text-red-500 text-sm mb-4">{error}</p> : <div className="mb-4" />}

          <button
            onClick={() => {
              void handleVerify();
            }}
            disabled={loading}
            className="w-full primary-color text-white py-3 rounded-md text-lg font-semibold mb-4 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>

          <p className="text-gray-600">
            Didn&apos;t receive code?{' '}
            <span
              onClick={() => {
                void handleResend();
              }}
              className={`font-medium cursor-pointer ${
                timer === 0 && !resending ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              {resending
                ? 'Sending...'
                : timer === 0
                  ? 'Resend OTP'
                  : `Resend in 0:${timer < 10 ? `0${String(timer)}` : String(timer)}`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Otp;
