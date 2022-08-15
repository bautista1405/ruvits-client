import React from 'react'
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import {
  Flex,
  Button,
} from '@chakra-ui/react'
import NewProduct from '../components/NewProduct'

const NewProductPage = () => {
  const [session, loading] = useSession();

  return (
    <div>
      {!session && (
          <Flex alignItems="center" justifyContent="center" h="54vh">
            Para subir tu producto debes  
            <Button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "http://localhost:3000/nuevo-producto",
                  })
                }
                
                variant="link"
                ml={1}
            >
                iniciar sesión.
            </Button>
          </Flex>
      )}
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