import React from 'react'

type Props = {
  children: JSX.Element;
}

const LandingLayout = ({ children }: Props) => {
  return (
    <div>
      <div>landing page</div>
      {children}
    </div>
  )
}

export default LandingLayout