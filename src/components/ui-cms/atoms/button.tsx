/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */
import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={`bg-lime-400 rounded-full px-5 py-1 font-bold drop-shadow-sm`}
      {...props}
    >{children}</button>
  )
}

export default Button