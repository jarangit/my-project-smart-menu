/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { api } from '~/utils/api';

type Props = {}

const RestaurantPage = ({ }) => {
  const [userData, setUserData] = useState<any>()
  const { data: sessionData } = useSession()
  const userId = sessionData?.user.id
  const createRestaurantMutation = api.restaurant.create.useMutation()
  // const onGetUser = async () => {
  //   const res: any = await fetchOneUser.refetch()
  //   if (res) {
  //     setUserData(res?.data)
  //   }
  // }

  const onCreateRestaurant = async (name: string, userId: number) => {
    try {
      await createRestaurantMutation.mutateAsync({
        name: name,
        userId: userId
      })
    } catch (error) {
      console.log(error)

    }
    return
  }
  // useEffect(() => {
  //   void onGetUser()
  // }, [])

  return (
    <div>
      <div>
        <div>
          ทดสอบ
        </div>
        <strong>Create Restaurant</strong>
        <div>
          <input type="text" placeholder='name' />
          <button onClick={() => onCreateRestaurant('jr shop', parseFloat(userId as ''))}>Create</button>
        </div>
      </div>
    </div>
  )
}

export default RestaurantPage