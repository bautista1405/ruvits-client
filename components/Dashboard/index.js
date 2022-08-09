import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'

import { signIn, signOut, useSession, getSession } from "next-auth/client";

import {
    Flex,
    Heading,
    Avatar,
    Link,
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
    Divider,
    Box,
    Button,
    Input,
    InputGroup,
    Tooltip,
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
import {BsInfoCircle} from "react-icons/bs"

import MyChart from './Chart'
import axios from 'axios';

export default function Dashboard({data}) {

    const getPayments = 'http://localhost:3000/api/getpayment'

    const [session, loading] = useSession();

    const router = useRouter();

    const [payments, setPayments] = useState([]);

    useEffect( () => {
        axios.get(getPayments)
        .then((res) => {
            setPayments(res?.data?.getPayments || [])
        })
    }, [getPayments]) 

    const payment = payments.filter(payment => payment.user === session.user.email)
    const sales = payments.filter(payment => payment.vendor === session.user.name)

    return (
      <Box >  
        {!session && (<p>Debes estar logueado para ver esta página</p>)}
        {session && (
        <Flex
            h={[null, null, "100vh"]}
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

            {/* Column 2 */}
            <Flex
                w={["100%", "100%", "60%", "60%", "100%"]}
                flexDir="column"
                overflow="auto"
                minH="100vh"
                padding={10}
                ml={[null, 100, 100, 100, 5]}
            >
                <Heading
                    fontWeight="normal"
                    mb={4}
                    letterSpacing="tight"
                >
                   Bienvenido, <Flex display="inline-flex" fontWeight="bold"> {session.user.name} </Flex>
                </Heading>
                {/* <Text color="gray" fontSize="sm">Mi Balance</Text>
                <Text fontWeight="bold" fontSize="2xl">$5,750.20</Text> */}
                {/* <MyChart /> */}
                <Flex justifyContent="space-between" mt={8}>
                    <Flex align="flex-end">
                        <Heading as="h2" size="lg" letterSpacing="tight">Transacciones</Heading>
                        
                    </Flex>
                    
                </Flex>
                <Flex flexDir="column" mt={20}>
                    <Text fontSize={20}> <b>Compras</b> </Text>
                    <Flex overflow="auto" w={["100%", "100%", "100%", "100%", "100%"]}>
                        <Table variant='striped' mt={4}>
                            <Thead>
                                <Tr color="gray">
                                    <Th>Producto</Th>
                                    <Th>Descripción</Th>
                                    <Th isNumeric>Precio</Th>
                                    <Th isNumeric>Fecha</Th>
                                </Tr>
                            </Thead>
                            
                            <Tbody>
                                {payment.map((payment) => {
                                    return (
                                        <>
                                            <Tr key={payment._id} >
                                                <Td>
                                                    <Flex align="center">
                                                        
                                                        <Flex flexDir="column">
                                                            <Link href={`/productos/${payment.title}`}>
                                                            <Heading size="sm" letterSpacing="tight"> {payment.title} </Heading>
                                                            {/* <Text fontSize="sm" color="gray">Apr 24, 2021 at 1:40pm</Text> */}
                                                            </Link>
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                                <Td> {payment.description} </Td>
                                                <Td isNumeric>${payment.price}</Td>
                                                <Td isNumeric><Text fontWeight="bold" display="inline-table"> {payment.date} </Text></Td>
                                            </Tr>

                                        </>
                                    )

                                } )}
                               
                            </Tbody>
                        </Table>
                    </Flex>
                   
                </Flex>
                
                <Flex flexDir="column" mt={20}>
                    <Text fontSize={20}><b>Ventas</b> </Text>
                    <Flex overflow="auto" w={["100%", "100%", "100%", "100%", "100%"]}>
                        <Table variant='striped' mt={4}>
                            <Thead>
                                <Tr color="gray">
                                    <Th>Producto</Th>
                                    <Th>Descripción</Th>
                                    <Th isNumeric>Precio</Th>
                                    <Th isNumeric>Fecha</Th>
                                </Tr>
                            </Thead>
                            
                            <Tbody>
                                {sales.map((sale) => {
                                    return (
                                        <>
                                            <Tr key={sale._id} >
                                                <Td>
                                                    <Flex align="center">
                                                        
                                                        <Flex flexDir="column">
                                                            <Link href={`/productos/${sale.title}`}>
                                                            <Heading size="sm" letterSpacing="tight"> {sale.title} </Heading>
                                                            {/* <Text fontSize="sm" color="gray">Apr 24, 2021 at 1:40pm</Text> */}
                                                            </Link>
                                                        </Flex>
                                                    </Flex>
                                                </Td>
                                                <Td> {sale.description} </Td>
                                                <Td isNumeric>${sale.price}</Td>
                                                <Td isNumeric><Text fontWeight="bold" display="inline-table"> {sale.date} </Text></Td>
                                            </Tr>

                                        </>
                                    )

                                } )}
                               
                            </Tbody>
                        </Table>
                    </Flex>
                   
                </Flex>

            </Flex>
            </Flex>
        )}
    </Box>
    
    )
}

export async function getServerSideProps(ctx) {
    return {
      props: {
        session: await getSession(ctx)
      }
    }
}