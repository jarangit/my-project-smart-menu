/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react'

type Props = {
  children: any
  gap?: number
  className?: string
  ref?: any
  onClick?: () => void
}

const Column = ({ children, gap, className, ref, onClick }: Props) => {
  return (
    <div
      ref={ref}
      className={`flex flex-col
      ${className ?? ''}
    ${gap ? `gap-${gap}` : 'gap-1'}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Column
