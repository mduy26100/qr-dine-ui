import React, { useState } from "react";
import { Input } from "antd";
import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";

const MenuHeader = ({ onSearchChange, searchValue }) => {
  const navigate = useNavigate();
  const { merchantId, qrCodeToken } = useParams();

  const handleHome = () => {
    navigate(`/storefront/${merchantId}/table/${qrCodeToken}`);
  };

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-100 p-4">
      <div className="flex items-center gap-3">
        <button
          onClick={handleHome}
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <HomeIcon className="w-6 h-6 text-gray-800" />
        </button>
        <Input
          placeholder="Bạn muốn tìm món gì?"
          prefix={<MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-lg bg-gray-50 border-gray-200"
          size="large"
        />
      </div>
    </div>
  );
};

export default MenuHeader;
