/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import withAuth from '~/utils/withAuth'

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <div>DashboardPage</div>
  )
}

export default withAuth(DashboardPage)