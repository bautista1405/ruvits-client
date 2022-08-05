import React from 'react'
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import Pricing from '../components/Pricing'

const PricingPage = () => {
  return (
    <div>
        <Pricing />
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

export default PricingPage