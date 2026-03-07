import React, { useRef, useEffect } from "react";

const CategoryTabs = ({ categories, activeCategory, onCategorySelect }) => {
  const scrollContainerRef = useRef(null);
  const activeTabRef = useRef(null);

  useEffect(() => {
    if (activeTabRef.current && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const activeTab = activeTabRef.current;
      const containerWidth = scrollContainer.clientWidth;
      const tabLeft = activeTab.offsetLeft;
      const tabWidth = activeTab.clientWidth;
      const targetScroll = tabLeft - containerWidth / 2 + tabWidth / 2;

      scrollContainer.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  return (
    <div
      className="sticky top-16 z-30 bg-white border-b border-gray-100 overflow-x-auto scrollbar-hide"
      ref={scrollContainerRef}
    >
      <div className="flex gap-2 px-4 py-3 min-w-min">
        {categories.map((category) => (
          <button
            key={category.id}
            ref={activeCategory === category.id ? activeTabRef : null}
            onClick={() => {
              onCategorySelect(category.id);
              document
                .getElementById(`category-${category.id}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all duration-200 ${
              activeCategory === category.id
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
