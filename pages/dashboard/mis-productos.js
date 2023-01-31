import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import Image from 'next/image'
import Link from 'next/link'


import { signIn, signOut, useSession, getSession, session } from "next-auth/client";
import {
    SimpleGrid,
    chakra,
    Flex,
    Text,
    Icon,
    Tooltip,
    Box,
    Button, Badge, Stack, Image, Divider
  } from '@chakra-ui/react'
  
  import {
    FiHome,
    FiPieChart,
    FiDollarSign,
    FiBox,
    FiCalendar,
    FiChevronDown,
    FiChevronUp,
    FiPlus,
    FiCreditCard,
    FiSearch,
    FiBell
  } from "react-icons/fi"
  import {CgProfile} from 'react-icons/cg'
import axios from 'axios'
import swal from 'sweetalert';
import {BsInfoCircle} from "react-icons/bs"
import {BsFillStarFill} from "react-icons/bs"

import image from '../../assets/transaction.png'
import Head from 'next/head';

const MyProducts = () => {
    
    const url = "/api/getproducts"
    const getRating = '/api/getproductrating'
    
    const [products, setProducts] = useState([]);
    const [rating, setRating] = useState([]);
    const [session, loading] = useSession();
    const router = useRouter()
    
    
    useEffect(() => {
        if(session) {

            axios.get(url).then((res) => {
                setProducts(res?.data?.items || []);
                
            })
            axios.get(getRating)
            .then((res) => {
                setRating(res?.data?.rating || [])
            })
        }
    }, [url, getRating])
    
    const product = products.filter(product => product.vendor === session.user.name)
    
  return (
    <>
        <Head>
            <title>Mis productos</title>
            <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
        </Head>
        {!session && (
            <Flex alignItems="center" justifyContent="center" h="54vh">
                Para ver tus productos debes  
                <Button
                    onClick={() =>
                    signIn("google", {
                        callbackUrl: "/dashboard/mis-productos",
                    })
                    }
                    
                    variant="link"
                    ml={1}
                >
                    iniciar sesión.
                </Button>
            </Flex>
        )}           

        {session && product.length == 0 && (
            <>

            <Flex 
                flexDir={["column", "column", "row", "row", "row"]}
                maxW="2000px"
                rounded={[null, "md"]}
                borderRadius="5px"
                boxShadow='2xl' 
                p='6'
                margin={[null, "null", "100px"]}
                h={["null", "null", "40vh", "50vh", "60vh"]}
            >
                {/* Column 1 */}

                <Flex
                    w={["100%", "100%", "10%", "15%", "15%"]}
                    flexDir="column"
                    alignItems="center"
                    padding={10}
                    color="gray.700"
                    pl={[null, null, 100, 100, 5]}
                >
                <Flex
                    flexDir="column"
                    h={[null, null, "100vh"]}
                    justifyContent="space-between"
                >
                    <Flex
                        flexDir="column"
                        as="nav"
                    >

                                    <Flex
                                        flexDir={["column", "column", "column", "column", "column"]}
                                        align={["center", "center", "center", "flex-start", "flex-start"]}
                                        wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                                        justifyContent="center"
                                    >
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                            <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                            <Link display={["none", "none", "flex", "flex", "flex"]} href='/dashboard' _hover={{ textDecor: 'none' }}>
                                                <Text className="active" fontSize="18px" ml={2} style={{cursor: 'pointer'}}>Inicio</Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                            <Icon as={FiDollarSign} fontSize="2xl" className="active-icon" />
                                            <Link href='/dashboard/pagos' _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                                <Text fontSize="18px" ml={1} style={{cursor: 'pointer'}}>
                                                        Autorización de pagos {" "} {" "}
                                                    <Tooltip label="Para poder vender tus productos, tenés que vincular tu cuenta de MercadoPago">
                                                        <span> <Icon as={BsInfoCircle} /> </span>
                                                    </Tooltip>
                                                </Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                                <Icon as={FiBox} fontSize="2xl" />
                                            <Link href="/dashboard/mis-productos" _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                            
                                                <Text fontSize="18px" ml={2} style={{cursor: 'pointer'}}>Mis productos</Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                                <Icon as={CgProfile} fontSize="2xl" />
                                            <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]} href="/dashboard/mi-perfil">
                                            
                                                <Text fontSize="18px" ml={2} style={{cursor: 'pointer'}}>Mi perfil</Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={10}>
                                            <Link href="/nuevo-producto">
                                            <Button colorScheme="white" variant="outline">+ Nuevo producto</Button>
                                            </Link> 
                                        </Flex>
                                    </Flex>
                    </Flex>
                </Flex>
            </Flex>


            
                            
                        <Flex 
                            display="column" 
                            justifyContent="center" 
                            w={["100%", "100%", "100%", "100%", "100%"]}
                            mt={10}
                            pl={[0, 100, 100]} 
                            rounded={[null, "md"]}
                            borderRadius="5px"
                            boxShadow='sm'
                        >
                        
                        <Flex 
                                display="column" 
                                justifyContent="center" 
                                w={["100%", "100%", "100%", "100%", "100%"]}
                                mt={10}
                                pl={[0, 100, 100]} 
                                rounded={[null, "md"]}
                                borderRadius="5px"
                                boxShadow='sm'
                            >
                                <Text fontWeight="bold" fontSize={16} >
                                    Parece que no tenés ningún producto publicado. Para crear uno hacé click en el botón 
                                    &quot;Nuevo producto&quot;.
                                </Text>

                            </Flex>
                        </Flex>
                
                </Flex>

                </>
            )}

            {/* {product.length > 0 && product.length < 4 && (

            <Flex 
                flexDir={["column", "column", "row", "row", "row"]}
                maxW="2000px"
                rounded={[null, "md"]}
                borderRadius="5px"
                boxShadow='2xl' 
                p='6'
                margin={[null, "null", "100px"]}
                h={[null, null, null, null, "60vh"]}
            >
                Column 1

                <Flex
                    w={["100%", "100%", "10%", "15%", "15%"]}
                    flexDir="column"
                    alignItems="center"
                    padding={10}
                    color="gray.700"
                    pl={[null, null, 100, 100, 5]}
                >
                <Flex
                    flexDir="column"
                    h={[null, null, "100vh"]}
                    justifyContent="space-between"
                >
                    <Flex
                        flexDir="column"
                        as="nav"
                    >

                                    <Flex
                                        flexDir={["column", "column", "column", "column", "column"]}
                                        align={["center", "center", "center", "flex-start", "flex-start"]}
                                        wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                                        justifyContent="center"
                                    >
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                            <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                            <Link display={["none", "none", "flex", "flex", "flex"]} href='/dashboard' _hover={{ textDecor: 'none' }}>
                                                <Text className="active" fontSize="18px" ml={2} style={{cursor: 'pointer'}}>Inicio</Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                            <Icon as={FiDollarSign} fontSize="2xl" className="active-icon" />
                                            <Link href='/dashboard/pagos' _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                                <Text fontSize="18px" ml={1} style={{cursor: 'pointer'}}>
                                                        Autorización de pagos {" "} {" "}
                                                    <Tooltip label="Para poder vender tus productos, tenés que vincular tu cuenta de MercadoPago">
                                                        <span> <Icon as={BsInfoCircle} /> </span>
                                                    </Tooltip>
                                                </Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                                <Icon as={FiBox} fontSize="2xl" />
                                            <Link href="/dashboard/mis-productos" _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                            
                                                <Text fontSize="18px" ml={2} style={{cursor: 'pointer'}}>Mis productos</Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                                <Icon as={CgProfile} fontSize="2xl" />
                                            <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]} href="/dashboard/mi-perfil">
                                            
                                                <Text fontSize="18px" ml={2} style={{cursor: 'pointer'}}>Mi perfil</Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={10}>
                                            <Link href="/nuevo-producto">
                                            <Button colorScheme="white" variant="outline">+ Nuevo producto</Button>
                                            </Link> 
                                        </Flex>
                                    </Flex>
                    </Flex>
                </Flex>
                </Flex>

                

                    <Flex
                        justifyContent="center" 
                        rounded={[null, "md"]}
                        borderRadius="5px"
                        boxShadow='base' 
                        mt={10}
                        p='6' 
                        ml={[null, 100, 200, 100, null]}
                        h={[null, null, null, null, "60vh"]}
                    >

                    <SimpleGrid 
                        columns={[1, 1, 1, 1, 3]} 
                        spacing={10}
                        h={[null, null, null]}
                    >


                        {product.map( product =>  {
                            const productRating = rating.filter(rating => rating._id === product.title)
                            return (
                                <Flex
                                bg="#edf3f8"
                                p={50}
                                w="full"
                                alignItems="center"
                                justifyContent="center"
                                key={product._id}
                              >
                                <Box
                                  bg="gray.600"
                                  _dark={{
                                    bg: "gray.800",
                                  }}
                                  maxW="sm"
                                  borderWidth="1px"
                                  rounded="lg"
                                  shadow="lg"
                                >
                                
                                  <a href={`/productos/${product.title}`} >
                                    <Box h='320px' w={['auto', 'auto', 'auto', '280px']}>
                                        <Image
                                            src={product.content[0]}
                                            alt='Imagen del producto'
                                            roundedTop="lg"
                                            h='100%'
                                            w='100%'
                                            maxH='320px'
                                        />
                                    </Box>
                                  </a>
                          
                                  <Box p="6">
                                    <Box display="flex" alignItems="baseline">
                                      <Badge rounded="full" px="2" colorScheme="teal">
                                        {product.category}
                                      </Badge>
                                      <Box
                                        color="gray.500"
                                        fontWeight="semibold"
                                        letterSpacing="wide"
                                        fontSize="xs"
                                        textTransform="uppercase"
                                        ml="2"
                                      >
                                        {property.beds} beds &bull; {property.baths} baths
                                      </Box>
                                    </Box>
                          
                                    <Text
                                      mt="1"
                                      fontWeight="semibold"
                                      as="h4"
                                      lineHeight="tight"
                                      noOfLines={1}
                                      color='gray.200'
                                    >
                                      {product.productName}
                                    </Text>
                          
                                    <Box color='gray.400'>
                                      ${product.price}
                                      
                                    </Box>
                          
                                    <Box display="flex" mt="2" alignItems="center" justifyContent='space-between'>
                                    {productRating.length > 0 ? productRating.map((rating) => {
                                        const avgValue = Number.parseFloat(rating.avg_val).toFixed(1);
                                        return (
                
                                            <Stack direction='horizontal' fontWeight='bold' fontSize={20} key={rating._id} color="gold">
                                                <Text> {avgValue} </Text> 
                                                <Icon as={BsFillStarFill} pt={2}/> 
                                            </Stack>
                                        
                                        )
                                    }) : null }
                                      <Box as="span" ml="2" color="gray.200" fontSize="sm">
                                         reviews
                                      </Box>

                                    <a href={`/productos/${product.title}`} >
                                        <chakra.button
                                            bg="gray.800"
                                            fontSize="xs"
                                            fontWeight="bold"
                                            color="white"
                                            px={2}
                                            py={1}
                                            rounded="lg"
                                            textTransform="uppercase"
                                            _hover={{
                                                bg: "gray.700",
                                                _dark: {
                                                bg: "gray.600",
                                                },
                                            }}
                                            _focus={{
                                                bg: "gray.700",
                                                _dark: {
                                                bg: "gray.600",
                                                },
                                                outline: "none",
                                            }}
                                        >
                                            Ver detalles
                                        </chakra.button>
                                    </a>
                                    </Box>
                                  </Box>
                                </Box>
                              </Flex>
                            )
                        })}
                    </SimpleGrid>
                    </Flex>
                

            </Flex>
            )} */}

            {product.length > 0 && (

                <Flex 
                    flexDir={["column", "column", "row", "row", "row"]}
                    maxW="2000px"
                    rounded={[null, "md"]}
                    borderRadius="5px"
                    boxShadow='2xl' 
                    p='6'
                    margin={[null, "null", "100px"]}
                    h='auto'
                    
                >
                    {/* Column 1 */}

                    <Flex
                        w={["100%", "100%", "10%", "15%", "15%"]}
                        flexDir="column"
                        alignItems="center"
                        padding={10}
                        color="gray.700"
                        pl={[null, null, 100, 100, 5]}
                    >
                    <Flex
                        flexDir="column"
                        h={[null, null, "100vh"]}
                        justifyContent="space-between"
                    >
                        <Flex
                            flexDir="column"
                            as="nav"
                        >

                                    <Flex
                                        flexDir={["column", "column", "column", "column", "column"]}
                                        align={["center", "center", "center", "flex-start", "flex-start"]}
                                        wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
                                        justifyContent="center"
                                    >
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]}>
                                            <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                            <Link display={["none", "none", "flex", "flex", "flex"]} href='/dashboard' _hover={{ textDecor: 'none' }}>
                                                <Text className="active" fontSize="18px" ml={2} style={{cursor: 'pointer'}}>Inicio</Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                            <Icon as={FiDollarSign} fontSize="2xl" className="active-icon" />
                                            <Link href='/dashboard/pagos' _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                                <Text fontSize="18px" ml={1} style={{cursor: 'pointer'}}>
                                                        Autorización de pagos {" "} {" "}
                                                    <Tooltip label="Para poder vender tus productos, tenés que vincular tu cuenta de MercadoPago">
                                                        <span> <Icon as={BsInfoCircle} /> </span>
                                                    </Tooltip>
                                                </Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                                <Icon as={FiBox} fontSize="2xl" />
                                            <Link href="/dashboard/mis-productos" _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                            
                                                <Text fontSize="18px" ml={2} style={{cursor: 'pointer'}}>Mis productos</Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                                <Icon as={CgProfile} fontSize="2xl" />
                                            <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]} href="/dashboard/mi-perfil">
                                            
                                                <Text fontSize="18px" ml={2} style={{cursor: 'pointer'}}>Mi perfil</Text>
                                            </Link>
                                        </Flex>
                                        <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={10}>
                                            <Link href="/nuevo-producto">
                                            <Button colorScheme="white" variant="outline">+ Nuevo producto</Button>
                                            </Link> 
                                        </Flex>
                                    </Flex>
                        </Flex>
                    </Flex>
                    </Flex>

                    

                        <Flex
                            justifyContent="center" 
                            rounded={[null, "md"]}
                            borderRadius="5px"
                            boxShadow='base' 
                            mt={10}
                            p='6' 
                            ml={[null, 100, 200, 100, null]}
                            h='auto'
                        >

                        <SimpleGrid 
                            columns={[1, 1, 1, 1, 3]} 
                            spacing={10}
                            h={[null, null, null]}
                        >


                            {product.map( product =>  {
                                const productRating = rating.filter(rating => rating._id === product.title)
                                return (
                                //     <Flex
                                //     bg="#edf3f8"
                                //     p={50}
                                //     w="full"
                                //     alignItems="center"
                                //     justifyContent="center"
                                //     key={product._id}
                                //   >
                                    <Box
                                      bg="gray.600"
                                      _dark={{
                                        bg: "gray.800",
                                      }}
                                      maxW="sm"
                                      borderWidth="1px"
                                      rounded="lg"
                                      shadow="lg"
                                      key={product._id}
                                      maxH='480px'
                                    >
                                    
                                      <a href={`/productos/${product.title}`} >
                                        <Box h='320px' w={['auto', 'auto', 'auto', '280px']}>
                                            <Image
                                                src={product.content[0]}
                                                alt='Imagen del producto'
                                                roundedTop="lg"
                                                h='100%'
                                                w='100%'
                                                maxH='320px'
                                            />
                                        </Box>
                                      </a>
                                      <Divider />
                                      <Box p="6">
                                        <Box display="flex" alignItems="baseline">
                                          <Badge rounded="full" px="2" colorScheme="teal">
                                            {product.category}
                                          </Badge>
                                          {/* <Box
                                            color="gray.500"
                                            fontWeight="semibold"
                                            letterSpacing="wide"
                                            fontSize="xs"
                                            textTransform="uppercase"
                                            ml="2"
                                          >
                                            {property.beds} beds &bull; {property.baths} baths
                                          </Box> */}
                                        </Box>
                              
                                        <Text
                                          mt="1"
                                          fontWeight="semibold"
                                          as="h4"
                                          lineHeight="tight"
                                          noOfLines={1}
                                          color='gray.200'
                                        >
                                          {product.productName}
                                        </Text>
                              
                                        <Box color='gray.400'>
                                          ${product.price}
                                          
                                        </Box>
                              
                                        <Box display="flex" mt="2" alignItems="center" justifyContent='space-between'>
                                        {productRating.length > 0 ? productRating.map((rating) => {
                                            const avgValue = Number.parseFloat(rating.avg_val).toFixed(1);
                                            return (
                    
                                                <Stack direction='horizontal' fontWeight='bold' fontSize={20} key={rating._id} color="gold">
                                                    <Text> {avgValue} </Text> 
                                                    <Icon as={BsFillStarFill} pt={2}/> 
                                                </Stack>
                                            
                                            )
                                        }) : null }
                                          {/* <Box as="span" ml="2" color="gray.200" fontSize="sm">
                                             reviews
                                          </Box> */}
    
                                        <a href={`/productos/${product.title}`} >
                                            <chakra.button
                                                bg="gray.800"
                                                fontSize="xs"
                                                fontWeight="bold"
                                                color="white"
                                                px={2}
                                                py={1}
                                                rounded="lg"
                                                textTransform="uppercase"
                                                _hover={{
                                                    bg: "gray.700",
                                                    _dark: {
                                                    bg: "gray.600",
                                                    },
                                                }}
                                                _focus={{
                                                    bg: "gray.700",
                                                    _dark: {
                                                    bg: "gray.600",
                                                    },
                                                    outline: "none",
                                                }}
                                            >
                                                Ver detalles
                                            </chakra.button>
                                        </a>
                                        </Box>
                                      </Box>
                                    </Box>
                                //   </Flex>
                                )
                            })}
                        </SimpleGrid>
                        </Flex>
                    

                </Flex>
            )}


              
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

export default MyProducts