import React, {useEffect, useState, useMemo} from 'react'
// import Image from 'next/image'
import axios from 'axios'
import { useSession } from "next-auth/client";
import {getSession} from "next-auth/client"

import { SimpleGrid, Box, Flex, chakra, Link, Input, Select, Stack, Image, Badge, Text, Icon } from '@chakra-ui/react'

import image from '../../assets/transaction.png'
import {BsFillStarFill} from "react-icons/bs"

const Discover = () => {

    const url = "/api/getproducts";
    const getRating = '/api/getproductrating'
    
    const [session, loading] = useSession();
    
    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState(products);
    const [wordEntered, setWordEntered] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();
    const [rating, setRating] = useState([]);


    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json',
    }
    
    useEffect(() => {
        axios.get(url, {headers}).then((res) => {
            setProducts(res?.data?.getProducts || []);
            
        })
        axios.get(getRating)
        .then((res) => {
            setRating(res?.data?.rating || [])
        })
    }, [url, getRating])

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = products.filter((value) => {
          return Object.values(value).join('').toLowerCase().match(searchWord.toLowerCase());
        });
        
        if (searchWord.length === '') {
          setFilteredData([]);
        } 
        else {
          setFilteredData(newFilter);
        }
    };
    
  // Function to get filtered list
  function getFilteredList() {
        // Avoid filter when selectedCategory is null
        if (!selectedCategory) {
        return products;
        }
        return products.filter((value) => value.category === selectedCategory);
   }

  // Avoid duplicate function calls with useMemo
  const categorizedList = useMemo(getFilteredList, [selectedCategory, products]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <div>
        <Flex justify="space-around">
            <Stack spacing={10} margin="50px">
                
                <Select 
                    variant='filled'   
                    name="category-list"
                    id="category-list"
                    onChange={handleCategoryChange}
                    borderColor="gray.400"
                >
                    <option value=''>Todos</option>
                    <option value='Apuntes/Trabajos'>Apuntes/Trabajos</option>
                    <option value='Ilustraciones/Diseños'>Ilustraciones/Diseños</option>
                    <option value='Manuales/Guías'>Manuales/Guías</option>
                    <option value='Clases/Cursos'>Clases/Cursos</option>
                    <option value='Beats/Tracks'>Beats/Tracks</option>
                    <option value='Snippets de código'>Snippets de código</option>
                </Select>
                
            </Stack>
            <Input
                type="text"
                placeholder='Buscar...'
                borderColor="gray.500"
                margin="50px"
                value={wordEntered}
                onChange={handleFilter}
                width={['60vw', '50vw', '50vw', '50vw', '50vw']}
            />
        </Flex>

        <Flex justifyContent="center">
        </Flex>

        <SimpleGrid 
            columns={[1, 2, 2, 3]} 
            spacing={10} 
            bg="#edf3f8" 
            margin="50px" 
            shadow="base"
            rounded={[null, "md"]}
            borderRadius="5px" 
        >

            {
            selectedCategory ?
            categorizedList.map((value, index) => {
                const productRating = rating.filter(rating => rating._id === value.title)
                return (
                    <Flex
                    bg="#edf3f8"
                    p={50}
                    w="full"
                    alignItems="center"
                    justifyContent="center"
                    key={value._id}
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
                    
                      <a href={`/productos/${value.title}`} >
                        <Box h='320px' w='320px'>
                            <Image
                                src={value.content[0]}
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
                            {value.category}
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
                          {value.productName}
                        </Text>
              
                        <Box color='gray.400'>
                          ${value.price}
                          
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

                        <a href={`/productos/${value.title}`} >
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
            } ) : (
                
                wordEntered.length > 0 &&
                filteredData.length > 0 ? (
                    filteredData.map((value, key) => {
                        const productRating = rating.filter(rating => rating._id === value.title)
                        return (
                            <Flex
                                bg="#edf3f8"
                                p={50}
                                w="full"
                                alignItems="center"
                                justifyContent="center"
                                key={value._id}
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
                                
                                  <a href={`/productos/${value.title}`} >
                                    <Box h='320px' w='320px'>
                                        <Image
                                            src={value.content[0]}
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
                                        {value.category}
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
                                      {value.productName}
                                    </Text>
                          
                                    <Box color='gray.400'>
                                      ${value.price}
                                      
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

                                    <a href={`/productos/${value.title}`} >
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
                    })
                    ) : (
                        
                         wordEntered.length > 0 && filteredData.length == 0 ? (
                            
                                
                                    <Flex
                                        p={50}
                                        w="full"
                                        alignItems="center"
                                        justifyContent="center"
                                        
                                    >
                                        <Flex
                                            direction="column"
                                            justifyContent="center"
                                            alignItems="center"
                                            w="sm"
                                            mx="auto"
                                            p='5'
                                        >
                                            <h3>¡Uuppsss! Parece que ese producto no existe.</h3>
                                        </Flex>
                                    </Flex>
                                
                            
                        
                        ) : (

                        !selectedCategory && products.map((product) => {
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
                              </Flex>
                            )})
                       
                        ))
                
                    
            )
        
            }

            
        </SimpleGrid>
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

export default Discover