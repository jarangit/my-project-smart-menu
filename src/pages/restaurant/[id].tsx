/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';
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
  const updateRestaurantMutation = api.restaurant.update.useMutation()
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

  const onUpdate = async ({
    id,
    name
  }: { id: string, name: string }) => {
    try {
      await updateRestaurantMutation.mutateAsync({
        id: id,
        name: name
      })
    } catch (error) {
      if (error instanceof TRPCClientError) {
        console.log('TRPCError:', error.message);
      } else {
        console.log('Other error:', error);
      }
    }
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
                <button onClick={() => onUpdate({
                  id: restaurantData.id,
                  name: 'update name restaurant'
                })}>Update</button>
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