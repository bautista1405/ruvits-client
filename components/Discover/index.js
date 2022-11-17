import React, {useEffect, useState, useMemo} from 'react'
// import Image from 'next/image'
import useSWR from 'swr'
import axios from 'axios'
import { useSession } from "next-auth/client";
import {getSession} from "next-auth/client"

import { SimpleGrid, Box, Flex, chakra, Link, Input, Select, Stack, Image, Badge, Text, Icon, Divider, Button } from '@chakra-ui/react'

import image from '../../assets/transaction.png'
import {BsFillStarFill} from "react-icons/bs"

const fetcher = (url) => fetch(url).then((res) => res.json());

const Discover = () => {

  const url = "/api/getproducts";
  const categorizedProducts = '/api/getcategorizedproducts'
  const getRating = '/api/getproductrating'
  
  const [session, loading] = useSession();
  
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { data, error } = useSWR(`/api/getproducts?page=${page}`, fetcher);
  const [filteredData, setFilteredData] = useState(products);
  const [wordEntered, setWordEntered] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();
  const [rating, setRating] = useState([]);
  
  // Avoid duplicate function calls with useMemo
  const categorizedList = useMemo(getFilteredList, [selectedCategory, products]);
  
  const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json',
  }
  
  useEffect(() => {
    if (data) {
      setPageCount(data.pageCount);
    }
    axios.get(getRating)
    .then((res) => {
      setRating(res?.data?.rating || [])
    })
    axios.get(categorizedProducts, {headers}).then((res) => {
      setProducts(res?.data?.getProducts || []);
      
    })
  }, [data, getRating, categorizedProducts]);
  
  

  // Function to get filtered list
  function getFilteredList() {
        // Avoid filter when selectedCategory is null
        if (!selectedCategory) {
        return products;
        }
        return products.filter((value) => value.category === selectedCategory);
  }

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
    console.log(page)
    console.log(pageCount)
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
    console.log(page)
    console.log(pageCount)
  }

  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }

  if (!data) {
    return <p>Cargando...</p>;
  }
    
    
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

      const PagButton = (props) => {
        const activeStyle = {
          bg: "brand.600",
          _dark: {
            bg: "brand.500",
          },
          color: "white",
        };
        return (
          <chakra.button
            mx={1}
            px={4}
            py={2}
            rounded="md"
            bg="white"
            color="gray.700"
            _dark={{
              color: "white",
              bg: "gray.800",
            }}
            opacity={props.disabled && 0.6}
            _hover={!props.disabled && activeStyle}
            cursor={props.disabled && "not-allowed"}
            {...(props.active && activeStyle)}
          >
            {props.children}
          </chakra.button>
        );
      };
    


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
                disabled={selectedCategory}
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
                      <Divider />
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
                                  <Divider />
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

                        !selectedCategory && data.items.map((product) => {
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
          
          {!selectedCategory ? 
          
          <Flex
            bg="#edf3f8"
            _dark={{
              bg: "#3e3e3e",
            }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
          >
            <Flex>
              <Button disabled={page === 1} onClick={handlePrevious}
                mx={1}
                px={4}
                py={2}
                rounded="md"
                bg="white"
                color="gray.700"
                _dark={{
                  color: "white",
                  bg: "gray.800",
                }}
              >Anterior</Button>
              {/* <PagButton active>1</PagButton>
              <PagButton>2</PagButton>
              <PagButton>3</PagButton>
              <PagButton>4</PagButton>
              <PagButton>5</PagButton> */}
              <Button disabled={page === pageCount} onClick={handleNext}
                mx={1}
                px={4}
                py={2}
                rounded="md"
                bg="white"
                color="gray.700"
                _dark={{
                  color: "white",
                  bg: "gray.800",
                }}
              >Siguiente</Button>
            </Flex>
          </Flex> : null
          }
          
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