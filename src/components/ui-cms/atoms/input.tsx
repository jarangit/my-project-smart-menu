import Column from "@ui-center/molecules/column";
import Row from "@ui-center/molecules/row";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
}

const Input = ({ title, ...props }: InputProps) => {
  return (
    <div>
      <label>
        <Column gap={0}>
          {title && <div className="font-semibold">{title}</div>}
          <input
            {...props}
            className="w-full  rounded-md border-gray-400 bg-transparent px-3 p-2 outline-lime-400"
          />
        </Column>
      </label>
    </div>
  );
};

export default Input;
