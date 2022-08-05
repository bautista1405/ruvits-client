import {useEffect} from 'react'
import { useRouter } from 'next/router'

import { signIn, signOut, useSession, getSession } from "next-auth/client";
import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Link,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
import axios from 'axios';

const Payments = () => {

  const router = useRouter();
  const [session, loading] = useSession();
  
  return (
    <div>

        <Box >  
        {!session && (<p>Debes estar logueado para ver esta página</p>)}
        {session && !session.mpAccessToken && (
        <Flex
            h={["null", "null", "100vh"]}
            maxW="2000px"
            
            overflow="hidden"
            
            shadow="base"
            rounded={[null, "md"]}
            borderRadius="5px"
            boxShadow='2xl' 
            p='6'
            
        >
            {/* Column 1 */}
            <Flex
                w={["100%", "100%", "10%", "15%", "15%"]}
                flexDir="column"
                alignItems="center"
                rounded={[null, "md"]}
                borderRadius="5px"
                boxShadow='base'
                margin={10}
                color="gray.700"
            
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
                                <Link href="/dashboard" display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                
                                
                                    <Text className="active" fontSize="18px" ml={2}>Inicio</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                <Link href="/dashboard/pagos" display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiDollarSign} fontSize="2xl" />
                                
                                
                                    <Text fontSize="18px" ml={1}>Pagos</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                <Link href="/dashboard/mis-productos" display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiBox} fontSize="2xl" />
                                
                                    <Text fontSize="18px" ml={2}>Mis productos</Text>
                                </Link>
                            </Flex>
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={6}>
                                <Link href='/mi-perfil' display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={CgProfile} fontSize="2xl" />
                                
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

            <Flex 
                display="column" 
                justifyContent="center" 
                mt={90} 
            >
              <p>
                Para poder vender tus productos, es necesario que vincules tu cuenta de Mercado Pago con la plataforma, así podés recibir pagos.
                
              </p>
              <Link href={process.env.NEXT_PUBLIC_MP_API_AUTH} >
                  <Button colorScheme='cyan' variant='outline' mt={10}>
                      Vincular mi cuenta de Mercado Pago    
                  </Button> 
              </Link>
            </Flex>
            
            </Flex>
        )}

        {session && session.mpAccessToken && (
          <Flex
          h={[null, null, "50vh", "50vh", "100vh"]}
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
          
      >
          {/* Column 1 */}
          <Flex
              w={["100%", "100%", "10%", "15%", "15%"]}
              flexDir="column"
              alignItems="center"
              padding={10}
              color="gray.700"
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
                              <Link display={["none", "none", "flex", "flex", "flex"]}>
                                  <Icon as={FiDollarSign} fontSize="2xl" />
                              </Link>
                              <Link href="/dashboard/pagos" _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]}>
                                  <Text fontSize="18px" ml={1}>Autorización de pagos</Text>
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
                              <Link _hover={{ textDecor: 'none' }} display={["flex", "flex", "none", "flex", "flex"]} href="/mi-perfil">
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
            
                <Button colorScheme='cyan' variant='outline' mt={10}>
                    Desvincular mi cuenta de Mercado Pago    
                </Button> 
            
          </Flex>
          
          </Flex>
        )}
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