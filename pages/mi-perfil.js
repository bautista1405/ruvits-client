import React from 'react'
import { signIn, signOut, useSession, getSession } from "next-auth/client";

const myProfile = () => {
  return (
    <div>myProfile</div>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default myProfile