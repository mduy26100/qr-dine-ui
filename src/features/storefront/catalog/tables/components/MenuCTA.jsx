import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const MenuCTA = ({ merchantId, qrCodeToken }) => {
  const navigate = useNavigate();

  const handleNavigateToMenu = () => {
    navigate(`/storefront/${merchantId}/table/${qrCodeToken}/menu`);
  };

  return (
    <div className="py-4">
      <Button
        type="primary"
        size="large"
        className="w-full bg-gradient-to-r from-orange-500 to-red-600 border-none font-bold h-16 text-lg rounded-2xl shadow-lg shadow-orange-200"
        onClick={handleNavigateToMenu}
      >
        ✏️ Xem Menu - Gọi Món
      </Button>
    </div>
  );
};

export default MenuCTA;
