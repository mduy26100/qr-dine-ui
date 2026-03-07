import { useEffect, useState, useCallback, useRef } from "react";
import { useGetMenu } from "./useGetMenu";

export const useMenuPageController = ({
  merchantId,
  onOpenMessage,
  setMenu,
  addToCart,
}) => {
  const { data: menuData, isLoading, error } = useGetMenu(merchantId);

  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const observerRef = useRef(null);

  useEffect(() => {
    if (menuData && menuData.length > 0) {
      setMenu(menuData);
      setActiveCategory(menuData[0].id);
    }
  }, [menuData, setMenu]);

  useEffect(() => {
    if (error) {
      onOpenMessage({
        type: "error",
        content: "Không thể tải menu. Vui lòng thử lại.",
      });
    }
  }, [error, onOpenMessage]);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const categoryId = entry.target.id.replace("category-", "");
          setActiveCategory(categoryId);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    const sections = document.querySelectorAll("[id^='category-']");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [menuData]);

  const handleAddToCart = useCallback(
    (product, quantity) => {
      addToCart(product, quantity);
      onOpenMessage({
        type: "success",
        content: `${product.name} đã thêm vào giỏ`,
        duration: 1.5,
      });
    },
    [addToCart, onOpenMessage]
  );

  const handleProductClick = useCallback((product) => {
    setSelectedProduct(product);
    setBottomSheetVisible(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    setBottomSheetVisible(false);
    setSelectedProduct(null);
  }, []);

  const filteredMenu = menuData
    ?.map((category) => ({
      ...category,
      products: category.products.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    }))
    .filter((category) => category.products.length > 0);

  return {
    isLoading,
    menuData,
    activeCategory,
    selectedProduct,
    bottomSheetVisible,
    searchValue,
    filteredMenu,
    handlers: {
      setActiveCategory,
      setSearchValue,
      handleAddToCart,
      handleProductClick,
      handleCloseBottomSheet,
    },
  };
};
