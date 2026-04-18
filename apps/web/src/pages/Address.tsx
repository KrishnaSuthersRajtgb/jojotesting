import React, { useEffect, useState } from 'react';
import { getSession } from '../services/auth.service.js'; // ✅ adjust path if needed

interface AddressForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

const defaultForm: AddressForm = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: 'Tamil Nadu',
  pincode: '',
  phone: '',
};

const API_BASE = 'http://localhost:3001/api';

const Address: React.FC = () => {
  const [form, setForm] = useState<AddressForm>(defaultForm);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<AddressForm>(defaultForm);
  const [showSaved, setShowSaved] = useState(false);
  const [sessionEmail, setSessionEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<keyof AddressForm, string>>>({});

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      // ✅ Use authService getSession instead of raw fetch
      try {
        const user = await getSession();
        if (user?.email) {
          setSessionEmail(user.email);
        }
      } catch (error) {
        console.error('fetchSession error:', error);
      } finally {
        setEmailLoading(false);
      }

      // Fetch saved address
      try {
        const res = await fetch(`${API_BASE}/address`, {
          credentials: 'include',
        });
        if (!res.ok) return;
        const data = (await res.json()) as AddressForm | null;
        if (data) {
          setForm(data);
          setEditForm(data);
        }
      } catch (error) {
        console.error('fetchAddress error:', error);
      }
    };
    void fetchData();
  }, []);

  const handleEdit = () => {
    setEditForm({ ...form });
    setErrors({});
    setIsEditing(true);
    setShowSaved(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({ ...form });
    setErrors({});
  };

  const set = (key: keyof AddressForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (key === 'phone') {
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setEditForm((prev) => ({ ...prev, phone: digits }));
      setErrors((prev) => ({ ...prev, phone: undefined }));
      return;
    }

    if (key === 'pincode') {
      const digits = value.replace(/\D/g, '').slice(0, 6);
      setEditForm((prev) => ({ ...prev, pincode: digits }));
      setErrors((prev) => ({ ...prev, pincode: undefined }));
      return;
    }

    setEditForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AddressForm, string>> = {};

    if (!editForm.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!editForm.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!editForm.address.trim()) newErrors.address = 'Address is required';
    if (!editForm.city.trim()) newErrors.city = 'City is required';
    if (!editForm.state.trim()) newErrors.state = 'State is required';

    if (!editForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (editForm.phone.replace(/\D/g, '').length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }

    if (!editForm.pincode.trim()) {
      newErrors.pincode = 'PIN code is required';
    } else if (editForm.pincode.replace(/\D/g, '').length !== 6) {
      newErrors.pincode = 'PIN code must be exactly 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (): Promise<void> => {
    if (!validate()) return;

    try {
      const payload = { ...editForm, email: sessionEmail || editForm.email };

      const res = await fetch(`${API_BASE}/address`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert('Failed to save address');
        return;
      }

      const saved = (await res.json()) as AddressForm;
      setForm(saved);
      setEditForm(saved);
      setIsEditing(false);
      setShowSaved(true);
      setTimeout(() => {
        setShowSaved(false);
      }, 3000);
    } catch (error) {
      console.error('saveAddress error:', error);
      alert('Failed to save address');
    }
  };

  const displayEmail = sessionEmail || form.email;

  const initials = ((form.firstName[0] ?? '') + (form.lastName[0] ?? '')).toUpperCase() || '?';

  const fullName = [form.firstName, form.lastName].filter(Boolean).join(' ') || 'No name set';

  const addressLine = [form.address, form.apartment].filter(Boolean).join(', ');
  const cityStateLine =
    [form.city, form.state].filter(Boolean).join(', ') + (form.pincode ? ` - ${form.pincode}` : '');

  const inputClass =
    'w-full px-3 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-50 text-stone-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-colors placeholder:text-stone-300';

  const inputErrClass =
    'w-full px-3 py-2.5 text-sm border border-red-400 rounded-lg bg-red-50 text-stone-800 focus:outline-none focus:border-red-500 transition-colors placeholder:text-stone-300';

  const labelClass =
    'block text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-1.5';

  const errMsg = 'text-xs text-red-500 mt-1';

  return (
    <div className="min-h-screen bg-stone-100 flex items-start justify-center px-4 py-25">
      <div className="w-full max-w-lg">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-5 text-sm text-stone-400">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12L12 3l9 9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9" />
          </svg>
          <span>Checkout</span>
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-stone-700 font-medium">Delivery Address</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-4 px-5 py-4 border-b border-stone-100">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-semibold text-base flex-shrink-0 select-none">
              {initials}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold text-stone-800 truncate">{fullName}</p>
              {form.phone && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <svg
                    className="w-3 h-3 text-stone-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.05 1.18 2 2 0 012.02 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                    />
                  </svg>
                  <span className="text-xs text-stone-400">{form.phone}</span>
                </div>
              )}
            </div>

            <button
              onClick={isEditing ? handleCancel : handleEdit}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-stone-600 bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-colors"
            >
              {isEditing ? (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  Cancel
                </>
              ) : (
                <>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                  Edit
                </>
              )}
            </button>
          </div>

          {/* View Mode */}
          {!isEditing && (
            <div className="px-5 divide-y divide-stone-100">
              <div className="flex items-start gap-3.5 py-4">
                <svg
                  className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
                </svg>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-1">
                    Email
                  </p>
                  {emailLoading ? (
                    <p className="text-sm text-stone-300 animate-pulse">Loading...</p>
                  ) : (
                    <p className={`text-sm ${displayEmail ? 'text-stone-700' : 'text-stone-300'}`}>
                      {displayEmail || 'Not set'}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3.5 py-4">
                <svg
                  className="w-4 h-4 text-stone-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  viewBox="0 0 24 24"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-1">
                    Delivery Address
                  </p>
                  {addressLine ? (
                    <>
                      <p className="text-sm text-stone-700">{addressLine}</p>
                      <p className="text-sm text-stone-400 mt-0.5">{cityStateLine}</p>
                    </>
                  ) : (
                    <p className="text-sm text-stone-300">Not set</p>
                  )}
                </div>
              </div>

              {showSaved && (
                <div className="py-3">
                  <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-lg">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Address saved successfully
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Edit Mode */}
          {isEditing && (
            <div className="px-5 py-5 border-t border-stone-100 space-y-4">
              {/* Email — always read-only, always shows session email */}
              <div>
                <label className={labelClass}>Email</label>
                <div className="relative">
                  <input
                    type="email"
                    readOnly
                    tabIndex={-1}
                    value={displayEmail}
                    placeholder={emailLoading ? 'Loading...' : 'Your sign-in email'}
                    className="w-full px-3 py-2.5 text-sm border border-stone-200 rounded-lg bg-stone-100 text-stone-500 cursor-not-allowed pr-24 select-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium text-stone-400 bg-stone-200 px-1.5 py-0.5 rounded select-none">
                    auto-filled
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input
                    type="text"
                    value={editForm.firstName}
                    onChange={set('firstName')}
                    placeholder="First name"
                    className={errors.firstName ? inputErrClass : inputClass}
                  />
                  {errors.firstName && <p className={errMsg}>{errors.firstName}</p>}
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input
                    type="text"
                    value={editForm.lastName}
                    onChange={set('lastName')}
                    placeholder="Last name"
                    className={errors.lastName ? inputErrClass : inputClass}
                  />
                  {errors.lastName && <p className={errMsg}>{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone * (10 digits)</label>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={editForm.phone}
                  onChange={set('phone')}
                  placeholder="9876543210"
                  className={errors.phone ? inputErrClass : inputClass}
                />
                {errors.phone && <p className={errMsg}>{errors.phone}</p>}
              </div>

              <div>
                <label className={labelClass}>Street Address *</label>
                <input
                  type="text"
                  value={editForm.address}
                  onChange={set('address')}
                  placeholder="123 Main Street"
                  className={errors.address ? inputErrClass : inputClass}
                />
                {errors.address && <p className={errMsg}>{errors.address}</p>}
              </div>

              <div>
                <label className={labelClass}>
                  Apartment / Floor{' '}
                  <span className="normal-case tracking-normal text-stone-300 font-normal">
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={editForm.apartment}
                  onChange={set('apartment')}
                  placeholder="Apt 2B, 3rd floor…"
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>City *</label>
                  <input
                    type="text"
                    value={editForm.city}
                    onChange={set('city')}
                    placeholder="City"
                    className={errors.city ? inputErrClass : inputClass}
                  />
                  {errors.city && <p className={errMsg}>{errors.city}</p>}
                </div>
                <div>
                  <label className={labelClass}>State *</label>
                  <input
                    type="text"
                    value={editForm.state}
                    onChange={set('state')}
                    placeholder="State"
                    className={errors.state ? inputErrClass : inputClass}
                  />
                  {errors.state && <p className={errMsg}>{errors.state}</p>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className={labelClass}>PIN Code * (6 digits)</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={editForm.pincode}
                    onChange={set('pincode')}
                    placeholder="600001"
                    className={errors.pincode ? inputErrClass : inputClass}
                  />
                  {errors.pincode && <p className={errMsg}>{errors.pincode}</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={() => {
                    void handleSave();
                  }}
                  className="flex-1 py-2.5 text-sm font-medium bg-stone-800 text-white rounded-lg hover:bg-stone-900 transition-colors"
                >
                  Save Address
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 text-sm text-stone-500 border border-stone-200 rounded-lg hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-stone-400 mt-4">
          Your address is saved securely to your account.
        </p>
      </div>
    </div>
  );
};

export default Address;
