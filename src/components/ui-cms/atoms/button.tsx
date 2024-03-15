/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`text-md flex items-center justify-center rounded-md bg-main px-6 py-1 font-semibold uppercase text-white drop-shadow-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
