import React, { useState, useCallback } from 'react';
import { Button, Card, Typography, Space, message, Modal } from 'antd';
import { PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useCreateCategory } from '../../features/catalog/categories/hooks/useCreateCategory';
import { useGetMyCategories } from '../../features/catalog/categories/hooks/useGetMyCategories';
import { useUpdateCategory } from '../../features/catalog/categories/hooks/useUpdateCategory';
import { useDeleteCategory } from '../../features/catalog/categories/hooks/useDeleteCategory'; // Thêm hook delete
import UpsertCategoryModal from '../../features/catalog/categories/components/UpsertCategoryModal';
import CategoryTable from '../../features/catalog/categories/components/CategoryTable';

const { Title, Text } = Typography;

const CategoryPage = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [modal, modalContextHolder] = Modal.useModal();
    
    const { data: responseData, isLoading, refetch } = useGetMyCategories();
    const { create, isLoading: isCreating } = useCreateCategory();
    const { update, isUpdating } = useUpdateCategory();
    const { remove } = useDeleteCategory();
    
    const categories = responseData || [];
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    const handleOpenCreate = useCallback(() => {
        setEditingRecord(null);
        setIsModalOpen(true);
    }, []);

    const handleOpenEdit = useCallback((record) => {
        setEditingRecord(record);
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingRecord(null);
    }, []);

    const handleSubmit = useCallback(async (values) => {
        const isEdit = !!editingRecord;
        const action = isEdit ? update : create;
        
        const payload = isEdit ? { id: editingRecord.id, ...values } : values;

        await action(payload, {
            onSuccess: () => {
                messageApi.open({
                    type: 'success',
                    content: `${isEdit ? 'Cập nhật' : 'Thêm'} danh mục "${values.name}" thành công`,
                });
                handleCloseModal();
                refetch();
            },
            onError: (error) => {
                messageApi.open({
                    type: 'error',
                    content: error?.error?.message || error?.message || 'Có lỗi xảy ra',
                });
            }
        });
    }, [editingRecord, create, update, messageApi, handleCloseModal, refetch]);

    const handleDelete = useCallback((record) => {
        modal.confirm({
            title: 'Xóa danh mục',
            icon: <ExclamationCircleFilled />,
            content: (
                <div className="pt-2">
                    <Text>Bạn có chắc chắn muốn xóa danh mục </Text>
                    <Text strong>"{record.name}"</Text>?
                    <br />
                    <Text type="secondary" className="text-xs">
                        Hành động này không thể hoàn tác.
                    </Text>
                </div>
            ),
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            centered: true,
            maskClosable: true,
            onOk: async () => {
                await remove(record.id, {
                    onSuccess: () => {
                        messageApi.open({
                            type: 'success',
                            content: `Đã xóa danh mục "${record.name}"`,
                        });
                        refetch();
                    },
                    onError: (error) => {
                        messageApi.open({
                            type: 'error',
                            content: error?.error?.message || error?.message || 'Không thể xóa danh mục này',
                        });
                    }
                });
            },
        });
    }, [modal, messageApi, remove, refetch]);

    return (
        <div className="animate-fade-in space-y-6">
            {contextHolder}
            {modalContextHolder}
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <Title level={2} className="!mb-1">Danh mục thực đơn</Title>
                    <Text type="secondary">Quản lý các nhóm món ăn và đồ uống của nhà hàng</Text>
                </div>
                <div className="flex justify-end">
                    <Space size="small">
                        <Button 
                            icon={<ArrowPathIcon className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />} 
                            onClick={() => refetch()}
                            className="flex items-center rounded-xl h-10"
                        >
                            Làm mới
                        </Button>
                        <Button 
                            type="primary" 
                            icon={<PlusIcon className="w-4 h-4" />} 
                            className="bg-blue-600 hover:!bg-blue-700 border-none h-10 rounded-xl flex items-center shadow-lg shadow-blue-100"
                            onClick={handleOpenCreate}
                        >
                            Thêm danh mục
                        </Button>
                    </Space>
                </div>
            </div>

            <Card className="shadow-sm border-gray-100 rounded-2xl overflow-hidden">
                <CategoryTable
                    data={categories} 
                    loading={isLoading} 
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                />
            </Card>

            <UpsertCategoryModal
                open={isModalOpen}
                onCancel={handleCloseModal}
                onSubmit={handleSubmit}
                confirmLoading={isCreating || isUpdating}
                categoryList={categories}
                initialValues={editingRecord}
            />
        </div>
    );
};

export default CategoryPage;