// @typescript-eslint/no-explicit-any
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Row from '~/components/ui-center/molecules/row'
import { api } from '~/utils/api'


const ManageImageStore = () => {
  const [dataImages, setDataImages] = useState<any[]>()
  const { data: imageData } = api.imageStores.getAll.useQuery()



  return (
    <div>
      <div>All image </div>
      <Row className='flex-wrap' gap={6}>
        {imageData && imageData.length ? imageData.map((item, key) => (
          <div key={key} className=' bg-slate-600 h-[250px] w-[250px] relative rounded-xl overflow-hidden'>
            <Image
              src={item.url}
              alt=''
              fill
              style={{ objectFit: 'contain' }}
              onError={(e: any) => {
                console.log('image error')
              }}
            // onError={(e: any) => {
            //   e.target.src = "/assets/images/error-image.jpg"
            // }}
            />
          </div>
        )) : ''}
      </Row>

    </div>
  )
}

export default ManageImageStore