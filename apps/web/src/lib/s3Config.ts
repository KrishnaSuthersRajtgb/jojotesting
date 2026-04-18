export const S3_CONFIG = {
  BUCKET_NAME: 'girls-clothing-bucket',
  REGION: 'ap-south-1',
  CLOUDFRONT_URL: 'https://YOUR_ID.cloudfront.net', // ← replace
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
};
