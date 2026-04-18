interface Fast2SMSResponse {
  return: boolean;
  message?: string[];
}

export const sendSmsOtp = async (phone: string, otp: string): Promise<void> => {
  const apiKey = process.env.FAST2SMS_API_KEY;
  if (!apiKey) throw new Error('FAST2SMS_API_KEY is not set');

  // Fast2SMS expects a 10-digit number — strip +91 and spaces
  const normalizedPhone = phone.replace(/^\+91/, '').replace(/\s+/g, '');

  if (normalizedPhone.length !== 10) {
    throw new Error(`Invalid phone number length: ${normalizedPhone}`);
  }

  // ✅ Use query params — Fast2SMS quick route works best this way
  const params = new URLSearchParams({
    authorization: apiKey,
    route: 'q',
    message: `Your JoJo Flora OTP is ${otp}. Valid for 5 minutes. Do not share with anyone.`,
    language: 'english',
    flash: '0',
    numbers: normalizedPhone,
  });

  const res = await fetch(`https://www.fast2sms.com/dev/bulkV2?${params.toString()}`, {
    method: 'GET', // ✅ Quick route uses GET, not POST
    headers: {
      'cache-control': 'no-cache',
    },
  });

  const data = (await res.json()) as Fast2SMSResponse;

  console.log('[Fast2SMS response]', data); // ✅ see full response in terminal

  if (!data.return) {
    throw new Error(data.message?.join(', ') ?? 'Failed to send OTP');
  }
};
