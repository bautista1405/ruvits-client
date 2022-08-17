import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'


import { signIn, signOut, useSession, getSession, session } from "next-auth/client";
import {
    HStack,
    SimpleGrid,
    chakra,
    Flex,
    Link,
    Heading,
    Avatar,
    AvatarGroup,
    Text,
    Icon,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Tooltip,
    Divider,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement
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

import image from '../../assets/transaction.png'

const MyProducts = () => {

    const [products, setProducts] = useState([]);
    const [session, loading] = useSession();
    const router = useRouter()
    
    const url = "/api/getproducts"
    
    useEffect(() => {
        if(session) {

            axios.get(url).then((res) => {
                setProducts(res?.data?.getProducts || []);
                
            })
        }
    }, [url])
    
    const product = products.filter(product => product.vendor === session.user.name)
    
  return (
    <>
        {!session && (
            <Flex alignItems="center" justifyContent="center" h="54vh">
                Para ver tus productos debes  
                <Button
                    onClick={() =>
                    signIn("google", {
                        callbackUrl: "http://localhost:3000/dashboard/mis-productos",
                    })
                    }
                    
                    variant="link"
                    ml={1}
                >
                    iniciar sesión.
                </Button>
            </Flex>
        )}           

        {session && (
            <>

            <Flex 
                flexDir={["column", "column", "row", "row", "row"]}
                maxW="2000px"
                rounded={[null, "md"]}
                borderRadius="5px"
                boxShadow='2xl' 
                p='6'
                margin={[null, "null", "100px"]}
                
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
                              <Link display={["none", "none", "flex", "flex", "flex"]}>
                                  <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                              </Link>
                              <Link href='/dashboard' _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                  <Text className="active" fontSize="18px" ml={2}>Inicio</Text>
                              </Link>
                          </Flex>
                          <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                <Link href="/dashboard/pagos" display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiDollarSign} fontSize="2xl" />
                                
                                
                                    <Text fontSize="18px" ml={1}>
                                        Autorización de pagos {" "} {" "}
                                        <Tooltip label="Para poder vender tus productos, tenés que vincular tu cuenta de MercadoPago">
                                           <span> <Icon as={BsInfoCircle} /> </span>
                                        </Tooltip>
                                    </Text>
                                </Link>
                            </Flex>
                          <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                              <Link display={["none", "none", "flex", "flex", "flex"]}>
                                  <Icon as={FiBox} fontSize="2xl" /></Link>
                              <Link href="/dashboard/mis-productos" _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                  <Text fontSize="18px" ml={2}>Mis productos</Text>
                              </Link>
                          </Flex>
                          <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                              <Link display={["none", "none", "flex", "flex", "flex"]}>
                                  <Icon as={CgProfile} fontSize="2xl" /></Link>
                              <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]} href="/dashboard/mi-perfil">
                                  <Text fontSize="18px" ml={2}>Mi perfil</Text>
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

            
                <SimpleGrid 
                    columns={[1, 1, 1, 1, 3]} 
                    justifyContent="center" 
                    spacing={10} 
                    rounded={[null, "md"]}
                    borderRadius="5px"
                    boxShadow='base' 
                    mt={10}
                    p='6' 
                    ml={[null, 100, 200, 100, null]}
                >
                    {product.map( product =>  {
                        return (
                            <Flex
                            justifyContent="center" 
                            ml={[null, 100, 0, 0, 5]}
                            key={product._id}
                            >
                            <Flex
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                w="sm"
                                mx="auto"
                            >
                                <Box
                                bg="gray.300"
                                h={64}
                                w="full"
                                rounded="lg"
                                shadow="md"
                                bgSize="cover"
                                bgPos="center"
                                style={{
                                    backgroundImage:
                                    `url(${product.content[0]})`,
                                }}
                                ></Box>
    
                                <Box
                                w={{
                                    base: 56,
                                    md: 64,
                                }}
                                bg="gray.800"
                                _dark={{
                                    bg: "gray.800",
                                }}
                                mt={-10}
                                shadow="lg"
                                rounded="lg"
                                overflow="hidden"
                                >
                                <chakra.h3
                                    py={2}
                                    textAlign="center"
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                    color="gray.200"
                                    _dark={{
                                    color: "white",
                                    }}
                                    letterSpacing={1}
                                >
                                    {product.title}
                                </chakra.h3>
    
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    py={2}
                                    px={3}
                                    bg="gray.200"
                                    _dark={{
                                    bg: "gray.700",
                                    }}
                                >
                                    <chakra.span
                                    fontWeight="bold"
                                    color="gray.800"
                                    _dark={{
                                        color: "gray.200",
                                    }}
                                    >
                                    ${product.price}
                                    </chakra.span>
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
                                </Flex>
                                </Box>
                            </Flex>
                            </Flex>
                            )
                    })}
                </SimpleGrid>
                
                </Flex>
            </>
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