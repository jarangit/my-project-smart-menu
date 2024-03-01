/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';
import Row from '@ui-center/molecules/row';
import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setShowLoading } from '~/app-state/redux/features/ui-state.slice';
import { api } from '~/utils/api';
import withAuth from '~/utils/withAuth';

type Props = {}
const mockDataCreate = {
  name: '',
  profileImageUrl: '',
  facebook: '',
  lineId: '',
  googleMapUrl: '',
  phone: 0
}
const RestaurantPage = ({ }) => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState<any>()
  const { data: sessionData } = useSession()
  const userId = sessionData?.user.id
  const createRestaurantMutation = api.restaurant.create.useMutation()
  const { data: restaurantData, isLoading } = api.restaurant.getOne.useQuery({ id: userId as "" })
  console.log('%cMyProject%cline:33%crestaurantData', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(229, 187, 129);padding:3px;border-radius:2px', restaurantData)
  const updateRestaurantMutation = api.restaurant.update.useMutation()
  const deleteRestaurantMutation = api.restaurant.delete.useMutation({
    onSuccess: () => {
      console.log('deleted')
      window.location.reload()
      return
    }
  })
  if (isLoading) {
    dispatch(setShowLoading(true))
  } else {
    dispatch(setShowLoading(false))
  }


  const onCreateRestaurant = async (data: any) => {
    console.log('%cMyProject%cline:42%cdata', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(38, 157, 128);padding:3px;border-radius:2px', data)
    try {
      await createRestaurantMutation.mutateAsync(data)
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
            <Row className='justify-between'>
              <div className='text-2xl font-bold uppercase'>{restaurantData.name}</div>
              <div>
                <button
                  onClick={() => deleteRestaurantMutation.mutateAsync({
                    id: restaurantData.id
                  })}
                >Delete</button>
              </div>
            </Row>
            <div className='border'>
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
                <button onClick={() => onCreateRestaurant(mockDataCreate)}>Create</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default withAuth(RestaurantPage)