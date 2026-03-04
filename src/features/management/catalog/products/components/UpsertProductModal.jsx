import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Checkbox,
  TreeSelect,
  Button,
  InputNumber,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const UpsertProductModal = ({
  open,
  onCancel,
  onSubmit,
  confirmLoading,
  categoryTreeData = [],
  initialValues = null,
}) => {
  const [form] = Form.useForm();
  const isEdit = !!initialValues;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (open) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          imageFile: initialValues.imageUrl
            ? [
                {
                  uid: "-1",
                  name: "image.png",
                  status: "done",
                  url: initialValues.imageUrl,
                },
              ]
            : [],
        });
      } else {
        form.resetFields();
        form.setFieldsValue({
          isAvailable: true,
          price: 0,
        });
      }
    }
  }, [open, initialValues, form]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();

    const fileObj =
      values.imageFile && values.imageFile.length > 0
        ? values.imageFile[0].originFileObj
        : null;

    const payload = {
      name: values.name,
      description: values.description || "",
      price: values.price || 0,
      isAvailable: values.isAvailable,
      categoryId: values.categoryId,
      imageFile: fileObj,
    };

    onSubmit(payload, form);
  };

  return (
    <>
      <Modal
        title={isEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
        open={open}
        onCancel={onCancel}
        width={600}
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
        maskClosable={false}
        afterClose={() => {
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" className="pt-2">
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
          >
            <Input
              placeholder="VD: Cà phê sữa đá..."
              className="rounded-lg py-2"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="categoryId"
              label="Danh mục"
              rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
            >
              <TreeSelect
                placeholder="Chọn danh mục"
                treeData={categoryTreeData}
                allowClear
                treeDefaultExpandAll
                className="rounded-lg h-10"
                popupClassName="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá bán (VNĐ)"
              rules={[{ required: true, message: "Vui lòng nhập giá bán" }]}
            >
              <InputNumber
                min={0}
                step={1000}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                className="w-full rounded-lg"
              />
            </Form.Item>
          </div>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea
              placeholder="Mô tả thành phần, hương vị..."
              rows={3}
              className="rounded-lg py-2"
            />
          </Form.Item>

          <Form.Item
            name="imageFile"
            label="Hình ảnh sản phẩm"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false}
              onPreview={handlePreview}
              maxCount={1}
              accept="image/*"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item
            name="isAvailable"
            valuePropName="checked"
            className="mb-0"
          >
            <Checkbox className="text-gray-600 font-medium">
              Có sẵn (Đang bán)
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Preview Ảnh */}
      <Modal
        open={previewOpen}
        title="Xem trước hình ảnh"
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        centered
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default React.memo(UpsertProductModal);
