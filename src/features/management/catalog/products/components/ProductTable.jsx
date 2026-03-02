import React, { useMemo } from 'react';
import { Table, Tag, Space, Button, Tooltip, Typography, Image } from 'antd';
import { PencilSquareIcon, TrashIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { EyeOutlined } from '@ant-design/icons';

const { Text } = Typography;

const ProductTable = ({ 
    data = [], 
    loading, 
    pagination,
    onChange,
    onEdit, 
    onDelete 
}) => {
    const columns = useMemo(() => [
        {
            title: 'STT',
            key: 'stt',
            width: 60,
            align: 'center',
            render: (_, __, index) => (
                <Text className="text-slate-500 font-medium">
                    {((pagination?.current || 1) - 1) * (pagination?.pageSize || 10) + index + 1}
                </Text>
            ),
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            width: 80,
            align: 'center',
            render: (imageUrl, record) => {
                if (imageUrl) {
                    return (
                        <Image
                            src={imageUrl}
                            alt={record.name}
                            width={40}
                            height={40}
                            className="object-cover rounded-md border border-gray-200"
                            fallback="https://via.placeholder.com/40?text=No+Img"
                            preview={{ mask: <EyeOutlined className="text-white text-xs" /> }}
                        />
                    );
                }
                return (
                    <div className="w-10 h-10 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center mx-auto text-gray-300">
                        <PhotoIcon className="w-5 h-5" />
                    </div>
                );
            },
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: 250, 
            render: (name, record) => (
                <div>
                    <Text className="font-semibold text-slate-700 block truncate">
                        {name ?? <span className="italic text-gray-400">N/A</span>}
                    </Text>
                    {record.description && (
                        <span className="text-xs text-slate-400 block truncate mt-0.5">
                            {record.description}
                        </span>
                    )}
                </div>
            ),
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            width: 150,
            align: 'right',
            render: (price) => (
                <Text className="font-medium text-blue-600">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)}
                </Text>
            ),
        },
        {
            title: 'Danh mục',
            key: 'category',
            width: 200,
            render: (_, record) => (
                <div className="text-sm">
                    {record.parentCategoryName ? (
                        <span className="text-slate-500">
                            {record.parentCategoryName} <span className="text-slate-300 mx-1">›</span> 
                            <Text strong className="text-slate-700">{record.categoryName}</Text>
                        </span>
                    ) : (
                        <Text strong className="text-slate-700">{record.categoryName}</Text>
                    )}
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isAvailable',
            key: 'isAvailable',
            align: 'center',
            width: 120,
            render: (isAvailable) => (
                <Tag 
                    color={isAvailable ? 'success' : 'default'} 
                    className="rounded-full border-none px-2.5 capitalize text-[11px] font-medium m-0"
                >
                    {isAvailable ? 'Có sẵn' : 'Hết hàng'}
                </Tag>
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            align: 'center',
            width: 100,
            render: (_, record) => {
                if (!record) return null;
                return (
                    <Space size={4}>
                        <Tooltip title="Chỉnh sửa">
                            <Button 
                                type="text" 
                                size="small"
                                className="flex items-center justify-center hover:!bg-blue-50 hover:!text-blue-600"
                                icon={<PencilSquareIcon className="w-4 h-4" />} 
                                onClick={() => onEdit?.(record)}
                            />
                        </Tooltip>
                        <Tooltip title="Xóa">
                            <Button 
                                type="text" 
                                size="small"
                                danger
                                className="flex items-center justify-center hover:!bg-red-50"
                                icon={<TrashIcon className="w-4 h-4" />} 
                                onClick={() => onDelete?.(record)}
                            />
                        </Tooltip>
                    </Space>
                );
            },
        },
    ], [onEdit, onDelete, pagination]);

    return (
        <Table
            columns={columns}
            dataSource={Array.isArray(data) ? data : []}
            loading={loading}
            rowKey={(record) => record?.id}
            pagination={{
                ...pagination,
                showSizeChanger: true,
                showTotal: (total) => `Tổng cộng ${total} sản phẩm`,
                className: "px-4"
            }}
            onChange={onChange}
            scroll={{ x: 'max-content' }}
            className="product-table shadow-none overflow-hidden"
            size="middle"
            locale={{ emptyText: 'Không có sản phẩm nào' }}
        />
    );
};

export default React.memo(ProductTable);