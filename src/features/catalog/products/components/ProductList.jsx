import React, { useEffect, useRef, useCallback } from 'react';
import { Card, Typography, Empty, Spin } from 'antd';
import { PhotoIcon } from '@heroicons/react/24/outline';

const { Text } = Typography;

const ProductList = ({ data = [], loading, hasNextPage, onLoadMore }) => {
    const sentinelRef = useRef(null);
    const observerRef = useRef(null);

    const handleIntersect = useCallback((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !loading) {
            onLoadMore?.();
        }
    }, [hasNextPage, loading, onLoadMore]);

    useEffect(() => {
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver(handleIntersect, {
            rootMargin: '100px',
        });

        if (sentinelRef.current) {
            observerRef.current.observe(sentinelRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleIntersect]);

    const isEmpty = !loading && data.length === 0;

    return (
        <div className="space-y-6 p-4">
            {isEmpty ? (
                <Empty description="Không có sản phẩm nào" className="py-10" />
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {data.map(product => (
                        <Card 
                            key={product.id} 
                            hoverable 
                            className="overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            cover={
                                product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover" />
                                ) : (
                                    <div className="h-40 w-full bg-gray-50 flex items-center justify-center text-gray-300 border-b border-gray-100">
                                        <PhotoIcon className="w-10 h-10" />
                                    </div>
                                )
                            }
                            styles={{ body: { padding: '12px' } }}
                        >
                            <Card.Meta 
                                title={<span className="text-slate-700 truncate block">{product.name}</span>} 
                                description={
                                    <div className="flex flex-col gap-1 mt-1">
                                        <Text className="text-blue-600 font-semibold">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                        </Text>
                                        <span className="text-xs text-slate-400 truncate">
                                            {product.parentCategoryName ? `${product.parentCategoryName} › ` : ''}{product.categoryName}
                                        </span>
                                    </div>
                                } 
                            />
                        </Card>
                    ))}
                </div>
            )}
            
            <div ref={sentinelRef} className="flex justify-center py-4">
                {loading && <Spin tip="Đang tải..." />}
            </div>
        </div>
    );
};

export default React.memo(ProductList);