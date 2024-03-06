/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`rounded-full bg-lime-400 px-5 py-1 font-bold drop-shadow-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
