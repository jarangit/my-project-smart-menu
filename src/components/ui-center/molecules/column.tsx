/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: number;
};

const Column: React.FC<DivProps> = ({ children, gap, className, ...props }) => {
  return (
    <div
      {...props}
      className={`flex flex-col
      ${className ?? ""}
    ${gap ? `gap-${gap}` : "gap-1"}
      `}
    >
      {children}
    </div>
  );
};

export default Column;
