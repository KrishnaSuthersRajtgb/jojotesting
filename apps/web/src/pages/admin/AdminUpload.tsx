import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploadCard from '../../components/admin/ImageUploadCard';
import { useAdminUpload } from '../../hooks/useAdminUpload';

const AdminUpload: React.FC = () => {
  const { uploading, uploaded, errors, upload, reset } = useAdminUpload();

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Upload Products</h1>
          <p className="text-sm text-gray-400 mt-1">Add new products with up to 7 photos each</p>
        </div>

        <ImageUploadCard
          onUpload={(files, category, form) => {
            void upload(files, category, form);
          }}
          uploading={uploading}
        />

        {errors.length > 0 && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-600 font-medium text-sm mb-1">❌ Upload Errors:</p>
            {errors.map((e, i) => (
              <p key={i} className="text-xs text-red-500">
                {e}
              </p>
            ))}
          </div>
        )}

        {uploaded.length > 0 && (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <p className="text-green-700 font-semibold text-sm">
                ✅ {uploaded.length} product(s) uploaded!
              </p>
              <button onClick={reset} className="text-xs text-gray-400 hover:text-gray-600">
                Clear
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {uploaded.map((product) => (
                <div key={product.id} className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                  <p className="text-[10px] text-gray-400 truncate mt-1">{product.name}</p>
                  <p className="text-[10px] text-gray-300 truncate">
                    {product.images.length} photo(s)
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUpload;
