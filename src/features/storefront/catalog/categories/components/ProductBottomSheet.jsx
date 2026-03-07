import React, { useState } from "react";
import { Image, Button } from "antd";
import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

const ProductBottomSheet = ({ product, visible, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    onClose();
  };

  if (!visible || !product) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          visible ? "opacity-30" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 z-50 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className="w-full h-1 bg-gray-200 rounded-full mx-auto mt-2 mb-4"
          style={{ width: "40px" }}
        />

        <div className="p-4 space-y-4 max-h-80 overflow-y-auto">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex-1">
              {product.name}
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-lg"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="relative bg-gray-100 aspect-square rounded-2xl overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              preview={false}
              className="w-full h-full object-cover"
            />
          </div>

          {product.description && (
            <p className="text-sm text-gray-600">{product.description}</p>
          )}

          <div className="space-y-3 border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Số lượng</span>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span className="w-8 text-center font-semibold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4 space-y-3">
          <Button
            type="primary"
            size="large"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 border-none font-bold h-12 rounded-xl hover:!from-orange-600 hover:!to-red-700"
            onClick={handleAddToCart}
          >
            Thêm món - ₫{(product.price * quantity).toLocaleString("vi-VN")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductBottomSheet;
