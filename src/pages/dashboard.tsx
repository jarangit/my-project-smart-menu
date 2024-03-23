/* eslint-disable @typescript-eslint/ban-types */
import Column from '@ui-center/molecules/column'
import Card from '@ui-cms/atoms/card'
import Text from '@ui-cms/atoms/text'
import Image from 'next/image'
import React from 'react'
import { MultipartDropzone } from '~/components/ui-cms/molecules/muti-dropzone'
import { StandardDropzone } from '~/components/ui-cms/molecules/standard-dropzone'
import { api } from '~/utils/api'
import withAuth from '~/utils/withAuth'

type Props = {}

const DashboardPage = (props: Props) => {
  const { data, isLoading, error } = api.s3.getObjects.useQuery()

  return (
    <Column gap={2}>
      <Text value={"Dashboard"} className='text-2xl font-bold' />
      <div className='grid grid-cols-3 gap-3'>
        <Card className='!bg-main text-white'>
          <div>
            <Text value={'27'}  className='text-6xl font-bold'/>
            <Text value={'total scan'}  className='font-medium'/>
          </div>
        </Card>
        <Card>
          <div>item</div>
        </Card>
        <Card>
          <div>item</div>
        </Card>
      </div>
    </Column>
  )
}

export default withAuth(DashboardPage)