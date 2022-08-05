import React from 'react'
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Discover from '../components/Discover'

const DiscoverPage = () => {
  return (
    <div>
        <Discover />
    </div>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default DiscoverPage