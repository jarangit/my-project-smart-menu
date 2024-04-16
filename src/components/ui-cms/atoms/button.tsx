
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  btnStyle?: 'normal' | 'outline';
}

const Button = ({ children, className, type, ...props }: ButtonProps) => {
  return (
    <button
      className={`text-md flex items-center justify-center rounded-full bg-main px-6 py-1 font-semibold uppercase text-white drop-shadow-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
