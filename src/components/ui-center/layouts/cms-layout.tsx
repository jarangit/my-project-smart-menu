import React, { useState } from 'react'
import TopMenuCMS from './top-menu-cms'
import SideMenuCMS from './side-menu-cms'
import { TbSquareToggle } from "react-icons/tb";
import Loading from '../atoms/loading';
type Props = {
  children: React.ReactNode
}

const CMSLayout = ({ children }: Props) => {
  const [isShowSideMenu, setIsShowSideMenu] = useState(true)
  return (
    <div className=''>
      <TopMenuCMS />
      <div className='flex my-container-outside-cms'>
        <div className={`${isShowSideMenu ? 'w-0 md:w-1/6' : 'w-0'} overflow-hidden transition-all border-r-2 max-h-[90vh]`}>
          <SideMenuCMS />
        </div>
        <div className={`${isShowSideMenu ? 'w-full md:w-5/6' : 'w-full'}  transition-all p-10 pt-3 relative max-h-[90vh] border overflow-y-scroll`}>
          <div>
            <div className='absolute top-3 left-1 cursor-pointer text-gray-700' onClick={() => setIsShowSideMenu(!isShowSideMenu)}>
              <TbSquareToggle size={25} />
            </div>
            {children}
          </div>
        </div>
      </div>
      <Loading />
    </div>
  )
}

export default CMSLayout