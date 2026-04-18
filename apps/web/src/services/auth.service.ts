interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

interface AuthResponse {
  token?: string;
  user?: AuthUser;
  message?: string;
  error?: string;
}

interface SessionResponse {
  user?: AuthUser;
  session?: { id: string };
}

// ✅ typed payload so no unsafe any access
interface JWTPayload {
  id: string;
  email: string;
  name: string;
  phone?: string;
  emailVerified?: boolean;
  createdAt?: string;
}

const BASE_URL = 'http://localhost:3001/api/auth';

const decodeJWT = (token: string): AuthUser | null => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const decoded = JSON.parse(atob(payload)) as JWTPayload;
    if (!decoded.id || !decoded.email) return null;
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      phone: decoded.phone,
      emailVerified: decoded.emailVerified,
      createdAt: decoded.createdAt,
    };
  } catch {
    return null;
  }
};

export const signUp = async (
  name: string,
  email: string,
  password: string,
  phone: string,
): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/sign-up/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password, phone }),
  });

  if (!res.ok) {
    const data = (await res.json()) as AuthResponse;
    throw new Error(data.message ?? data.error ?? 'Registration failed');
  }

  return (await res.json()) as AuthResponse;
};

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/sign-in/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = (await res.json()) as AuthResponse;
    throw new Error(data.message ?? data.error ?? 'Login failed');
  }

  return (await res.json()) as AuthResponse;
};

export const signOut = async (): Promise<void> => {
  localStorage.removeItem('token');
  await fetch(`${BASE_URL}/sign-out`, {
    method: 'POST',
    credentials: 'include',
  });
};

export const getSession = async (): Promise<AuthUser | null> => {
  const token = localStorage.getItem('token');
  if (token) {
    const user = decodeJWT(token);
    if (user) return user;
    localStorage.removeItem('token');
  }

  try {
    const res = await fetch(`${BASE_URL}/get-session`, {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) return null;

    // ✅ guard against null response body
    const data = (await res.json()) as SessionResponse | null;
    if (!data) return null;

    return data.user ?? null;
  } catch (error) {
    console.error('Session fetch error:', error);
    return null;
  }
};
export const sendOtp = async (phone: string): Promise<void> => {
  const res = await fetch('http://localhost:3001/api/otp/send-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ phone }),
  });

  if (!res.ok) {
    const data = (await res.json()) as { message?: string };
    throw new Error(data.message ?? 'Failed to send OTP');
  }
};

export const verifyOtp = async (phone: string, otp: string): Promise<void> => {
  const res = await fetch('http://localhost:3001/api/otp/verify-otp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ phone, otp }),
  });

  if (!res.ok) {
    const data = (await res.json()) as { message?: string };
    throw new Error(data.message ?? 'OTP verification failed');
  }
};
