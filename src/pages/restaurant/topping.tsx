/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import withAuth from '~/utils/withAuth'

type Props = {}

const ToppingPage = (props:Props) => {
  return (
    <div>ToppingPage</div>
  )
}

export default withAuth(ToppingPage)