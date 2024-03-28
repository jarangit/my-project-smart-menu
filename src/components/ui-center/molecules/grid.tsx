/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & {
  col?: number;
  gap?: number;
};

const Grid: React.FC<DivProps> = ({
  children,
  className,
  col,
  gap,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`grid ${col ? `grid-cols-${col.toString()}` : "grid-cols-1"}  ${gap ? `gap-${gap.toString()}` : "gap-1"}       ${
        className ?? ""
      }
    `}
    >
      {children}
    </div>
  );
};

export default Grid;
