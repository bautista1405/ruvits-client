import {useEffect} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head';

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
  Input,
  InputGroup,
  Textarea
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
import { Formik, Form, useFormik } from "formik";
import axios from "axios";
import swal from 'sweetalert';

const MyProfile = () => {

    const router = useRouter();
    const [session, loading] = useSession();

    const deleteUser = () => { 
    
        swal({
            title: "¿Estás seguro que querés eliminar tu cuenta?",
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
                  fetch('/api/deleteuser', {
                      
                      method: 'POST',
                      
                  }).then( () => {
  
                    swal("Tu cuenta fue eliminada.", "Ya no podrás utilizar los servicios de la plataforma.", "success")
                    .then(() => {router.push('/')})
                  })
                  break;
             
                default:
                  swal("Tu cuenta sigue activa.", "Podés seguir usando nuestros servicios.", "success");
              }
  
            })
    
    }   

    const formik = useFormik({
        initialValues: {
            storeName: '',
            description: '',
            email: ''
        }
    })

    const updateUser = () => { 
        
            const name = session.user.name
            fetch('/api/update', {
                
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify({
                    
                }),
            })
            swal({
                title: "¡Tu producto fue actualizado!",
                text: "Ahora podes ver tu producto con los cambios correspondientes.",
                icon: "success",
            }).then(() => {router.push('/dashboard')})
        
    }

    const updateStore = () => { 
        
        
            fetch('/api/updatestore', {
                
                method: 'POST',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify({
                    storeName: formik.values.storeName,
                    description: formik.values.description,
                    email: session.user.email 
                    
                }),
            })
            swal({
                title: "¡Tu tienda fue actualizada!",
                text: "Ahora podes ver tu tienda con los cambios correspondientes.",
                icon: "success",
            }).then(() => {router.push('/dashboard')})
        
    }

    const handleStore = (e) => {
        e.preventDefault();
        updateStore();
    }

  return (
    <>
        <Head>
            <title>Mi perfil</title>
            <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
        </Head> 
        <Box >  
        {/* {!session && (
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
        )} */}
        
        
            <>
                
        {/* session && */}
        <Flex
            h={["100vh", null, "60vh", "100vh", "100vh"]}
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
                <Text mb={5} fontSize={22} fontWeight='bold'>Mis datos personales</Text>
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
                            >s</Text>
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
                            >s</Text>
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
                    
                    <GridItem
                        mt={10}
                        colSpan={{
                        md: 2,
                        }}
                    >
                    
                    <Text mb={5} fontSize={22} fontWeight='bold'>Mi tienda</Text>
                    
                    <Formik>
                        <Form className="my-3" id="form-container" onSubmit={handleStore}>
                    
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

                        <Input 
                            type='hidden'
                            id='email'
                            name='email'
                            
                        />

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
                            <b>Nombre</b> 
                            </FormLabel>
                            <Input
                                type='text'
                                placeholder="Nombre de tu tienda..."  
                                id='storeName'
                                name='storeName'
                                value={formik.values.storeName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                
                                color="gray.500"
                            />
                        </FormControl>
                        <FormControl as={GridItem} colSpan={[6, 4]}>
                            <FormLabel
                            htmlFor="description"
                            fontSize="sm"
                            fontWeight="bold"
                            color="gray.700"
                            >
                                <b>Descripción</b>
                            </FormLabel>
                            
                                <Textarea
                                    color='gray.900'
                                    placeholder="Descripción de tu tienda..."  
                                    type='text'
                                    id='description'
                                    name='description'
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    
                                    focusBorderColor="brand.700"
                                    rounded="md"
                                    maxLength="2000"
                                
                                />
                            
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
                        <Button
                        type="submit"
                        colorScheme="cyan"
                        _focus={{
                            shadow: "",
                        }}
                        fontWeight="md"
                        variant="outline"
                        >
                            Guardar
                        </Button>
                    </Box>
                    </Form>
                    </Formik>
                    </GridItem>
                        
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