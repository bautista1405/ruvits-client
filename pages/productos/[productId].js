import React, { useEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import styles from '../../styles/ProductDetails.module.css'

import { SimpleGrid, Box, Flex, chakra, Link, Button } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

import { Formik, Form } from "formik";
import axios from "axios";
import swal from 'sweetalert';
import { useFormik } from "formik";
//import nodemailer from "nodemailer";
//import { payment } from 'mercadopago'



const ProductDetails = ({ product }) => {
  const router = useRouter()
  const [session, loading] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  
  

    
  
  
  const handleSubmit = async (req, res) => {
    
    const authURL = process.env.NEXT_PUBLIC_MP_API_AUTH
    const authToken = process.env.NEXT_PUBLIC_MP_AUTH0_TOKEN
    const appID = process.env.APP_ID
    const appSecret = process.env.APP_SECRET
    const pubKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_KEY
    const grant_type = 'authorization_code'
    const myAccessToken = process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN
    const successfulUrl = 'http://localhost:3000/api/sendmail'
    const paymentUrl = 'https://api.mercadopago.com/v1/payments/{id}'
    
    
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
          "success": "http://localhost:3000/successful",
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
      
      
      const purchasedProduct = {
        "id": product._id,
        "title": product.title,
        "quantity": 1,
        "unit_price": product.price,
        "content": product.content[0],
      }
      
      
      
      
      const headers = { 
        "Authorization": process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN,
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      };
      
      axios.post(URL, data, {headers} )
        .then(response => {
          //console.log(response);
          if(typeof window !== 'undefined') {
        
            const testProduct = localStorage.setItem('product', JSON.stringify({
              id: product._id,
              title: product.title,
              vendor: product.vendor,
              description: product.description,
              price: product.price,
              content: product.content,
            }));
          }
          
          //window.location.href = response.data.init_point;
        })

    })
    
  };

  const deleteItem = (req, res) => {
    product.map(product => {
        const id = product._id
        fetch('http://localhost:3000/api/misproductos', {
            
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                id: id
            }),
        })
        swal({
            title: "¡Tu producto fue eliminado!",
            text: "Ya no vas a ver tu producto online.",
            icon: "success",
            }).then(() => {router.push('/dashboard')})
    })
  }

  const updateItem = (req, res) => { 
    product.map(product => {
        const id = product._id
        fetch('http://localhost:3000/api/update', {
            
            method: 'PATCH',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            body: JSON.stringify({
                id: id,
                title: formik.values.title,
                description: formik.values.description,
                price: formik.values.price,
            }),
        })
        swal({
            title: "¡Tu producto fue actualizado!",
            text: "Ahora podes ver tu producto con los cambios correspondientes.",
            icon: "success",
        }).then(() => {router.push('/dashboard')})
    })
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
    },
  });


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
                backgroundColor="gray.100"
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
                            
                              { session && (
                                  product.vendor !== session.user.name && (
                                    <Button 
                                      colorScheme='teal' 
                                      variant='outline' 
                                      type="submit"
                                      marginLeft={5}
                                    >Comprar</Button>
                                  )
                                )
                              }

                              { !session && (
                                  
                                    <Button 
                                      colorScheme='teal' 
                                      variant='outline' 
                                      type="submit"
                                      marginLeft={5}
                                    >Comprar</Button>
                                  
                                )
                              } 
                              
                              { session && (
                                  product.vendor === session.user.name && (

                                    <>

                                      <Button onClick={onOpen} ml={5}>Editar</Button>
                                            {/* <Button ml={4} ref={finalRef}>
                                              I'll receive focus on close
                                            </Button> */}

                                            <Modal
                                              initialFocusRef={initialRef}
                                              finalFocusRef={finalRef}
                                              isOpen={isOpen}
                                              onClose={onClose}
                                            >
                                              <ModalOverlay />
                                              <ModalContent>
                                                <ModalHeader>Edita tu producto</ModalHeader>
                                                <ModalCloseButton />
                                                <ModalBody pb={6}>
                                                  <FormControl>
                                                    <FormLabel>Nombre</FormLabel>
                                                    <Input 
                                                      ref={initialRef} 
                                                      placeholder={product.title} 
                                                      type='text'
                                                      id='name'
                                                      name='title'
                                                      value={formik.values.title}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      required
                                                    />
                                                  </FormControl>

                                                  <FormControl mt={4}>
                                                    <FormLabel>Descripción</FormLabel>
                                                    <Input 
                                                      placeholder={product.description} 
                                                      type='text'
                                                      //id='name'
                                                      name='description'
                                                      value={formik.values.description}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      required
                                                    />
                                                  </FormControl>

                                                  <FormControl mt={4}>
                                                    <FormLabel>Precio</FormLabel>
                                                    <Input 
                                                      placeholder={product.price} 
                                                      type='text'
                                                      id='name'
                                                      name='price'
                                                      value={formik.values.price}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      required
                                                    />
                                                  </FormControl>


                                                </ModalBody>

                                                <ModalFooter>
                                                  <Button colorScheme='blue' mr={3} onClick={updateItem}>
                                                    Guardar
                                                  </Button>
                                                  <Button onClick={onClose}>Cancelar</Button>
                                                </ModalFooter>
                                              </ModalContent>
                                            </Modal>
                                              <Button 
                                                colorScheme='red' 
                                                variant='outline' 
                                                marginLeft={5}
                                                onClick={deleteItem}
                                              >Eliminar</Button>

                                    </>
                                  )
                                
                                )
                              }

                            </div>
                          </Form>
                        </Formik>
                      </Flex>
                    </Box>
                  </Box>
                </Box>
              </Flex>
                    
            )
        }) : <p>¡Oopsss! Parece que este producto no existe.</p> 
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


// export async function getServerSideProps(ctx) {
//   return {
//     props: {
//       session: await getSession(ctx)
//     }
//   }
// }


export default ProductDetails