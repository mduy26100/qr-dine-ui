import { useEffect, useMemo } from "react";
import { useGetTableInfo } from "./useGetTableInfo";

export const useTableInfoPageController = ({
  merchantId,
  qrCodeToken,
  onOpenMessage,
  setSessionInfo,
}) => {
  const { data: tableInfo, isLoading, error } = useGetTableInfo(
    merchantId,
    qrCodeToken
  );

  const currentGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      return { icon: "🌅", message: "Chào buổi sáng" };
    }
    if (hour >= 11 && hour < 13) {
      return { icon: "☀️", message: "Chào buổi trưa" };
    }
    if (hour >= 13 && hour < 17) {
      return { icon: "🌤️", message: "Chào buổi chiều" };
    }
    if (hour >= 17 && hour < 19) {
      return { icon: "🌆", message: "Chào buổi tối" };
    }
    return { icon: "🌙", message: "Chào buổi tối" };
  }, []);

  useEffect(() => {
    if (tableInfo) {
      setSessionInfo({
        sessionId: tableInfo.sessionId,
        tableId: tableInfo.tableId,
        tableName: tableInfo.tableName,
        merchantId: tableInfo.merchantId,
        merchantName: tableInfo.merchantName,
        merchantAddress: tableInfo.merchantAddress,
        merchantLogoUrl: tableInfo.merchantLogoUrl,
        isOccupied: tableInfo.isOccupied,
      });
    }
  }, [tableInfo, setSessionInfo]);

  useEffect(() => {
    if (error) {
      onOpenMessage({
        type: "error",
        content: "Không thể tải thông tin bàn. Vui lòng thử lại.",
      });
    }
  }, [error, onOpenMessage]);

  return {
    isLoading,
    tableInfo,
    currentGreeting,
  };
};
