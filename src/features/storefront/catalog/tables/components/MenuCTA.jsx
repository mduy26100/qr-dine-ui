import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const MenuCTA = ({ merchantId, qrCodeToken }) => {
  const navigate = useNavigate();

  const handleNavigateToMenu = () => {
    navigate(`/storefront/${merchantId}/table/${qrCodeToken}/menu`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 bg-white border-t border-gray-100 z-20">
      <div className="max-w-md mx-auto md:max-w-full">
        <Button
          type="primary"
          size="large"
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 border-none font-bold h-14 text-base md:text-lg rounded-xl hover:!from-orange-600 hover:!to-red-700"
          onClick={handleNavigateToMenu}
        >
          ✏️ Xem Menu - Gọi Món
        </Button>
      </div>
    </div>
  );
};

export default MenuCTA;
