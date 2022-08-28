import React from 'react'
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Discover from '../components/Discover'
import Head from 'next/head';

const DiscoverPage = () => {
  return (
    <div>
      <Head>
        <title>Ruvits | Descubre</title>
        <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
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