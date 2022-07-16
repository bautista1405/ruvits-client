import React, { useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'

import styles from '../../styles/ProductDetails.module.css'

import { SimpleGrid, Box, Flex, chakra, Link, Button } from '@chakra-ui/react'
import { Formik, Form } from "formik";
import axios from "axios";

const ProductDetails = ({ product }) => {
  const router = useRouter()

  const handleSubmit = async (req, res) => {

    const authURL = process.env.NEXT_PUBLIC_MP_API_AUTH
    const authToken = process.env.NEXT_PUBLIC_MP_AUTH0_TOKEN
    const appID = process.env.APP_ID
    const appSecret = process.env.APP_SECRET
    const pubKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_KEY
    const grant_type = 'authorization_code'
    const myAccessToken = process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN
    
    
    product.map(product => {
      const URL = `https://api.mercadopago.com/checkout/preferences?access_token=${product.mpAccessToken}` //url with the vendor's token
      const data = {
        "items": [
          {
            "title": product.title,
            "quantity": 1,
            "unit_price": product.price,
            "picture_url": product.content[0]
          }
        ],
        "marketplace": appID,
        "marketplace_fee": 1,
        "auto_return": "approved",
        "back_urls": {
          "success": "http://localhost:3000/successful"
        },
        "payment_methods": {
          "excluded_payment_methods": [
            {
              "id": "atm"
            }
          ],
          "excluded_payment_types": [
            {
              "id": "ticket"
            }
          ],
        },
      };
      
      const headers = { 
        "Authorization": process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        //'access_token': 'APP_USR-8558616783850676-071520-0342adc3b708c7e413a6178038ce1785-1143711689',
        'public_key': pubKey
      };

            axios.post(URL, data, {headers} )
              .then(response => {
                console.log(response);
                console.log(URL)
                window.location.href = response.data.init_point;
              })
               
    })
    
  };

  return (
    <>
      <div className={styles.layout}>
        
       <Head>
          {product.map(product => {
            return (
              <title key={product._id}> {`Ruvits | ${product.title}`} </title>

            )
          })}
          
       </Head>
          
        {product.length > 0 ?
          product.map(product => {
                
            return (
              <Flex
                bg="transparent"
                p={50}
                w="full"
                alignItems="center"
                justifyContent="center"
                shadow="base"
                rounded={[null, "md"]}
                overflow={{ sm: "hidden" }}
                key={product._id}
              >
                <Box
                  mx="auto"
                  rounded="lg"
                  shadow="md"
                  bg="white"
                  _dark={{
                    bg: "gray.800",
                  }}
                  maxW="2xl"
                  
                >
                  <Image
                    width="672px"
                    height="500px"
                    fit="cover"
                    src={product.content[0]}
                    alt="Article"
                  />

                  <Box p={6}>
                    <Box>
                      <chakra.span
                        fontSize="xs"
                        textTransform="uppercase"
                        color="brand.600"
                        _dark={{
                          color: "brand.400",
                        }}
                      >
                        {product.title}
                      </chakra.span>
                      <Link
                        display="block"
                        color="gray.800"
                        _dark={{
                          color: "white",
                        }}
                        fontWeight="bold"
                        fontSize="2xl"
                        mt={2}
                        _hover={{
                          color: "gray.600",
                          textDecor: "underline",
                        }}
                      >
                        {product.title}
                      </Link>
                      <chakra.p
                        mt={2}
                        fontSize="sm"
                        color="gray.600"
                        _dark={{
                          color: "gray.400",
                        }}
                      >
                       {product.description}
                      </chakra.p>
                    </Box>

                    <Box mt={8}>
                      <Flex alignItems="center" justifyContent="center">
                        <Flex alignItems="center">
                          {/* <Image
                            h={10}
                            fit="cover"
                            rounded="full"
                            src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                            alt="Avatar"
                          /> */}
                          <Link
                            mx={2}
                            fontWeight="bold"
                            color="gray.700"
                            _dark={{
                              color: "gray.200",
                            }}
                          >
                            Jone Doe
                          </Link>
                        </Flex>
                        <chakra.span
                          mx={1}
                          fontSize="sm"
                          color="gray.600"
                          _dark={{
                            color: "gray.300",
                          }}
                        >
                          21 SEP 2015
                        </chakra.span>
                        <Formik>
                          <Form className="my-3" id="form-container" onSubmit={handleSubmit}>
              
                            <div className="my-2 inputs_login d-flex">
                            
                            <Button 
                              colorScheme='teal' 
                              variant='outline' 
                              type="submit"
                              marginLeft={5}
                            >Comprar</Button>
                            </div>
                          </Form>
                        </Formik>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </Flex>
                    
            )
        }) : <p>¡Oopsss! Este producto no existe.</p> 
        }
           
        
      </div>
    </>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch('http://3.95.83.1:3000/api/products')
  const products = await res.json()

  // Get the paths we want to pre-render based on products
  const paths = products.map((product) => ({
    params: { productId: product._id.toString() },
    
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  
  return { paths, fallback: 'blocking' }
}
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({params}) {
  const res = await fetch('http://3.95.83.1:3000/api/products')
  const products = await res.json();
  const product = products.filter(product => product.title === params.productId)
  
  return {
    props: {
      product
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}


// export async function getStaticProps({ params }) {
//   const productId = params.productId.replace(/\-/g, '+')
//   const results = await fetch(`http://3.95.83.1:3000/api/products?title=${productId}`).then(res => res.json());
//   return {
//     props: {
//       product: results[0]
//     }
//   }
// }

// export async function getStaticPaths() {
//   const products = await fetch('http://3.95.83.1:3000/api/products').then(res => res.json());
//   const paths = products.map(product => {
//     const productId = product.title.toLowerCase().replace(/ /g, '-');
//     return {
//       params: {
//         productId
//       }
//     }
//   });
//   console.log(paths)
//   return {
//     paths,
//     fallback: false
//   }
// }

// export async function getServerSideProps(context) {
//   const productId = context.params.productId.replace(/\-/g, '+')
//   const res = await fetch(`http://3.95.83.1:3000/api/products?product=${productId}`);
//   const productsList = await res.json();
//   const [product] = productsList; // Get first item in array returned from API
//   return {
//     props: {
//       productId,
//       product
//     }
//   }
// }

// export async function getStaticPaths(){
//   const request  = await fetch('http://3.95.83.1:3000/api/products')
//   const products = await request.json()

//   const paths = products.map(product =>`/productos/${product.title}`)
//   // const paths = products.map(product =>({
//   //     params: {productId: product._id.toString()},
//   // }))

//   return {
//       paths,
//       fallback: false,
//   }
// }

// export async function getStaticProps(){
//   const request = await fetch('http://3.95.83.1:3000/api/products')
//   const product = await request.json()

//   return{
//       props:{
//           product
//       }
//   }
// }


export default ProductDetails