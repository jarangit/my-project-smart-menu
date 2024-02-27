/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import withAuth from '~/utils/withAuth'

type Props = {}

const MeatPage = (props:Props) => {
  return (
    <div>MeatPage</div>
  )
}

export default withAuth(MeatPage)