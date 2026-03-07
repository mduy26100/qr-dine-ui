import React from "react";
import { useParams } from "react-router-dom";
import { Spin, message, Empty } from "antd";
import { MapPinIcon } from "@heroicons/react/24/outline";
import {
  ActionButtonsGrid,
  MenuCTA,
  StorefrontBanner,
  useTableInfoPageController,
} from "../../features/storefront/catalog/tables";
import { useStorefrontTable } from "../../app/providers";
import {
  STOREFRONT_ACTION_BUTTONS,
  STOREFRONT_BANNERS,
} from "../../features/storefront/catalog";

const TableInfoPage = () => {
  const { merchantId, qrCodeToken } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { setSessionInfo } = useStorefrontTable();

  const { isLoading, tableInfo, currentGreeting } = useTableInfoPageController({
    merchantId,
    qrCodeToken,
    onOpenMessage: (config) => messageApi.open(config),
    setSessionInfo,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Spin size="large" tip="Đang tải thông tin..." />
      </div>
    );
  }

  if (!tableInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Empty
          description="Không tìm thấy thông tin bàn"
          style={{ padding: "40px" }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {contextHolder}

      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-4 md:p-6">
        <div className="max-w-md mx-auto md:max-w-full">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900">
            {tableInfo.merchantName}
          </h1>
          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
            <MapPinIcon className="w-4 h-4" />
            <span className="truncate">{tableInfo.merchantAddress}</span>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto md:max-w-full px-4 md:px-6 space-y-6 py-6">
        <StorefrontBanner banners={STOREFRONT_BANNERS} />

        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-3xl">{currentGreeting.icon}</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {currentGreeting.message} Quý khách
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 ml-12">
              Chúng tôi sẽ trả đồ cho bạn tại bàn:{" "}
              <span className="font-bold text-amber-700">
                {tableInfo.tableName}
              </span>
            </p>
          </div>
        </div>

        <ActionButtonsGrid buttons={STOREFRONT_ACTION_BUTTONS} />

        <MenuCTA merchantId={merchantId} qrCodeToken={qrCodeToken} />

        <div className="text-center py-8 text-xs text-gray-400 select-none">
          <p>
            Powered by{" "}
            <span className="font-semibold text-gray-500">DUYDM</span>
          </p>
          <a
            href="https://www.facebook.com/zuynuxi/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600 transition"
          >
            Triển khai hệ thống cho nhà hàng của bạn – Liên hệ tại đây
          </a>
        </div>
      </div>
    </div>
  );
};

export default TableInfoPage;
