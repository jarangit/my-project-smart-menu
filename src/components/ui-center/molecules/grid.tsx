/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type Props = {
  col?: number
  gap?: number
  className?: string
  children: any
}

const Grid = ({ children, col, gap, className }: Props) => {
  return (
    <div
      className={`grid ${col ? `grid-cols-${col}` : 'grid-cols-1'}  ${gap ? `gap-${gap}` : 'gap-1'}       ${
        className ?? ''
      }
    `}
    >
      {children}
    </div>
  )
}

export default Grid
