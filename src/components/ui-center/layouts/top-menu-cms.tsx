/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import Row from '../molecules/row'
import Button from '@ui-cms/atomics/button'


const TopMenuCMS = () => {
  const { data: sessionData } = useSession()
  return (
    <div>
      {/* nav */}
      <div className="p-6 border-b-2">
        <Row className="flex  justify-end gap-6">
          <div>
            {sessionData ? (
              <Row gap={4}>
                <div>
                  {sessionData?.user.name}
                </div>
                <Button onClick={() => signOut()}>Logout</Button>
              </Row>
            ) : <Link href={`/login`}>Login</Link>}
          </div>
        </Row>
      </div>
    </div>
  )
}

export default TopMenuCMS