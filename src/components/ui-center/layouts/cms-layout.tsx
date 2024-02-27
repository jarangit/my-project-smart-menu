import React from 'react'
import Menu from './menu'

type Props = {
  children: React.ReactNode
}

const CMSLayout = ({ children }: Props) => {
  return (
    <div>
      <Menu />
      {children}
    </div>
  )
}

export default CMSLayout