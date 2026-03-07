import React from "react";
import { useParams } from "react-router-dom";
import { Empty, message } from "antd";
import {
  CartBar,
  CategoryTabs,
  MenuHeader,
  MenuSkeletonLoader,
  ProductBottomSheet,
  ProductCard,
  useMenuPageController,
} from "../../features/storefront/catalog/categories";
import { useStorefrontMenu } from "../../app/providers";

const MenuPage = () => {
  const { merchantId, qrCodeToken } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const { setMenu, addToCart, cartCount, cartTotal } = useStorefrontMenu();

  const controller = useMenuPageController({
    merchantId,
    onOpenMessage: (config) => messageApi.open(config),
    setMenu,
    addToCart,
  });

  const {
    isLoading,
    menuData,
    activeCategory,
    selectedProduct,
    bottomSheetVisible,
    searchValue,
    filteredMenu,
    handlers,
  } = controller;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {contextHolder}
        <MenuSkeletonLoader />
      </div>
    );
  }

  if (!menuData || menuData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        {contextHolder}
        <Empty description="Không có menu" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {contextHolder}

      <MenuHeader
        searchValue={searchValue}
        onSearchChange={handlers.setSearchValue}
      />

      {menuData.length > 0 && (
        <CategoryTabs
          categories={menuData}
          activeCategory={activeCategory}
          onCategorySelect={handlers.setActiveCategory}
        />
      )}

      <div className="pb-32">
        {filteredMenu && filteredMenu.length > 0 ? (
          filteredMenu.map((category) => (
            <section
              key={category.id}
              id={`category-${category.id}`}
              className="scroll-mt-32 px-4 py-6 border-b border-gray-100 bg-white mt-2"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                {category.name}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddClick={handlers.handleProductClick}
                    isLoading={false}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="pt-20">
            <Empty description="Không tìm thấy món ăn" />
          </div>
        )}
      </div>

      <ProductBottomSheet
        product={selectedProduct}
        visible={bottomSheetVisible}
        onClose={handlers.handleCloseBottomSheet}
        onAddToCart={handlers.handleAddToCart}
      />

      <CartBar
        count={cartCount}
        total={cartTotal}
        onViewCart={() => {
          messageApi.info("Trang giỏ hàng sẽ được cập nhật");
        }}
      />
    </div>
  );
};

export default MenuPage;
