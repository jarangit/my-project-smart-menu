/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import Column from '../molecules/column'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

type Props = {}

const SideMenuCMS = (props: Props) => {
  const { data: sessionData } = useSession()
  const menus = [
    {
      text: 'Dashboard',
      url: '/dashboard',
      subMenu: [],
    },
    {
      text: 'My Restaurant',
      url: `/restaurant/${sessionData?.user.id}`,
      subMenu: [
        {
          text: 'Menu',
          url: `/restaurant/menu`,

        },
        {
          text: 'Category',
          url: `/restaurant/category`,

        },
        {
          text: 'Topping',
          url: `/restaurant/topping`,

        },
        {
          text: 'Meat',
          url: `/restaurant/meat`,

        },
      ],
    },
    {
      text: 'My QR',
      url: '/my-qr',
      subMenu: [],
    },
  ]
  const styleText = 'font-semibold'
  return (
    <div className='p-6'>
      <Column gap={6} className='divide-y'>
        <Column gap={6}>
          {menus.map((item, key) => (
            <div key={key}>
              {!item.subMenu.length ? (
                <Link href={item.url}>
                  <div className={`${styleText}`}>{item.text}</div>
                </Link>
              ) : (
                <div>
                  <Link href={item.url} className={`${styleText}`}>{item.text}</Link>
                  {item.subMenu.map((sub, key) => (
                    <div key={key} className='pl-6'>
                      <Link href={sub.url}>
                        <div className={`${styleText}`}>{sub.text}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </Column>
        <Column gap={6} className='pt-6'>
          <div >
            <Link href={'/'}>
              <div className={`${styleText}`}>My Account</div>
            </Link>
          </div>
          <div >
            <Link href={'/'}>
              <div className={`${styleText}`}>Logout</div>
            </Link>
          </div>
        </Column>
      </Column>
    </div>
  )
}

export default SideMenuCMS