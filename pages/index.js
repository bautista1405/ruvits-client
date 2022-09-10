import Head from 'next/head'
import Image from 'next/image'

import { NextSeo } from 'next-seo';
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import Home from '../components/Home'

export default function HomePage() {

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
      </Head>

      <NextSeo 
        title="Ruvits"
        description="Marketplace de productos digitales."
      />

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