import React, { FC } from 'react';

interface MenuSvgProps {
  openNavigation: boolean;
}

const MenuSvg: FC<MenuSvgProps> = ({ openNavigation }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="overflow-visible"
    >
      <rect
        x="2"
        y="6"
        width="20"
        height="2"
        rx="1"
        fill="white"
        className={`transition-all duration-300 ease-in-out`}
        style={{
          transformOrigin: "center",
          transform: openNavigation
            ? "rotate(45deg) translateY(4px)"
            : "rotate(0deg) translateY(0)",
        }}
      />
      <rect
        x="2"
        y="16"
        width="20"
        height="2"
        rx="1"
        fill="white"
        className={`transition-all duration-300 ease-in-out`}
        style={{
          transformOrigin: "center",
          transform: openNavigation
            ? "rotate(-45deg) translateY(-4px)"
            : "rotate(0deg) translateY(0)",
        }}
      />
    </svg>
  );
};

export default MenuSvg;
