import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Product } from '../types/product';
import { LocalProduct, getLocalProducts } from '../services/localProductService';
import { ArrowLeft } from 'lucide-react';
import { addToCart } from '../services/cartService';
import { getGirlsReadymadeProducts } from '../services/productService';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const state = location.state as { product?: Product; search?: string } | null;

  const [product, setProduct] = useState<Product | undefined>(
    state?.product ?? (state as Product | null) ?? undefined,
  );

  const [selectedImage, setSelectedImage] = useState<string>(product?.image ?? '');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedChest, setSelectedChest] = useState<string | null>(null);
  const [selectedWaist, setSelectedWaist] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      return;
    }

    const loadProduct = () => {
      let foundProduct: Product | undefined;

      // search both local products and readymade products
      const allProducts = [...getLocalProducts(), ...getGirlsReadymadeProducts()];

      if (state?.search) {
        const searchText = state.search.toLowerCase();
        foundProduct = allProducts.find((p) => p.name.toLowerCase().includes(searchText));
      }

      if (!foundProduct && id) {
        foundProduct = allProducts.find((p) => p.id === Number(id));
      }

      setProduct(foundProduct);
      if (foundProduct) setSelectedImage(foundProduct.image);
    };

    loadProduct();
  }, [id, state, product]);

  if (!product) {
    return <div className="flex items-center justify-center h-screen">Product not found</div>;
  }

  // ✅ Safe check — LocalProduct has images[], Product does not
  const localProduct = product as LocalProduct;
  const images: string[] =
    Array.isArray(localProduct.images) && localProduct.images.length > 0
      ? localProduct.images
      : [product.image];

  const handleAddToCart = () => {
    if (!selectedSize && !selectedChest && !selectedWaist) {
      alert('Please select size');
      return;
    }
    const size = selectedSize ?? `${selectedChest ?? ''}-${selectedWaist ?? ''}`;
    void addToCart(product, size); // ✅ add void
    alert('Product added to cart');
  };

  const handlePlaceOrder = () => {
    if (!selectedSize && !selectedChest && !selectedWaist) {
      alert('Please select size');
      return;
    }
    const size = selectedSize ?? `${selectedChest ?? ''}-${selectedWaist ?? ''}`;
    void navigate('/place-order', {
      state: {
        product,
        size,
      },
    });
  };

  const sizeChart = [
    { size: 'XS', chest: 32, waist: 28 },
    { size: 'S', chest: 34, waist: 30 },
    { size: 'M', chest: 36, waist: 32 },
    { size: 'L', chest: 38, waist: 34 },
    { size: 'XL', chest: 40, waist: 36 },
    { size: 'XXL', chest: 42, waist: 38 },
  ];

  return (
    <div className="min-h-screen bg-white px-4 md:px-10 py-9">
      <button
        onClick={() => {
          void navigate(-1);
        }}
        className="flex items-center gap-2 mb-6 text-gray-700 hover:text-black"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT */}
        <div className="flex flex-col md:flex-row gap-4 md:h-[calc(100vh-120px)] md:overflow-y-auto no-scrollbar">
          <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-y-auto no-scrollbar">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                onClick={() => {
                  setSelectedImage(img);
                }}
                className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded cursor-pointer border ${
                  selectedImage === img ? 'border-black' : 'border-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="flex-1 relative order-1 md:order-2">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-[350px] md:h-[520px] object-cover rounded"
            />

            <div className="mt-6 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 border primary-color text-white py-3 rounded-lg font-medium"
              >
                Add to Cart
              </button>

              <button
                onClick={handlePlaceOrder}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 rounded-lg font-medium"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="md:h-[calc(100vh-120px)] md:overflow-y-auto pr-2 no-scrollbar">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">{product.name}</h1>

          <p className="text-2xl mt-2 font-semibold text-gray-900">₹{product.price}</p>

          <div className="mt-8">
            <h3 className="font-medium mb-3">Select Size</h3>

            <div className="flex gap-3 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                  }}
                  className={`px-4 py-2 rounded border text-sm font-medium ${
                    selectedSize === size
                      ? 'bg-black text-white border-black'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* SIZE CHART */}
          <div className="mt-10 overflow-x-auto">
            <h3 className="font-semibold mb-3">Size Chart</h3>

            <table className="w-full border border-gray-200 text-center text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">Size</th>
                  <th className="p-3 border">Chest</th>
                  <th className="p-3 border">Waist</th>
                </tr>
              </thead>

              <tbody>
                {sizeChart.map((row) => (
                  <tr key={row.size}>
                    <td className="p-3 border">{row.size}</td>

                    <td
                      onClick={() => {
                        setSelectedChest(row.size);
                      }}
                      className={`p-3 border cursor-pointer ${
                        selectedChest === row.size ? 'bg-purple-100' : ''
                      }`}
                    >
                      {row.chest}
                    </td>

                    <td
                      onClick={() => {
                        setSelectedWaist(row.size);
                      }}
                      className={`p-3 border cursor-pointer ${
                        selectedWaist === row.size ? 'bg-purple-100' : ''
                      }`}
                    >
                      {row.waist}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Shipping</h3>
            <p className="text-gray-600 text-sm">
              Free shipping within 5-7 business days. Easy returns within 7 days.
            </p>
          </div>

          <div className="mt-6 pb-10">
            <h3 className="font-semibold mb-2">Product Details</h3>
            <p className="text-gray-600 text-sm">
              {product.description ??
                'Premium quality fabric with modern stitching and elegant finish.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
