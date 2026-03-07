import React from "react";
import { Button } from "antd";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const CartBar = ({ count, total, onViewCart }) => {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-20">
      <div className="max-w-md mx-auto md:max-w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShoppingBagIcon className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-xs text-gray-600">Tạm tính</p>
            <p className="text-lg font-bold text-gray-900">
              {count} món - ₫{total.toLocaleString("vi-VN")}
            </p>
          </div>
        </div>
        <Button
          type="primary"
          className="flex-shrink-0 bg-orange-600 hover:!bg-orange-700 border-none rounded-lg h-10 px-6"
          onClick={onViewCart}
        >
          Xem đơn
        </Button>
      </div>
    </div>
  );
};

export default CartBar;
