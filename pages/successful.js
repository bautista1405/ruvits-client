import React,  { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import { Flex } from '@chakra-ui/react'
import axios from 'axios';
import Head from 'next/head';


const SuccessfulPage = () => {             //from this page we have to trigger the API call to send the email to the user with the product
  
  const router = useRouter()

  const sendEmailUrl = '/api/sendmail'
  const createPaymentUrl = '/api/createpayment'

  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  }
  
  useEffect( () => {
    // const queryString = window.location.search;
    // console.log(queryString);
    // const urlParams = new URLSearchParams(queryString);
    // const id = urlParams.get('merchant_order_id')
    // console.log(id);
    // axios.get(`https://api.mercadopago.com/merchant_orders/${id}`, {headers})
    // console.log(res)
    const product = localStorage.getItem('product');
    
    axios.post(sendEmailUrl, {product}, {headers})
    .then( () => {

      axios.post(createPaymentUrl, {product})
    })
    .then( () => {
      router.push('/')
    })
  }, [sendEmailUrl, createPaymentUrl])
  
  return (
    <>
      <Head>
        <title>Compra exitosa</title>
        <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
      </Head>
      <Flex alignItems="center" justifyContent="center" h="54vh">
        <p>Tu compra ha sido realizada con éxito, a la brevedad te llegará un email con el producto que compraste. ¡Gracias!</p>
      </Flex>
    </>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default SuccessfulPage