import React, { useEffect, useState } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
  Divider,
  Badge,
  Stack,
  Icon,
  chakra,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer, TableCaption,
} from "@chakra-ui/react";

// Custom components
import Banner from "../../components/Categories/components/Banner";

import NFT from "../../components/store/components/card/NFT";
import Card from "../../components/store/components/card/Card";

// Assets
import BannerNFT from '../../assets/Nft1.png'
import {BsFillStarFill} from "react-icons/bs"


// import Image from "next/image";
import axios from 'axios'

export default function Notes() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const picture = "https://via.placeholder.com/200"
  const banner = BannerNFT
  
  const categorizedProducts = '/api/getcategorizedproducts'
  const getRating = '/api/getproductrating'
  const getVendorRating = '/api/getstorerating'

  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState([]);
  const [vendors, setVendors] = useState([]);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  }

  useEffect(() => {
    axios.get(categorizedProducts, {headers}).then((res) => {
        setProducts(res?.data?.items || []);
        
    })
    axios.get(getRating)
    .then((res) => {
      setRating(res?.data?.rating || [])
    })
    axios.get(getVendorRating)
    .then((res) => {
      setVendors(res?.data?.rating || [])
      
    })
  }, [categorizedProducts, getRating, getVendorRating])
  
  
  const ratedProducts = rating.filter(rating => rating.category[0] === 'Apuntes/Trabajos')
  
  const topRatedProducts = ratedProducts.filter(rating => rating.avg_val >= 3)
  
  const filteredProducts = products.filter(product => product.category === 'Apuntes/Trabajos')
  
  const topVendors = vendors.filter(vendors => vendors.category[0] === 'Apuntes/Trabajos')
  
  console.log(topVendors)
  
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }} bg='gray.200' p={10}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          
          <Banner />
          
          <Flex direction='column' mt={10}>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Los más populares
              </Text>


              {/* <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  Art
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Collectibles
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  Sports
                </Link>
              </Flex> */}
            </Flex>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px' >
                      {topRatedProducts.length > 0 && topRatedProducts.map((product) => {
                        
                        const avgValue = Number.parseFloat(product.avg_val).toFixed(1);
                        
                        return (
                            
                          <Flex
                                
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
                                    <Box h='320px' w='320px'>
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
                                        {product.category[0]}
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
                                      {product._id}
                                    </Text>
                          
                                    <Box color='gray.400'>
                                      ${product.price[0]}
                                      
                                    </Box>
                          
                                    <Box display="flex" mt="2" alignItems="center" justifyContent='space-between'>
                                    
                                        
                
                                            <Stack direction='horizontal' fontWeight='bold' fontSize={20} key={rating._id} color="gold">
                                                <Text> {avgValue} </Text> 
                                                <Icon as={BsFillStarFill} pt={2}/> 
                                            </Stack>
                                        
                                     
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
                              </Flex>
                        )
                      })}
              
            </SimpleGrid>
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
                Los más recientes
            </Text>
            <SimpleGrid
              columns={{ base: 1, md: 3 }}
              gap='20px'
              mb={{ base: "20px", xl: "0px" }}>

              {filteredProducts.map((product) => {
                return (

                  <Flex
                      
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
                        <Box h='320px' w='320px'>
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
                        {/* {productRating.length > 0 ? productRating.map((rating) => {
                            const avgValue = Number.parseFloat(rating.avg_val).toFixed(1);
                            return (
    
                                <Stack direction='horizontal' fontWeight='bold' fontSize={20} key={rating._id} color="gold">
                                    <Text> {avgValue} </Text> 
                                    <Icon as={BsFillStarFill} pt={2}/> 
                                </Stack>
                            
                            )
                        }) : null } */}
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
                  </Flex>
                )
              })}

            </SimpleGrid>
          </Flex>
        </Flex>
        
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}
        >
          
          <Card px='0px' mb='20px'>
            
                <TableContainer>
                  <Table variant='striped' colorScheme='gray' >
                    <TableCaption>Mirá quiénes son los creadores top de la categoría</TableCaption>
                    <Thead>
                      <Tr>
                        <Th>Nombre</Th>
                        <Th>Calificación</Th>
                        <Th isNumeric>Ranking</Th>
                      </Tr>
                    </Thead>
                    {topVendors.map((vendor, index) => {

                      const ranking = index + 1
                      const avgValue = Number.parseFloat(vendor.avg_val).toFixed(1);
                      

                      return (
                        <Tbody>
                              <Tr>
                                <Td>{vendor._id}</Td>
                                <Td textAlign='center'> {avgValue} </Td>
                                <Td isNumeric > {ranking} </Td>
                              </Tr>
                              
                        </Tbody>
                      )
                    })}
                  </Table>
                </TableContainer>
          </Card>
                    
                    
          
          {/* <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action'>See all</Button>
            </Flex>

            <HistoryItem
              name='Colorful Heaven'
              author='By Mark Benjamin'
              date='30s ago'
              image={picture}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Abstract Colors'
              author='By Esthera Jackson'
              date='58s ago'
              image={picture}
              price='0.91 ETH'
            />
            <HistoryItem
              name='ETH AI Brain'
              author='By Nick Wilson'
              date='1m ago'
              image={picture}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Swipe Circles'
              author='By Peter Will'
              date='1m ago'
              image={picture}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Mesh Gradients '
              author='By Will Smith'
              date='2m ago'
              image={picture}
              price='0.91 ETH'
            />
            <HistoryItem
              name='3D Cubes Art'
              author='By Manny Gates'
              date='3m ago'
              image={picture}
              price='0.91 ETH'
            />
          </Card> */}
        </Flex>
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}