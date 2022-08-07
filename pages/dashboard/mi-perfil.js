import {useEffect} from 'react'
import { useRouter } from 'next/router'

import { signIn, signOut, useSession, getSession } from "next-auth/client";
import {
  Flex,
  Tooltip,
  Heading,
  Avatar,
  AvatarGroup,
  SimpleGrid,
  GridItem,
  chakra,
  Stack,
  FormControl,
  FormLabel,
  InputLeftAddon,
  Textarea,
  FormHelperText,
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
  VisuallyHidden,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
  InputLeftElement
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

const MyProfile = () => {

    const router = useRouter();
    const [session, loading] = useSession();

  return (
    <>
        <Box >  
        {!session && (<p>Debes estar logueado para ver esta página</p>)}
        
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
                                <Link href="/dashboard" display={["none", "none", "flex", "flex", "flex"]}>
                                    <Icon as={FiHome} fontSize="2xl" className="active-icon" />
                                
                                
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
                            <Flex className="sidebar-items" mr={[2, 6, 0, 0, 0]} mt={10} mb={10}>
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
                                Nombre
                            </FormLabel>
                            <Input
                                type="text"
                                name="first_name"
                                id="first_name"
                                autoComplete="given-name"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                defaultValue={session.user.name}
                            />
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
                            Email 
                            </FormLabel>
                            <Input
                                type="text"
                                name="email_address"
                                id="email_address"
                                autoComplete="email"
                                mt={1}
                                focusBorderColor="brand.400"
                                shadow="sm"
                                size="sm"
                                w="full"
                                rounded="md"
                                defaultValue={session.user.email}
                                readOnly
                                color="gray.400"
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
                    </chakra.form>
                        <GridItem mt={20}>
                            <Text fontSize={20} ><b>Otras opciones</b></Text>
                        </GridItem>
                        <GridItem>
                            <Button colorScheme="red" mt={5} mb={1}>
                                Borrar cuenta
                            </Button>
                        </GridItem>
                </GridItem>
                </SimpleGrid>

        </Flex>

            
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