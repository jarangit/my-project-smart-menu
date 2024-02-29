/* eslint-disable @typescript-eslint/ban-types */
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
    <div>
      <div>DashboardPage
      </div>

      <div className='border'>
        <div>standard dropzone</div>
        <div>
          <StandardDropzone />
        </div>
      </div>
   
    </div>
  )
}

export default withAuth(DashboardPage)