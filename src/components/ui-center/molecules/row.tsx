/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

type Props = {
  children: any
  gap?: number
  className?: string
  onAction?: () => void
}

const Row = ({ children, gap, className, onAction }: Props) => {
  return (
    <div
      className={`flex flex-row items-center 
      ${className ?? ''}
      ${gap ? `gap-${gap}` : 'gap-1'}
      `}
      onClick={onAction}
    >
      {children}
    </div>
  )
}

export default Row
