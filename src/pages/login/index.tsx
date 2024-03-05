/* eslint-disable @typescript-eslint/ban-types */
import React from 'react'
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from 'next/router';
import Button from '@ui-cms/atoms/button';
type Props = {}

const LoginPage = ({}) => {
  const { data: session } = useSession()
  const {push} = useRouter()
  console.log(session)

  if (session) {
    void push('/')
    return
  }

  return (
    <div>
      <Button onClick={() => signIn()} >Sign in with Google</Button>
    </div>
  )
}

export default LoginPage