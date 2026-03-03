import React, { useEffect, useMemo } from "react";
import {
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  Button,
  InputNumber,
} from "antd";

const UpsertCategoryModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
  categoryList = [],
  initialValues = null,
}) => {
  const [form] = Form.useForm();
  const isEdit = !!initialValues;

  const shouldShowParentSelect = useMemo(() => {
    if (!isEdit) return true;
    if (initialValues?.parentId !== null) return true;

    const hasChildren =
      initialValues?.children && initialValues.children.length > 0;
    return !hasChildren;
  }, [isEdit, initialValues]);

  const parentOptions = useMemo(() => {
    return categoryList
      .filter((cat) => cat.parentId === null && cat.id !== initialValues?.id)
      .map((cat) => ({
        label: cat.name,
        value: cat.id,
      }));
  }, [categoryList, initialValues]);

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          parentId: initialValues.parentId || null,
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          isActive: true,
          parentId: null,
          displayOrder: 1,
        });
      }
    }
  }, [open, initialValues, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    const payload = {
      name: values.name,
      description: values.description || "",
      displayOrder: values.displayOrder || 1,
      isActive: values.isActive,
      parentId: shouldShowParentSelect ? values.parentId || null : null,
    };

    onSubmit(payload, form);
  };

  return (
    <Modal
      title={isEdit ? "Cập nhật danh mục" : "Thêm danh mục mới"}
      open={open}
      onCancel={onCancel}
      width={500}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={confirmLoading}
          onClick={handleSubmit}
          className="bg-blue-600 hover:!bg-blue-700 border-none rounded-lg"
        >
          {isEdit ? "Cập nhật" : "Tạo mới"}
        </Button>,
      ]}
      destroyOnHidden
      centered
      maskClosable={true}
      afterClose={() => {
        form.resetFields();
      }}
    >
      <Form form={form} layout="vertical" className="pt-2">
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
        >
          <Input
            placeholder="VD: Đồ ăn vặt, Nước uống..."
            className="rounded-lg py-2"
          />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea
            placeholder="Mô tả ngắn về danh mục này..."
            rows={3}
            className="rounded-lg py-2"
          />
        </Form.Item>

        <div
          className={`grid ${shouldShowParentSelect ? "grid-cols-2" : "grid-cols-1"} gap-4`}
        >
          {shouldShowParentSelect && (
            <Form.Item name="parentId" label="Danh mục cha">
              <Select
                placeholder="Là danh mục gốc"
                allowClear
                options={parentOptions}
                className="rounded-lg"
                showSearch
                optionFilterProp="label"
              />
            </Form.Item>
          )}

          <Form.Item
            name="displayOrder"
            label="Vị trí hiển thị"
            rules={[{ required: true, message: "Nhập vị trí" }]}
          >
            <InputNumber min={1} className="w-full rounded-lg" />
          </Form.Item>
        </div>

        <Form.Item name="isActive" valuePropName="checked" className="mb-0">
          <Checkbox className="text-gray-600 font-medium">
            Đang hoạt động
          </Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(UpsertCategoryModal);
