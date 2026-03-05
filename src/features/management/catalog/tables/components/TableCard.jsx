import React, { useState } from "react";
import { Card, Typography, Button, Tooltip, Tag, Image, message } from "antd";
import {
  PencilSquareIcon,
  TrashIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";

const { Text } = Typography;

const TableCard = ({
  item,
  hasManagePermission = true,
  onEdit,
  onDelete,
  onViewQr,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const handlePreviewQr = () => {
    if (!item.qrCodeImageUrl) {
      message.warning("Bàn này chưa có mã QR.");
      return;
    }
    setPreviewOpen(true);
    onViewQr?.(item);
  };

  const actions = hasManagePermission
    ? [
        <div className="flex justify-center items-center w-full" key="qr">
          <Tooltip title="Xem mã QR">
            <Button
              type="text"
              size="large"
              icon={<QrCodeIcon className="w-5 h-5 text-emerald-600" />}
              className="flex items-center justify-center hover:bg-emerald-50 border-none shadow-none"
              onClick={handlePreviewQr}
            />
          </Tooltip>
        </div>,
        <div
          className="flex justify-center items-center w-full border-l border-gray-100"
          key="edit"
        >
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              size="large"
              icon={<PencilSquareIcon className="w-5 h-5 text-indigo-600" />}
              className="flex items-center justify-center hover:bg-indigo-50 border-none shadow-none"
              onClick={() => onEdit?.(item)}
            />
          </Tooltip>
        </div>,
        <div
          className="flex justify-center items-center w-full border-l border-gray-100"
          key="delete"
        >
          <Tooltip title="Xóa">
            <Button
              type="text"
              size="large"
              danger
              icon={<TrashIcon className="w-5 h-5" />}
              className="flex items-center justify-center hover:bg-rose-50 border-none shadow-none"
              onClick={() => onDelete?.(item)}
            />
          </Tooltip>
        </div>,
      ]
    : [
        <div className="flex justify-center items-center w-full" key="qr">
          <Tooltip title="Xem mã QR">
            <Button
              type="text"
              size="large"
              icon={<QrCodeIcon className="w-5 h-5 text-emerald-600" />}
              className="flex items-center justify-center hover:bg-emerald-50 border-none shadow-none w-full"
              onClick={handlePreviewQr}
            />
          </Tooltip>
        </div>,
      ];

  return (
    <>
      <Card
        hoverable
        className="h-full shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden group"
        styles={{
          body: { padding: "24px", textAlign: "center" },
          actions: {
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fafafa",
          },
        }}
        actions={actions}
      >
        <div className="flex flex-col items-center justify-center gap-2 py-2">
          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-2 transition-all duration-300 border group-hover:scale-110 
                        ${
                          item.isOccupied
                            ? "bg-rose-50 border-rose-100 group-hover:bg-rose-100"
                            : "bg-slate-50 border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100"
                        }`}
          >
            <Text
              strong
              className={`text-2xl ${item.isOccupied ? "text-rose-600" : "text-slate-700 group-hover:text-indigo-600"}`}
            >
              {item.name}
            </Text>
          </div>

          <Tag
            color={item.isOccupied ? "error" : "success"}
            className="m-0 border-none px-3 py-1 rounded-full font-medium"
          >
            {item.isOccupied ? "Đang phục vụ" : "Bàn trống"}
          </Tag>
        </div>
      </Card>

      {item.qrCodeImageUrl && (
        <Image
          width={0}
          height={0}
          style={{ display: "none" }}
          src={item.qrCodeImageUrl}
          preview={{
            visible: previewOpen,
            src: item.qrCodeImageUrl,
            onVisibleChange: (value) => setPreviewOpen(value),
          }}
        />
      )}
    </>
  );
};

export default React.memo(TableCard);
