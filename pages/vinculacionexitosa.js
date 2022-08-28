import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import swal from 'sweetalert';
import Head from 'next/head';

const SuccessfulConnection = () => {


    const router = useRouter()
    useEffect(() => {
        swal({
            title: "¡Ya tenés vinculada tu cuenta de MercadoPago a la plataforma!",
            text: 'Ya podés empezar a vender tus productos.',
            icon: "success",
            button: "OK",
          })
          .then(() => {router.push('/dashboard')})
    }, [])

  return (
    <>
        <Head>
          <title>Vinculación exitosa</title>
          <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
        </Head>
        <Flex alignItems="center" justifyContent="center" h="54vh">
          <p>Tu cuenta de Mercado Pago fue vinculada. ¡Ahora podés crear tus productos y empezar a vender!</p>
        </Flex>
    </>
  )
}

export default SuccessfulConnection