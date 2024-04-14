import Column from "@ui-center/molecules/column";
import Row from "@ui-center/molecules/row";
import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  isRequired?: boolean;
  errorMessage?: string;
  isError?: boolean;
}

const Input = ({
  title,
  isError,
  isRequired,
  errorMessage,
  ...props
}: InputProps) => {
  return (
    <div>
      <label>
        <Column gap={0} className="relative ">
          {title && (
            <div className="font-semibold text-gray-500">
              {title}
              <span className={`${isRequired ? "text-red-600":'hidden'} test-red-600`}>
                *
              </span>
            </div>
          )}
          <input
            {...props}
            className={`
            ${isError ? "border-red-600" : ""}
            w-full  rounded-md border-gray-400 bg-transparent p-2 px-3 outline-main`}
          />
          <div className="absolute -bottom-6 text-red-600">
            {errorMessage && isError ? errorMessage : ""}
          </div>
        </Column>
      </label>
    </div>
  );
};

export default Input;
