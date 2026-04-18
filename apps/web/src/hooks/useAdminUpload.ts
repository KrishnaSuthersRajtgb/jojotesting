import { useState, useCallback } from 'react';
import { ProductCategory, ProductForm } from '../types/admin.types';
import { LocalProduct, saveLocalProduct, buildProduct } from '../services/localProductService';
import { S3_CONFIG } from '../lib/s3Config';

const MAX_IMAGES = 7;

interface State {
  uploading: boolean;
  uploaded: LocalProduct[];
  errors: string[];
}

export const useAdminUpload = () => {
  const [state, setState] = useState<State>({
    uploading: false,
    uploaded: [],
    errors: [],
  });

  const validate = (files: File[]): string[] => {
    const errs: string[] = [];

    if (files.length > MAX_IMAGES) {
      errs.push(`Max ${String(MAX_IMAGES)} images allowed. You selected ${String(files.length)}.`);
      return errs;
    }

    files.forEach((f) => {
      if (!S3_CONFIG.ALLOWED_TYPES.includes(f.type)) errs.push(`${f.name}: Only JPG/PNG/WEBP`);
      if (f.size > S3_CONFIG.MAX_FILE_SIZE) errs.push(`${f.name}: Max 5MB`);
    });

    return errs;
  };

  const upload = useCallback(
    async (files: File[], category: ProductCategory, form: ProductForm) => {
      const errors = validate(files);
      if (errors.length) {
        setState((p) => ({ ...p, errors }));
        return;
      }

      setState((p) => ({ ...p, uploading: true, errors: [] }));

      try {
        const imageUrls = await Promise.all(
          files.map(
            (file) =>
              new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                  resolve(reader.result as string);
                };
                reader.onerror = () => {
                  reject(new Error('File read failed'));
                };
                reader.readAsDataURL(file);
              }),
          ),
        );

        const product = buildProduct(form, category, imageUrls);
        saveLocalProduct(product);

        setState((p) => ({
          ...p,
          uploading: false,
          uploaded: [product, ...p.uploaded],
        }));
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Upload failed';
        setState((p) => ({
          ...p,
          uploading: false,
          errors: [message],
        }));
      }
    },
    [],
  );

  const reset = () => {
    setState({ uploading: false, uploaded: [], errors: [] });
  };

  return { ...state, upload, reset };
};
