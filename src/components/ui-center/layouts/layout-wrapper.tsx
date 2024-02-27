/* eslint-disable @typescript-eslint/ban-types */
import { useSession } from 'next-auth/react'
import React from 'react'
import LandingLayout from './landing-layout'
import CMSLayout from './cms-layout'

type Props = {
  children: JSX.Element
}

const LayoutWrapper = ({ children }: Props) => {
  const { data: sessionData } = useSession()
  if (!sessionData?.user) {
    return (
      <LandingLayout>
        {children}
      </LandingLayout>
    )
  }
  return (
    <div>
      <CMSLayout>
        {children}
      </CMSLayout>
    </div>
  )
}

export default LayoutWrapper