/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import withAuth from '~/utils/withAuth'

type Props = {}

const CategoryPage = (props:Props) => {
  return (
    <div>CategoryPage</div>
  )
}

export default withAuth(CategoryPage)