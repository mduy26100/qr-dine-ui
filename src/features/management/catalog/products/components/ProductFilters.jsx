import React, { useCallback, useState, useEffect } from "react";
import { Input, Select, TreeSelect, Button, Divider } from "antd";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PRODUCT_SEARCH_PARAMS, PRODUCT_STATUS_LABEL } from "../constants";

const ProductFilters = ({
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  categoryIdParam,
  onCategoryChange,
  isAvailableParam,
  onAvailableChange,
  onResetFilters,
  hasActiveFilters,
  categoryTreeData,
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 p-4 pb-0">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          prefix={<MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />}
          value={searchInput}
          onChange={(e) => onSearchInputChange(e.target.value)}
          onPressEnter={onSearchSubmit}
          allowClear
          className="md:max-w-xs rounded-lg"
          suffix={
            <Button
              type="text"
              size="small"
              className="flex items-center justify-center -mr-1 text-blue-600 hover:!text-blue-700"
              onClick={onSearchSubmit}
            >
              Tìm
            </Button>
          }
        />
        <TreeSelect
          placeholder="Lọc theo danh mục"
          treeData={categoryTreeData}
          value={categoryIdParam || undefined}
          onChange={onCategoryChange}
          allowClear
          treeDefaultExpandAll
          className="md:min-w-[200px] rounded-lg"
          popupClassName="rounded-lg"
        />
        <Select
          placeholder="Trạng thái"
          value={isAvailableParam || undefined}
          onChange={onAvailableChange}
          allowClear
          onClear={() => onAvailableChange("")}
          className="md:min-w-[140px] rounded-lg"
          options={[
            { value: "true", label: PRODUCT_STATUS_LABEL.true },
            { value: "false", label: PRODUCT_STATUS_LABEL.false },
          ]}
        />
        {hasActiveFilters && (
          <Button
            type="text"
            icon={<XMarkIcon className="w-4 h-4" />}
            onClick={onResetFilters}
            className="flex items-center text-gray-500 hover:!text-red-500"
          >
            Thiết lập lại
          </Button>
        )}
      </div>
      <Divider className="!mb-0 !mt-3" />
    </>
  );
};

export default React.memo(ProductFilters);
