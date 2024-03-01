/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';
import Column from '@ui-center/molecules/column';
import Row from '@ui-center/molecules/row';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setShowLoading } from '~/app-state/redux/features/ui-state.slice';
import { api } from '~/utils/api';
import withAuth from '~/utils/withAuth';

type Props = {}
const mockDataCreate = {
  name: 'Mala food',
  profileImageUrl: 'https://smart-menu-web-storage.s3.ap-southeast-1.amazonaws.com/mock-logo-restaurant.png',
  coverImage: 'https://smart-menu-web-storage.s3.ap-southeast-1.amazonaws.com/give me the ban 49671e42-4494-488a-8682-d247f47da4be.png',
  facebook: 'facebook',
  lineId: 'line',
  googleMapUrl: 'google-map.url',
  phone: 0,
}
const RestaurantPage = ({ }) => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState<any>()
  const { data: sessionData } = useSession()
  const userId = sessionData?.user.id
  const createRestaurantMutation = api.restaurant.create.useMutation()
  const { data: restaurantData, isLoading, refetch } = api.restaurant.getOne.useQuery({ id: userId as "" })
  const updateRestaurantMutation = api.restaurant.update.useMutation()
  const deleteRestaurantMutation = api.restaurant.delete.useMutation({
    onSuccess: async () => {
      console.log('deleted')
      // window.location.reload()
      await refetch()
      return
    }
  })
  if (isLoading) {
    dispatch(setShowLoading(true))
  } else {
    dispatch(setShowLoading(false))
  }


  const onCreateRestaurant = async (data: any) => {
    try {
      await createRestaurantMutation.mutateAsync(data)
      await refetch()
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
            <div className='relative w-full h-[450px] rounded-lg overflow-hidden drop-shadow-lg'>
              <Image
                src={restaurantData.coverImage as ''}
                alt=''
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <Row className='justify-between !items-end relative -top-24 pl-6'>
              <Column gap={4} className=''>
                <div className='relative w-[200px] h-[200px] rounded-full overflow-hidden border-2 drop-shadow-lg'>
                  <Image
                    src={restaurantData.profileImageUrl as ''}
                    alt=''
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className='text-2xl font-bold uppercase'>{restaurantData.name}</div>
              </Column>
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