import React, { useEffect } from 'react'
// import Image from 'next/image'
import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession, getSession } from "next-auth/client";


import {
  SimpleGrid, Box, Flex, chakra, Link, Button, Image, GridItem, Heading,
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
  Container,
  Stack,
  VStack,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';

import { Formik, Form, useFormik } from "formik";
import axios from "axios";
import swal from 'sweetalert';


const ProductDetails = ({ product }) => {
  const router = useRouter();
  const [session, loading] = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  
  

    
  
  
  const handleSubmit = (req, res) => {
    
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
          "success": "https://ruvits.com/successful",
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
        .then(response => {
          
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
          
          window.location.href = response.data.init_point
        
        })
        
    })
    
  };

  const handleProduct = (e) => {
    e.preventDefault();
    handleSubmit();
  }

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

                  swal("Tu producto fue eliminado.", "Ya no verás tu producto online.", "success")
                  .then(() => {router.push('/dashboard')})
                })
                break;
           
              default:
                swal("Tu producto no fue eliminado.", "Tu producto sigue online.", "success");
            }

          })
    })
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
    }
  })

  const updateItem = () => { 
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
              <Container 
                maxW={'7xl'} 
                key={product._id} 
                rounded={[null, "md"]}
                borderRadius="5px"
                boxShadow='2xl' 
                p='6'
                margin={[null, "null", "100px"]}
              >
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}>
                <Flex>
                  <Image
                    rounded={'md'}
                    alt={'imagen del producto'}
                    src={product.content[0]}
                    fit={'cover'}
                    align={'center'}
                    w={'100%'}
                    h={{ base: '100%', sm: '400px', lg: '500px' }}
                  />
                </Flex>
                <Stack spacing={{ base: 6, md: 10 }}>
                  <Box as={'header'}>
                    <Heading
                      lineHeight={1.1}
                      fontWeight={600}
                      fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                      {product.title}
                    </Heading>
                    <Text
                      color="gray.800"
                      fontWeight={300}
                      fontSize={'2xl'}>
                      ${product.price}
                    </Text>
                  </Box>
        
                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                      <StackDivider
                        borderColor="gray.700"
                      />
                    }>

                    
                    <Box>
                      
                      <Text
                        mt={1}
                        fontSize="sm"
                        color="gray.700"
                      >
                        {product.description}
                      </Text>
                    </Box>
                    
                    {/* <Box>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        color="gray.700"
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                        mb={'4'}>
                        Features
                      </Text>
        
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                        <List spacing={2}>
                          <ListItem>Chronograph</ListItem>
                          <ListItem>Master Chronometer Certified</ListItem>{' '}
                          <ListItem>Tachymeter</ListItem>
                        </List>
                        <List spacing={2}>
                          <ListItem>Anti‑magnetic</ListItem>
                          <ListItem>Chronometer</ListItem>
                          <ListItem>Small seconds</ListItem>
                        </List>
                      </SimpleGrid>
                    </Box>
                    <Box>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        color="gray.800"
                        fontWeight={'500'}
                        textTransform={'uppercase'}
                        mb={'4'}>
                        Product Details
                      </Text>
        
                      <List spacing={2}>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Between lugs:
                          </Text>{' '}
                          20 mm
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Bracelet:
                          </Text>{' '}
                          leather strap
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Case:
                          </Text>{' '}
                          Steel
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Case diameter:
                          </Text>{' '}
                          42 mm
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Dial color:
                          </Text>{' '}
                          Black
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Crystal:
                          </Text>{' '}
                          Domed, scratch‑resistant sapphire crystal with anti‑reflective
                          treatment inside
                        </ListItem>
                        <ListItem>
                          <Text as={'span'} fontWeight={'bold'}>
                            Water resistance:
                          </Text>{' '}
                          5 bar (50 metres / 167 feet){' '}
                        </ListItem>
                      </List>
                    </Box> */}
                  </Stack>
        
                  
                  
                  {/* <Button
                    w={'full'}
                    mt={8}
                    size={'lg'}
                    py={'7'}
                    bg="teal"
                    color="white"
                    textTransform={'uppercase'}
                    _hover={{
                      transform: 'translateY(2px)',
                      boxShadow: 'lg',
                    }}>
                    Comprar
                  </Button>
        
                  <Stack direction="row" alignItems="center" justifyContent={'center'}>
                    <MdLocalShipping />
                    <Text>El producto te llega a tu mail.</Text>
                  </Stack> */}
                </Stack>
              </SimpleGrid>
                
                      
                        
                        
                        <Formik>
                          <Form className="my-3" id="form-container" onSubmit={handleProduct}>
              
                            <div className="my-2 inputs_login d-flex">
                            
                              { session && (
                                  product.vendor !== session.user.name && (
                                    <Button 
                                      type='submit'
                                      w={'full'}
                                      mt={8}
                                      size={'lg'}
                                      py={'7'}
                                      bg="teal"
                                      color="white"
                                      textTransform={'uppercase'}
                                      _hover={{
                                        transform: 'translateY(2px)',
                                        boxShadow: 'lg',
                                      }}
                                    >Comprar</Button>
                                  )
                                )
                              }

                              { !session && (
                                  
                                    <Button
                                      onClick={ () => {
                                        swal({
                                          title: "Parece que todavía no estás registrado.",
                                          text: "Create una cuenta para poder comprar.",
                                          icon: "warning",
                                        })
                                      }
                                      }
                                      w={'full'}
                                      mt={8}
                                      size={'lg'}
                                      py={'7'}
                                      bg="teal"
                                      color="white"
                                      textTransform={'uppercase'}
                                      _hover={{
                                        transform: 'translateY(2px)',
                                        boxShadow: 'lg',
                                      }}
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
                                                    <Textarea 
                                                      placeholder={product.description} 
                                                      type='text'
                                                      //id='name'
                                                      name='description'
                                                      value={formik.values.description}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      required
                                                      maxLength="2000"
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
                      
        
                  <Stack direction="row" alignItems="center" justifyContent={'center'} mt={5}>
                    <MdLocalShipping />
                    <Text>El producto te llega a tu mail.</Text>
                  </Stack>
            </Container>
                    
            )
        }) : 
              <Flex alignItems="center" justifyContent="center" h="54vh">
                <p>¡Oopsss! Parece que este producto no existe.</p> 
              </Flex>
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