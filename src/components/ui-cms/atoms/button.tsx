/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={`rounded-md uppercase bg-lime-600 px-6 py-1 font-semibold text-md text-white flex justify-center items-center drop-shadow-sm ${className ?? ""}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
