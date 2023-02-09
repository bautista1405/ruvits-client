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
  TableContainer, TableCaption, Spinner,
} from "@chakra-ui/react";

// Custom components
import Banner from "../Categories/components/Banner";

import NFT from "../store/components/card/NFT";
import Card from "../store/components/card/Card";

// Assets
import BannerNFT from '../../assets/Nft1.png'
import {BsFillStarFill} from "react-icons/bs"


// import Image from "next/image";
import axios from 'axios'

export default function Notes() {
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const banner = BannerNFT
  
  const categorizedProducts = '/api/getcategorizedproducts'
  const getRating = '/api/getproductrating'
  const getVendorRating = '/api/getstorerating'
  const mostRecentProducts = '/api/getrecentproducts'

  const [products, setProducts] = useState([]);
  const [rating, setRating] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  }

  useEffect(() => {
    
    axios.get(mostRecentProducts, {headers}).then((res) => {
        setProducts(res?.data?.getProducts || []);
        setIsLoading(false);
    })
    axios.get(getRating)
    .then((res) => {
      setRating(res?.data?.rating || [])
      setIsLoading(false);
    })
    axios.get(getVendorRating)
    .then((res) => {
      setVendors(res?.data?.rating || [])
      
    })
  }, [mostRecentProducts, getRating, getVendorRating])
  
  return (
    // <Box pt={{ base: "180px", md: "80px", xl: "80px" }} bg='gray.200' p={10}>
    //   {/* Main Fields */}
    //   <Grid
    //     mb='20px'
    //     gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
    //     gap={{ base: "20px", xl: "20px" }}
    //     display={{ base: "block", xl: "grid" }}>
    //     <Flex
    //       flexDirection='column'
    //       gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          
          
          
          <Flex direction='column' mt={10} bg="#F9FAFB">
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='center'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='3xl' ms='24px' fontWeight='700'>
                Los más recientes
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
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing='20px' >

              {isLoading && 
              
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
              }
                      {products.length > 0 && products.map((product) => {
                        
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
    //     </Flex>
    //   </Grid>
    //   {/* Delete Product */}
    // </Box>
  );
}