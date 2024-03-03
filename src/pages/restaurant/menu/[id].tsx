/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Column from '@ui-center/molecules/column'
import Row from '@ui-center/molecules/row'
import Text from '@ui-cms/atomics/text'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { api } from '~/utils/api'

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {}

const MenusDetailPage = () => {
  const { query } = useRouter()
  const { data: dataMenu } = api.menu.getOne.useQuery({
    id: Number(query.id)
  })
  console.log('%cMyProject%cline:18%cdataMenu', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(237, 222, 139);padding:3px;border-radius:2px', dataMenu)

  return (
    <div>
      {dataMenu ? (
        <Column>
          <Text value={dataMenu.name} className='text-xl font-bold  uppercase' />
          <Image
            src={dataMenu.imageUrl as ''}
            alt=""
            width={300}
            height={300}
          />
          <Row>
            <Text value={"Price"} />
            <Text value={dataMenu.price} />
          </Row>
        </Column>

      ) : ''}
    </div>
  )
}

export default MenusDetailPage