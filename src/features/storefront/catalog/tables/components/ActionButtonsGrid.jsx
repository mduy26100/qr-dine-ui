import React from "react";
import { Button } from "antd";

const ActionButtonsGrid = ({ buttons }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {buttons.map((button) => (
        <button
          key={button.id}
          className={`p-6 rounded-2xl text-white font-semibold text-sm md:text-base transition-all duration-200 active:scale-95 bg-gradient-to-br ${button.color} shadow-lg hover:shadow-xl`}
        >
          <div className="text-3xl mb-2">{button.icon}</div>
          <div className="line-clamp-2 text-xs md:text-sm">{button.label}</div>
        </button>
      ))}
    </div>
  );
};

export default ActionButtonsGrid;
