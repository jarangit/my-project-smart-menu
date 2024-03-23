/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'

type Props = {
  className?: string
  children: JSX.Element
}

const Card = ({className, children}: Props) => {
  return (
    <div className={`${className ?? ''} p-6 bg-white rounded-xl drop-shadow-sm`}>
      {children}
    </div>
  )
}

export default Card