import Head from 'next/head'
import Image from 'next/image'

import { signIn, signOut, useSession, getSession } from "next-auth/client";

import Home from '../components/Home'

export default function HomePage() {

  return (
    <div>
      <Head>
        <title>Ruvits</title>
        <meta
          name="description"
          content="Marketplace de productos digitales"
        />
        <meta name="twitter:image" content="/assets/ruvitsLogo-bg.png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
      </Head>
      <Home />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}