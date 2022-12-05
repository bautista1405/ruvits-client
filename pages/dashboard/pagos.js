import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { signIn, useSession, getSession } from "next-auth/client";
import {
  Flex,
  Text,
  Icon,
  Tooltip,
  Box,
  Button,
  Spinner,
} from '@chakra-ui/react'

import {
  FiHome,
  FiDollarSign,
  FiBox,
} from "react-icons/fi"
import {CgProfile} from 'react-icons/cg'
import axios from 'axios';
import swal from 'sweetalert';
import {BsInfoCircle} from "react-icons/bs"
import Head from 'next/head';

const Payments = () => {

  const router = useRouter();
  const [session, loading] = useSession();

  const getAccessToken = '/api/gettoken'

  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
      if(session) {

          axios.get(getAccessToken)
          .then((res) => {
              setTokens(res?.data?.getToken || [])
              setIsLoading(false);
          })
      }
    }, [getAccessToken])

    const token = tokens.filter(token => token.email === session.user.email)

    if (isLoading) {
        return (
          <Flex alignItems="center" justifyContent="center" h="54vh">
            
            <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                  />
          </Flex>
        )
        
    }


    const deleteToken = () => { 
        
        
        fetch('/api/deletetoken', {
            
            method: 'POST',
            
        })
        .then( () => {
            
            swal({
                    title: "Tu cuenta de MercadoPago fue desvinculada.",
                    text: "Si querés volver a vender tus productos, podés vincularla de nuevo.",
                    icon: "success",
                }).then(() => {router.push('/dashboard')})
            } )
            
    }
    
  
  return (
    <div>
        <Head>
            <title>Pagos</title>
            <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
        </Head>

        <Box >  
            {!session && (
                <Flex alignItems="center" justifyContent="center" h="54vh">
                    Para ver esta página debes  
                    <Button
                        onClick={() =>
                        signIn("google", {
                            callbackUrl: "/dashboard/pagos",
                        })
                        }
                        
                        variant="link"
                        ml={1}
                    >
                        iniciar sesión.
                    </Button>
                </Flex>
            )}
        
        {token.length == 1 ? (
            token.map((token) => { 
            return (
                    <Flex
                        h={["null", "null", "40vh", "50vh", "70vh"]}
                        w="100wh"
                        maxW="2000px"
                        flexDir={["column", "column", "row"]}
                        overflow="hidden"
                        margin={[null, null, "100px"]}
                        shadow="base"
                        rounded={[null, "md"]}
                        borderRadius="5px"
                        boxShadow='2xl' 
                        p='6'
                        pl={[null, null, 70, 10, 5]}
                        key={token._id}
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
                            <p>
                            
                            <b>Ya tenes tu cuenta de Mercado Pago vinculada con la plataforma.</b>
                            
                            </p>
                            
                                <Button colorScheme='cyan' variant='outline' mt={10} onClick={deleteToken}>
                                    Desvincular mi cuenta de Mercado Pago    
                                </Button> 
                            
                        </Flex>
            
                    </Flex>
            )
    })
    ) : (

            session && token.length == 0 && (

            <Flex
                h={["null", "null", "40vh", "50vh", "70vh"]}
                w="100wh"
                maxW="2000px"
                flexDir={["column", "column", "row"]}
                overflow="hidden"
                margin={[null, null, "100px"]}
                shadow="base"
                rounded={[null, "md"]}
                borderRadius="5px"
                boxShadow='2xl' 
                p='6'
                pl={[null, null, 70, 10, 5]}
                key={session.user.name}
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
            <p>
                Para poder vender tus productos, es necesario que vincules tu cuenta de Mercado Pago con la plataforma, así podés recibir pagos.
                
            </p>
            <a href={process.env.NEXT_PUBLIC_MP_API_AUTH} >
                <Button colorScheme='cyan' variant='solid' mt={10} color="white" >
                    Vincular mi cuenta de Mercado Pago    
                </Button> 
            </a>
            </Flex>
            
            </Flex>
        )

        )
    }

        </Box>

    </div>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default Payments;