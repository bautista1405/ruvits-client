import {useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { signIn, signOut, useSession, getSession } from "next-auth/client";
import {
  Flex,
  Tooltip,
  SimpleGrid,
  GridItem,
  chakra,
  Stack,
  FormControl,
  FormLabel,
  Text,
  Icon,
  Box,
  Button,
} from '@chakra-ui/react'

import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiBox,
  FaUser,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiCreditCard,
  FiSearch,
  FiBell
} from "react-icons/fi"
import {BsInfoCircle} from "react-icons/bs"
import {CgProfile} from 'react-icons/cg'
import axios from 'axios';
import swal from 'sweetalert';

const MyProfile = () => {

    const router = useRouter();
    const [session, loading] = useSession();

    const deleteUser = (req, res) => { 
    
        
        fetch('/api/deleteuser', {
            
            method: 'POST',
            
        })
        .then( () => {

            swal({
                title: "Tu cuenta fue eliminada.",
                text: "¡Te esperamos a la vuelta!",
                icon: "success",
            }).then(() => {router.push('/')})
        })
    
    }   

  return (
    <>
        <Box >  
        {!session && (
          <Flex alignItems="center" justifyContent="center" h="54vh">
            Para ver tu perfil debes  
            <Button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/dashboard/mi-perfil",
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
            h={["100vh", null, "60vh"]}
            maxW="2000px"
            flexDir={["column", "column", "row"]}
            overflow="hidden"
            margin={[null, null, "100px"]}
            shadow="base"
            rounded={[null, "md"]}
            borderRadius="5px"
            boxShadow='2xl' 
            p='6'
            pl={[null, null, 10, 10, 5]}
            mr={[null, null, 60, 10, 5]}
            w={["100%", "100%", "90vw", "83vw", "87vw"]}
        >
            {/* Column 1 */}
            <Flex
                w={["100%", "100%", "10%", "15%", "15%"]}
                flexDir="column"
                alignItems="center"
                padding={10}
                color="gray.700"
                pl={[null, null, 70, 100, 5]}
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
            
            
                <SimpleGrid
                
                
                w={["100%", "100%", "100vw", "100%", "100%"]}
                flexDir="column"
                overflow="auto"
                minH="100vh"
                padding={10}
                ml={[null, 100, 100, 100, 5]}
                
                >
                
                <GridItem
                    mt={[5, null, 0]}
                    colSpan={{
                    md: 2,
                    }}
                    
                 
                >
                    <chakra.form
                    method="POST"
                    shadow="base"
                    rounded={[null, "md"]}
                    overflow={{
                        sm: "hidden",
                    }}
                    >
                    <Stack
                        px={4}
                        py={5}
                        p={[null, 6]}
                        bg="white"
                        _dark={{
                        bg: "#141517",
                        }}
                        spacing={6}
                    >
                        <SimpleGrid columns={6} spacing={6} mb={20}>
                        <FormControl as={GridItem} colSpan={[6, 4]}>
                            <FormLabel
                            htmlFor="first_name"
                            fontSize="sm"
                            fontWeight="md"
                            color="gray.700"
                            _dark={{
                                color: "gray.50",
                            }}
                            >
                                <b>Nombre</b>
                            </FormLabel>
                            <Text
                                
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                
                                color="gray.500"
                            >{session.user.name}</Text>
                        </FormControl>

                        

                        <FormControl as={GridItem} colSpan={[6, 4]}>
                            <FormLabel
                            htmlFor="email_address"
                            fontSize="sm"
                            fontWeight="md"
                            color="gray.700"
                            _dark={{
                                color: "gray.50",
                            }}
                            >
                            <b>Email</b> 
                            </FormLabel>
                            <Text
                                
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                
                                color="gray.500"
                            >{session.user.email}</Text>
                        </FormControl>

                       

                        

                        
                        </SimpleGrid>
                    </Stack>
                    <Box
                        px={{
                        base: 4,
                        sm: 6,
                        }}
                        py={3}
                        bg="gray.50"
                        _dark={{
                            bg: "#121212",
                        }}
                        textAlign="right"
                    >
                        {/* <Button
                        type="submit"
                        colorScheme="cyan"
                        _focus={{
                            shadow: "",
                        }}
                        fontWeight="md"
                        variant="outline"
                        >
                            Guardar
                        </Button> */}
                    </Box>
                    </chakra.form>
                        <GridItem mt={20}>
                            <Text fontSize={20} ><b>Otras opciones</b></Text>
                        </GridItem>
                        <GridItem>
                            <Button colorScheme="red" mt={5} mb={1} onClick={deleteUser}>
                                Borrar cuenta
                            </Button>
                        </GridItem>
                </GridItem>
                </SimpleGrid>

        </Flex>
            </>
        )}

            
    </Box>
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

export default MyProfile