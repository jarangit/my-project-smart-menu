/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useEffect } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import Column from '../molecules/column'
import { useAppSelector } from '~/app-state/redux/hook'
type Props = {}

const Loading = (props: Props) => {
  const stateUI = useAppSelector((state) => state?.stateUI)

  if (!stateUI.showLoading) {
    return null
  }

  return (
    <div
      className={` fixed  left-0 right-0 top-0 z-50 flex h-screen w-full   items-center justify-center overflow-hidden bg-black/50 backdrop-invert backdrop-opacity-10 transition-all  duration-700`}

    >
      <Column gap={4} className='items-center '>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#ffc71f"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        <div className='text-xl text-yellow-500 font-bold'>Loading...</div>
      </Column>
    </div>
  )
}

export default Loading