/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  gap?: number;
};

const Row: React.FC<DivProps> = ({ children, className, gap, ...props }) => {
  return (
    <div
      {...props}
      className={`flex flex-row flex-wrap  items-center
      ${className ?? ""}
      ${gap ? `gap-${gap}` : "gap-1"}
      `}
    >
      {children}
    </div>
  );
};

export default Row;
