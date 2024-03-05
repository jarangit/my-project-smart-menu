/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

type Props = {
  value: string | number;
  className?: string;
}

const Text = ({ value, className }: Props) => {
  return (
    <p className={`${className ?? ''}`}>
      {value ?? ''}
    </p>
  )
}

export default Text