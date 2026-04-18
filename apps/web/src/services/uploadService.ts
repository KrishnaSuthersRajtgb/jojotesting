import { UploadResponse, BulkUploadResponse } from '../types/admin.types';

const BASE = '/api/admin';

interface ImageListResponse {
  images: { key: string; url: string; category: string }[];
}

interface DeleteResponse {
  success: boolean;
  message?: string;
}

export const uploadSingleImage = async (file: File, category: string): Promise<UploadResponse> => {
  const form = new FormData();
  form.append('image', file);
  form.append('category', category);
  const res = await fetch(`${BASE}/upload`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Upload failed');
  return res.json() as Promise<UploadResponse>;
};

export const uploadBulkImages = async (
  files: File[],
  category: string,
): Promise<BulkUploadResponse> => {
  const form = new FormData();
  form.append('category', category);
  files.forEach((f) => { form.append('images', f); });
  const res = await fetch(`${BASE}/upload-bulk`, { method: 'POST', body: form });
  if (!res.ok) throw new Error('Bulk upload failed');
  return res.json() as Promise<BulkUploadResponse>;
};

export const getUploadedImages = async (category = ''): Promise<ImageListResponse> => {
  const res = await fetch(`${BASE}/images?category=${category}`);
  if (!res.ok) throw new Error('Fetch failed');
  return res.json() as Promise<ImageListResponse>;
};

export const deleteImage = async (key: string): Promise<DeleteResponse> => {
  const res = await fetch(`${BASE}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  });
  if (!res.ok) throw new Error('Delete failed');
  return res.json() as Promise<DeleteResponse>;
};