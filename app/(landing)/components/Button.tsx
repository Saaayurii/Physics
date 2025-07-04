"use client"

import React from "react";
import ButtonSvg from "@/components/ButtonSvg";
import Link from "next/link";

interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  px?: string;
  white?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  href,
  onClick,
  children,
  px,
  white,
  disabled,
}) => {
  const classes = `button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1 ${
    px || "px-7"
  } ${white ? "text-n-8" : "text-n-1"} ${className || ""}`;
  const spanClasses = "relative z-10";

  const renderButton = () => (
    <button className={classes} onClick={onClick} disabled={disabled}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg({ white })}
    </button>
  );

  const renderLink = () => {
    // Проверяем, что href существует и не undefined
    if (!href) {
      return renderButton(); // Если href нет, рендерим кнопку вместо ссылки
    }

    return (
      <Link href={href} className={classes}>
        <span className={spanClasses}>{children}</span>
        {ButtonSvg({ white })}
      </Link>
    );
  };

  return href ? renderLink() : renderButton();
};

export default Button;
