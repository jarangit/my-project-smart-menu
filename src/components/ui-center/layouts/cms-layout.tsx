import React, { useState } from 'react'
import TopMenuCMS from './top-menu-cms'
import SideMenuCMS from './side-menu-cms'
import { TbSquareToggle } from "react-icons/tb";
type Props = {
  children: React.ReactNode
}

const CMSLayout = ({ children }: Props) => {
  const [isShowSideMenu, setIsShowSideMenu] = useState(true)
  return (
    <div>
      <TopMenuCMS />
      <div className='flex min-h-screen my-container-outside-cms'>
        <div className={`${isShowSideMenu ? 'w-0 md:w-1/6' : 'w-0'} overflow-hidden transition-all border-r-2`}>
          <SideMenuCMS />
        </div>
        <div className={`${isShowSideMenu ? 'w-full md:w-5/6' : 'w-full'}  transition-all p-10 relative`}>
          <div>
            <div className='absolute top-3 left-3 cursor-pointer text-gray-700' onClick={() => setIsShowSideMenu(!isShowSideMenu)}>
              <TbSquareToggle size={25} />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CMSLayout