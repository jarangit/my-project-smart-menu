/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import withAuth from '~/utils/withAuth'

type Props = {}

const MenuPage = (props:Props) => {
  return (
    <div>MenuPage</div>
  )
}

export default withAuth(MenuPage)