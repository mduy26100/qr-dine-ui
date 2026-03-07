import React from "react";
import { Image, Skeleton } from "antd";
import { PlusIcon } from "@heroicons/react/24/outline";

const ProductCard = ({ product, onAddClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <Skeleton.Avatar active size={200} shape="square" />
        <div className="p-3 space-y-2">
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          preview={false}
          className="w-full h-full object-cover"
        />
        <button
          onClick={() => onAddClick(product)}
          className="absolute bottom-2 right-2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg active:scale-95 transition-all duration-200"
        >
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-gray-600 line-clamp-1">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between pt-1">
          <span className="text-orange-600 font-bold text-sm">
            ₫{product.price.toLocaleString("vi-VN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
