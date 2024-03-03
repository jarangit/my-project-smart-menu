/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/*  eslint-disable @typescript-eslint/prefer-optional-chain */
import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';
import Column from '@ui-center/molecules/column';
import Row from '@ui-center/molecules/row';
import Button from '@ui-cms/atomics/button';
import Text from '@ui-cms/atomics/text';
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
  phone: "12345678",
}
const mockDataUpdate = {
  name: 'Mala food update',
  profileImageUrl: 'https://smart-menu-web-storage.s3.ap-southeast-1.amazonaws.com/mock-logo-restaurant.png',
  coverImage: 'https://smart-menu-web-storage.s3.ap-southeast-1.amazonaws.com/give me the ban 49671e42-4494-488a-8682-d247f47da4be.png',
  facebook: 'facebook',
  lineId: 'line',
  googleMapUrl: 'google-map.url',
  phone: '0882266023',
}
const RestaurantPage = ({ }) => {
  const dispatch = useDispatch()
  const [userData, setUserData] = useState<any>()
  const { data: sessionData } = useSession()
  const userId = sessionData?.user.id
  const { mutateAsync: createRestaurantMutation, isLoading: loadingCreateRestaurant } = api.restaurant.create.useMutation()
  const { data: restaurantData, isLoading: loadingDataRestaurant, refetch } = api.restaurant.getOne.useQuery({ id: userId as "" })
  const { mutateAsync: updateRestaurantMutation, isLoading: loadingUpdateRestaurant } = api.restaurant.update.useMutation()
  const { mutateAsync: deleteRestaurantMutation, isLoading: loadingDeleteRestaurant } = api.restaurant.delete.useMutation({
    onSuccess: async () => {
      console.log('deleted')
      // window.location.reload()
      await refetch()
      return
    }
  })

  const onCreateRestaurant = async (data: any) => {
    try {
      await createRestaurantMutation(data)
      await refetch()
    } catch (error) {
      console.log(error)
    }
    return
  }

  const onUpdate = async ({
    id,
    data
  }: { id: string, data: any }) => {
    try {
      const payload = {
        id,
        ...data,
      }
      await updateRestaurantMutation(payload)
      await refetch()
    } catch (error) {
      if (error instanceof TRPCClientError) {
        console.log('TRPCError:', error.message);
      } else {
        console.log('Other error:', error);
      }
    }
  }

  useEffect(() => {
    dispatch(setShowLoading(loadingCreateRestaurant || loadingDataRestaurant || loadingDeleteRestaurant || loadingUpdateRestaurant))
    return
  }, [
    loadingCreateRestaurant,
    loadingDataRestaurant,
    loadingDeleteRestaurant,
    loadingUpdateRestaurant
  ])

  return (
    <div>
      <div>
        {restaurantData ? (
          <div>
            <div className='relative'>
              <div className='relative w-full h-[450px] rounded-lg overflow-hidden drop-shadow-lg mb-28'>
                <Image
                  src={restaurantData.coverImage as ''}
                  alt=''
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <Row className='justify-between !items-end absolute -bottom-24 pl-6 w-full'>
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
                  <Button
                    onClick={() => deleteRestaurantMutation({
                      id: restaurantData.id
                    })}
                  >Delete</Button>
                </div>
              </Row>
            </div>

            <Column gap={6}>
              <Column className=''>
                <Row gap={4}>
                  <Text value={'name'} className='font-bold' />
                  <Text value={restaurantData.name as ''} />
                </Row>
                <Row gap={4}>
                  <Text value={'facebook'} className='font-bold' />
                  <Text value={restaurantData.facebook as ''} />
                </Row>
                <Row gap={4}>
                  <Text value={'lineId'} className='font-bold' />
                  <Text value={restaurantData.lineId as ''} />
                </Row>
                <Row gap={4}>
                  <Text value={'googleMapUrl'} className='font-bold' />
                  <Text value={restaurantData.googleMapUrl as ''} />
                </Row>
                <Row gap={4}>
                  <Text value={'phone'} className='font-bold' />
                  <Text value={restaurantData.phone as string | number} />
                </Row>
              </Column>

              <Row gap={4} className='flex-wrap'>
                {restaurantData?.menus && restaurantData?.menus?.length ? restaurantData?.menus?.map((item, key) => (
                  <div key={key}>
                    <div className='w-fit rounded-lg overflow-hidden'>
                      <Image
                        src={item.imageUrl}
                        alt=''
                        width={250}
                        height={250}
                      />
                    </div>
                    <Text value={item.name} />
                    <Text value={`${item.price} BTH`} />
                  </div>
                )) : ''}
                <div>

                </div>
              </Row>
              <div className='border'>
                <strong>Update Restaurant</strong>
                <div>
                  <input type="text" placeholder='name' />
                  <Button onClick={() => onUpdate({ id: restaurantData.id, data: mockDataUpdate })}>Update</Button>
                </div>
              </div>
            </Column>
          </div>
        ) : (
          <div>
            <div>
              <strong>Create Restaurant</strong>
              <div>
                <input type="text" placeholder='name' />
                <Button onClick={() => onCreateRestaurant(mockDataCreate)}>Create</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default withAuth(RestaurantPage)