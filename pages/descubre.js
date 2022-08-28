import React from 'react'
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Discover from '../components/Discover'
import Head from 'next/head';

const DiscoverPage = () => {
  return (
    <div>
      <Head>
        <title>Ruvits | Descubre</title>
      </Head>
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