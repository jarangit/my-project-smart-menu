/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Row from '../molecules/row'


const Menu = () => {
  const { data: sessionData } = useSession()
  return (
    <div>
      {/* nav */}
      <div className="p-6 bg-black text-white">
        <Row className="flex  justify-end gap-6">
          <Link href={'/'}>Home</Link>
          <Link href={`/restaurant/${sessionData?.user.id}`}>My Restaurant</Link>
          <div>
            {sessionData ? (
              <Row gap={4}>
                <div>
                  {sessionData?.user.name}
                </div>
                <button onClick={() => signOut()}>Logout</button>
              </Row>
            ) : <Link href={`/login`}>Login</Link>}
          </div>
        </Row>
      </div>
    </div>
  )
}

export default Menu