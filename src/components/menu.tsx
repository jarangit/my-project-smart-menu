/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link'
import React, { useState } from 'react'


const Menu = () => {
  const [userData, setUserData] = useState<any>()
  const userId = 1
  return (
    <div>
      {/* nav */}
      <div className="p-6 bg-blue-900">
        <div className="flex  justify-end gap-6">
          <Link href={'/'}>Home</Link>
          <Link href={`/restaurant/${userId}`}>My Restaurant</Link>
          <div>
            {userData ? (
              <div>{userData?.email}</div>
            ) : <Link href={`/login`}>Login</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Menu