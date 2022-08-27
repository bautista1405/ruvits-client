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

import { Formik, Form } from "formik";
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
              <Container maxW={'7xl'}>
              <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 18, md: 24 }}>
                <Flex>
                  <Image
                    rounded={'md'}
                    alt={'product image'}
                    src={
                      'https://images.unsplash.com/photo-1596516109370-29001ec8ec36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyODE1MDl8MHwxfGFsbHx8fHx8fHx8fDE2Mzg5MzY2MzE&ixlib=rb-1.2.1&q=80&w=1080'
                    }
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
                      Automatic Watch
                    </Heading>
                    <Text
                      color={useColorModeValue('gray.900', 'gray.400')}
                      fontWeight={300}
                      fontSize={'2xl'}>
                      $350.00 USD
                    </Text>
                  </Box>
        
                  <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={'column'}
                    divider={
                      <StackDivider
                        borderColor={useColorModeValue('gray.200', 'gray.600')}
                      />
                    }>
                    <VStack spacing={{ base: 4, sm: 6 }}>
                      <Text
                        color={useColorModeValue('gray.500', 'gray.400')}
                        fontSize={'2xl'}
                        fontWeight={'300'}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                        diam nonumy eirmod tempor invidunt ut labore
                      </Text>
                      <Text fontSize={'lg'}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
                        aliquid amet at delectus doloribus dolorum expedita hic, ipsum
                        maxime modi nam officiis porro, quae, quisquam quos
                        reprehenderit velit? Natus, totam.
                      </Text>
                    </VStack>
                    <Box>
                      <Text
                        fontSize={{ base: '16px', lg: '18px' }}
                        color={useColorModeValue('yellow.500', 'yellow.300')}
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
                        color={useColorModeValue('yellow.500', 'yellow.300')}
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
                    </Box>
                  </Stack>
        
                  <Button
                    rounded={'none'}
                    w={'full'}
                    mt={8}
                    size={'lg'}
                    py={'7'}
                    bg={useColorModeValue('gray.900', 'gray.50')}
                    color={useColorModeValue('white', 'gray.900')}
                    textTransform={'uppercase'}
                    _hover={{
                      transform: 'translateY(2px)',
                      boxShadow: 'lg',
                    }}>
                    Add to cart
                  </Button>
        
                  <Stack direction="row" alignItems="center" justifyContent={'center'}>
                    <MdLocalShipping />
                    <Text>2-3 business days delivery</Text>
                  </Stack>
                </Stack>
              </SimpleGrid>
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