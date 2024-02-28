/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setShowLoading } from '~/app-state/redux/features/ui-state.slice';
import { api } from '~/utils/api';
import withAuth from '~/utils/withAuth';

type Props = {}

const RestaurantPage = ({ }) => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState<any>()
  const { data: sessionData } = useSession()
  const userId = sessionData?.user.id
  const createRestaurantMutation = api.restaurant.create.useMutation()
  const { data: restaurantData, isLoading } = api.restaurant.getOne.useQuery({ id: userId as "" })

  if (isLoading) {
    dispatch(setShowLoading(true))
  } else {
    dispatch(setShowLoading(false))
  }

  
  const onCreateRestaurant = async (name: string) => {
    try {
      await createRestaurantMutation.mutateAsync({
        name: name,
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
        {restaurantData ? (
          <div>
            <div className='text-2xl font-bold uppercase'>{restaurantData.name}</div>
            <div>
              <strong>Update Restaurant</strong>
              <div>
                <input type="text" placeholder='name' />
                <button onClick={() => onCreateRestaurant('jr shop')}>Update</button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <strong>Create Restaurant</strong>
              <div>
                <input type="text" placeholder='name' />
                <button onClick={() => onCreateRestaurant('jr shop',)}>Create</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default withAuth(RestaurantPage)