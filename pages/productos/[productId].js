import React, { useEffect } from 'react'
// import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import styles from '../../styles/ProductDetails.module.css'

import { SimpleGrid, Box, Flex, chakra, Link, Button, Image, GridItem, Stackc, Heading } from '@chakra-ui/react'
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
  InputGroup,
  Textarea,
  FormHelperText,
  Icon,
  VisuallyHidden,
  Text,
} from '@chakra-ui/react'

import { Formik, Form } from "formik";
import axios from "axios";
import swal from 'sweetalert';
import { useFormik } from "formik";


const ProductDetails = ({ product }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  
  

    
  
  
  const handleSubmit = async (req, res) => {
    
    const appID = process.env.APP_ID
    
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
          "success": "/successful",
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
        "Authorization": process.env.PROD_TOKEN,
        "Content-Type": "application/json",
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      };
      
      axios.post(URL, data, {headers} )
        .then( () => {
          await router.push(response.data.init_point)
          if(typeof window !== 'undefined') {
        
            const testProduct = localStorage.setItem('product', JSON.stringify({
              id: product._id,
              title: product.title,
              vendor: product.vendor,
              description: product.description,
              price: product.price,
              content: product.content,
            }))
            
          }
          
        
        })
        
        
    })
    
  };

  const deleteItem = (req, res) => {
    product.map(product => {
        const id = product._id
        swal({
          title: "¿Estás seguro que querés eliminar este producto?",
          buttons: {
            cancel: "No",
            positive: {
              text: "Sí",
              value: "positive",
            }
          }, 
          icon: "warning",
          }).then( (value) => {

            switch (value) {
           
              case "positive":
                fetch('/api/misproductos', {
                    
                    method: 'POST',
                    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                    body: JSON.stringify({
                        id: id
                    }),
                }).then( () => {

                  swal("Tu producto fue exitosamente eliminado.", "Ya no verás tu producto online.", "success")
                  .then(() => {router.push('/dashboard')})
                })
                break;
           
              default:
                swal("Tu producto no fue eliminado.", "Tu producto sigue online.", "success");
            }

          })
    })
  }

  const updateItem = (req, res) => { 
    product.map(product => {
        const id = product._id
        fetch('/api/update', {
            
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
      <div >
        
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
              <Box 
                margin="auto" 
                shadow="base"
                rounded={[null, "md"]}
                borderRadius="5px"
                backgroundColor="gray.100"
                w={["80vw", "100vw", "90vw", "83vw", "86vw"]}
                mb={20}
                key={product._id}
                
              >
                <SimpleGrid
                  display={{ base: "initial", md: "grid" }}
                  columns={{ md: 3 }}
                  spacing={{ md: 6 }}
                  
                >
                  <GridItem colSpan={{ md: 1 }} >
                    <Box px={[4, 0]} py={[4, 0]} margin={["30px", "30px", "30px", "30px", "30px"]}  >
                      <Heading fontSize="lg" fontWeight="md" lineHeight="6" >
                        Nombre
                      </Heading>
                      <Text
                        mt={1}
                        fontSize="sm"
                        color="gray.700"
                      >
                        {product.title}
                      </Text>
                    </Box>

                    <Box px={[4, 0]} margin="30px"  >
                      <Heading fontSize="lg" fontWeight="md" lineHeight="6" >
                        Descripción
                      </Heading>
                      <Text
                        mt={1}
                        fontSize="sm"
                        color="gray.700"
                      >
                        {product.description}
                      </Text>
                    </Box>

                    <Box px={[4, 0]} margin="30px"  >
                      <Heading fontSize="lg" fontWeight="md" lineHeight="6" >
                        Precio
                      </Heading>
                      <Text
                        mt={1}
                        fontSize="sm"
                        color="gray.700"
                      >
                        ${product.price}
                      </Text>
                    </Box>

                    <Box px={[4, 0]} margin="30px"  >
                      <Heading fontSize="lg" fontWeight="md" lineHeight="6" >
                        Vendedor
                      </Heading>
                      <Text
                        mt={1}
                        fontSize="sm"
                        color="gray.700"
                      >
                        {product.vendor}
                      </Text>
                    </Box>

                    <Box mt={220} >
                      <Flex  >
                        
                        
                        <Formik>
                          <Form className="my-3" id="form-container" onSubmit={handleSubmit}>
              
                            <div className="my-2 inputs_login d-flex">
                            
                              { session && (
                                  product.vendor !== session.user.name && (
                                    <Button 
                                      colorScheme='teal' 
                                      variant='solid' 
                                      type="submit"
                                      marginLeft={5}
                                    >Comprar</Button>
                                  )
                                )
                              }

                              { !session && (
                                  
                                    <Button 
                                      colorScheme='teal' 
                                      variant='solid' 
                                      type="submit"
                                      marginLeft={5}
                                    >Comprar</Button>
                                  
                                )
                              } 
                              
                              { session && (
                                  product.vendor === session.user.name && (

                                    <>

                                      <Button onClick={onOpen} ml={5} variant="outline" colorScheme="cyan">Editar</Button>
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
                  </GridItem>
                  <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }} >
      
                    
                    
                      
                        <Image
                          width="full"
                          height={["300px", "600px", "600px", "600px", "600px"]}
                          borderRadius="4px"
                          fit="cover"
                          src={product.content[0]}
                          alt="Imagen del producto"
                        />

                        
                      
                    
      
                  </GridItem>
        </SimpleGrid>
      </Box>
                    
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