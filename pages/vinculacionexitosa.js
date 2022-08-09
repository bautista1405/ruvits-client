import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex } from '@chakra-ui/react'
import swal from 'sweetalert';

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
        <Flex alignItems="center" justifyContent="center" h="54vh"></Flex>
    </>
  )
}

export default SuccessfulConnection