import React,  { useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import axios from 'axios';


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
    axios.post(sendEmailUrl, {product}, {headers});
    axios.post(createPaymentUrl, {product})
    .then( () => {
      router.push('/')
    })
  }, [sendEmailUrl, createPaymentUrl])
  
  return (
    <>
      <p>Tu compra ha sido realizada con éxito, a la brevedad te llegará un email con el producto que compraste. ¡Gracias!</p>
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