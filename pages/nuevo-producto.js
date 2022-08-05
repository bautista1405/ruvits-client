import React from 'react'
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import NewProduct from '../components/NewProduct'

const NewProductPage = () => {
  const [session, loading] = useSession();

  return (
    <div>
      {!session && (<p>Debes estar logueado para ver esta página</p>)}
      {session && <NewProduct />}
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

export default NewProductPage