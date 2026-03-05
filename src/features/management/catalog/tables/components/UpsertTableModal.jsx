import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";

const UpsertTableModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
  initialValues = null,
}) => {
  const [form] = Form.useForm();
  const isEdit = !!initialValues;

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [open, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
    } catch (_) {
      void 0;
    }
  };

  return (
    <Modal
      title={
        <span className="text-xl font-semibold text-slate-700">
          {isEdit ? "Cập nhật thông tin bàn" : "Thêm bàn mới"}
        </span>
      }
      open={open}
      onCancel={onCancel}
      width={450}
      footer={[
        <Button key="back" onClick={onCancel} className="h-9 px-4 rounded-lg">
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleSubmit}
          className="bg-indigo-600 hover:!bg-indigo-700 border-none h-9 px-6 rounded-lg shadow-sm"
        >
          {isEdit ? "Cập nhật" : "Tạo mới"}
        </Button>,
      ]}
      destroyOnHidden
      centered
      maskClosable={!confirmLoading}
      styles={{
        mask: { backdropFilter: "blur(4px)" },
        content: { padding: "24px", borderRadius: "16px" },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        className="pt-4"
        initialValues={{ name: "" }}
      >
        <Form.Item
          name="name"
          label={<span className="font-medium text-gray-700">Tên bàn</span>}
          rules={[
            { required: true, message: "Vui lòng nhập tên bàn" },
            { max: 100, message: "Tên bàn không được vượt quá 100 ký tự" },
          ]}
        >
          <Input
            placeholder="VD: A1, Bàn 2, VIP 1..."
            className="rounded-lg py-2"
            maxLength={100}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(UpsertTableModal);
