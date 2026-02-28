import React, { useMemo } from 'react';
import { Table, Tag, Space, Button, Tooltip, Typography } from 'antd';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const { Text } = Typography;

const CategoryTableComponent  = ({ data = [], loading, onEdit, onDelete }) => {
    const columns = useMemo(() => [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            width: 250, 
            render: (name) => (
                <Text className="font-semibold text-slate-700 block truncate">
                    {name ?? <span className="italic text-gray-400">N/A</span>}
                </Text>
            ),
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 200,
            render: (desc) => (
                <span className="text-sm text-slate-500 block truncate">
                    {desc || '--'}
                </span>
            ),
        },
        {
            title: 'Vị trí hiển thị',
            dataIndex: 'displayOrder',
            key: 'displayOrder',
            align: 'center',
            width: 120,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isActive',
            key: 'isActive',
            align: 'center',
            width: 120,
            render: (isActive) => (
                <Tag 
                    color={isActive ? 'success' : 'error'} 
                    className="rounded-full border-none px-2.5 capitalize text-[11px] font-medium m-0"
                >
                    {isActive ? 'Hoạt động' : 'Đã ẩn'}
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
    ], [onEdit, onDelete]);

    return (
        <Table
            columns={columns}
            dataSource={Array.isArray(data) ? data : []}
            loading={loading}
            rowKey={(record) => record?.id}
            pagination={false}
            expandable={{
                childrenColumnName: "children",
                expandRowByClick: true,
                rowExpandable: (record) => record?.children && record.children.length > 0,
            }}
            scroll={{ x: 'max-content' }}
            className="category-table shadow-none overflow-hidden"
            size="middle"
            locale={{ emptyText: 'Không có danh mục nào' }}
        />
    );
};

export const CategoryTable = React.memo(CategoryTableComponent);