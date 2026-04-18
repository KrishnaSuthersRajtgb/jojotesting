import React, { useRef, useState } from 'react';
import { ProductCategory, CATEGORIES } from '../../types/admin.types';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const MAX_IMAGES = 7;

interface ProductForm {
  name: string;
  price: string;
  originalPrice: string;
  sizes: string[];
  description: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  originalPrice?: string;
  sizes?: string;
  description?: string;
  images?: string;
}

interface Props {
  onUpload: (
    files: File[],
    category: ProductCategory,
    productData: ProductForm,
  ) => void | Promise<void>;
  uploading: boolean;
}

const ImageUploadCard: React.FC<Props> = ({ onUpload, uploading }) => {
  const [category, setCategory] = useState<ProductCategory>('dresses');
  const [previews, setPreviews] = useState<{ url: string; name: string }[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const inputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<ProductForm>({
    name: '',
    price: '',
    originalPrice: '',
    sizes: [],
    description: '',
  });

  const handleFiles = (selected: File[]) => {
    const combined = [...files, ...selected];

    if (combined.length > MAX_IMAGES) {
      setErrors((prev) => ({
        ...prev,
        images: `Max ${String(MAX_IMAGES)} images allowed. You have ${String(combined.length)}.`,
      }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.images;
      return next;
    });

    setFiles(combined);
    setPreviews(combined.map((f) => ({ url: URL.createObjectURL(f), name: f.name })));
  };

  const toggleSize = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Product name is required';
    if (!form.price) newErrors.price = 'Price is required';
    if (isNaN(Number(form.price)) || Number(form.price) <= 0) newErrors.price = 'Enter valid price';
    if (files.length === 0) newErrors.description = 'Please select at least 1 image';
    if (form.sizes.length === 0) newErrors.sizes = 'Select at least one size';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    void Promise.resolve(onUpload(files, category, form));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
      <h2 className="text-lg font-semibold text-gray-800">📸 Add New Product</h2>

      {/* Product Name */}
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">
          Product Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Floral Summer Dress"
          value={form.name}
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Price Row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Selling Price (₹) <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 999"
            value={form.price}
            onChange={(e) => {
              setForm({ ...form, price: e.target.value });
            }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          {errors.price && <p className="text-red-400 text-xs mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">
            Original Price (₹)
            <span className="text-gray-400 text-xs ml-1">(optional)</span>
          </label>
          <input
            type="number"
            placeholder="e.g. 1499"
            value={form.originalPrice}
            onChange={(e) => {
              setForm({ ...form, originalPrice: e.target.value });
            }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>
      </div>

      {/* Discount Preview */}
      {form.price && form.originalPrice && Number(form.originalPrice) > Number(form.price) && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2">
          <span className="text-green-600 text-sm font-medium">
            🏷️{' '}
            {String(
              Math.round(
                ((Number(form.originalPrice) - Number(form.price)) / Number(form.originalPrice)) *
                  100,
              ),
            )}
            % OFF
          </span>
          <span className="text-gray-400 text-xs line-through">₹{form.originalPrice}</span>
          <span className="text-gray-800 text-sm font-semibold">₹{form.price}</span>
        </div>
      )}

      {/* Category */}
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as ProductCategory);
          }}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Sizes */}
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-2">
          Available Sizes <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => {
                toggleSize(size);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition ${
                form.sizes.includes(size)
                  ? 'bg-pink-500 text-white border-pink-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-pink-300'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
        {errors.sizes && <p className="text-red-400 text-xs mt-1">{errors.sizes}</p>}
        {form.sizes.length > 0 && (
          <p className="text-xs text-gray-400 mt-1">Selected: {form.sizes.join(', ')}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">
          Description
          <span className="text-gray-400 text-xs ml-1">(optional)</span>
        </label>
        <textarea
          placeholder="Fabric, style, occasion details..."
          value={form.description}
          onChange={(e) => {
            setForm({ ...form, description: e.target.value });
          }}
          rows={2}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
        />
      </div>

      {/* Image Drop Zone */}
      <div>
        <label className="text-sm font-medium text-gray-600 block mb-1">
          Product Images <span className="text-red-400">*</span>
          <span className="text-gray-400 text-xs ml-1">(up to {MAX_IMAGES} angles)</span>
        </label>
        <div
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(Array.from(e.dataTransfer.files));
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-pink-200 rounded-xl p-6 text-center
                     cursor-pointer hover:bg-pink-50 transition"
        >
          <p className="text-3xl mb-1">📁</p>
          <p className="text-sm text-gray-500">
            Drag & drop or <span className="text-pink-500 font-medium">browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            JPG, PNG, WEBP • Max 5MB each • Up to {MAX_IMAGES} photos
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              handleFiles(Array.from(e.target.files ?? []));
            }}
            className="hidden"
          />
        </div>
        {errors.images && <p className="text-red-400 text-xs mt-1">{errors.images}</p>}
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
      </div>

      {/* Image Previews */}
      {previews.length > 0 && (
        <div>
          <p className="text-xs text-gray-400 mb-2">
            {previews.length} / {MAX_IMAGES} image(s) selected
          </p>
          <div className="grid grid-cols-3 gap-2">
            {previews.map((p, i) => (
              <div key={i} className="relative group">
                <img
                  src={p.url}
                  alt={p.name}
                  className="w-full h-24 object-cover rounded-lg border border-gray-100"
                />
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                    Main
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviews((prev) => prev.filter((_, j) => j !== i));
                    setFiles((prev) => prev.filter((_, j) => j !== i));
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full
                             w-5 h-5 text-xs hidden group-hover:flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={uploading}
        className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold
                   hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {uploading ? '⏳ Uploading...' : `🚀 Upload ${String(files.length || 0)} Image(s) to S3`}
      </button>
    </div>
  );
};

export default ImageUploadCard;
