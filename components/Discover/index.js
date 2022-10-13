import React, {useEffect, useState, useMemo} from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from "next-auth/client";
import {getSession} from "next-auth/client"

import { SimpleGrid, Box, Flex, chakra, Link, Input, Select, Stack } from '@chakra-ui/react'

import image from '../../assets/transaction.png'

const Discover = () => {

    const [session, loading] = useSession();
    
    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState(products);
    const [wordEntered, setWordEntered] = useState("");
    const [selectedCategory, setSelectedCategory] = useState();

    const url = "/api/getproducts";

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json',
    }
    
    useEffect(() => {
        axios.get(url, {headers}).then((res) => {
            setProducts(res?.data?.getProducts || []);
            
        })
    }, [url])

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
                return (
                    <Flex
                        p={50}
                        w="full"
                        h="full"
                        alignItems="center"
                        justifyContent="center"
                        key={value._id}
                    >
                        <Flex
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            w="sm"
                            mx="auto"
                        >
                            <Box
                                bg="gray.300"
                                h={64}
                                w="full"
                                rounded="lg"
                                shadow="md"
                                bgSize="cover"
                                bgPos="center"
                                style={{
                                    backgroundImage:
                                    `url(${value.content[0]})`,
                                }}
                            ></Box>

                            <Box
                                w={{
                                    base: 56,
                                    md: 64,
                                }}
                                bg="gray.800"
                                _dark={{
                                    bg: "gray.800",
                                }}
                                mt={-10}
                                shadow="lg"
                                rounded="lg"
                                overflow="hidden"
                            >
                            <chakra.h3
                                py={2}
                                textAlign="center"
                                fontWeight="bold"
                                textTransform="uppercase"
                                color="gray.200"
                                _dark={{
                                color: "white",
                                }}
                                letterSpacing={1}
                            >
                                {value.productName}
                            </chakra.h3>

                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                py={2}
                                px={3}
                                bg="gray.200"
                                _dark={{
                                bg: "gray.700",
                                }}
                            >
                                <chakra.span
                                fontWeight="bold"
                                color="gray.800"
                                _dark={{
                                    color: "gray.200",
                                }}
                                >
                                ${value.price}
                                </chakra.span>
                                
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
                            </Flex>
                            </Box>
                        </Flex>
                        </Flex>
                )
            } ) : (
                
                wordEntered.length > 0 &&
                filteredData.length > 0 ? (
                    filteredData.map((value, key) => {
                        return (
                            <Flex
                                p={50}
                                w="full"
                                h="full"
                                alignItems="center"
                                justifyContent="center"
                                key={value._id}
                            >
                            <Flex
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                w="sm"
                                mx="auto"
                            >
                                <Box
                                    bg="gray.300"
                                    h={64}
                                    w="full"
                                    rounded="lg"
                                    shadow="md"
                                    bgSize="cover"
                                    bgPos="center"
                                    style={{
                                        backgroundImage:
                                        `url(${value.content[0]})`,
                                    }}
                                ></Box>
    
                                <Box
                                    w={{
                                        base: 56,
                                        md: 64,
                                    }}
                                    bg="gray.800"
                                    _dark={{
                                        bg: "gray.800",
                                    }}
                                    mt={-10}
                                    shadow="lg"
                                    rounded="lg"
                                    overflow="hidden"
                                >
                                <chakra.h3
                                    py={2}
                                    textAlign="center"
                                    fontWeight="bold"
                                    textTransform="uppercase"
                                    color="gray.200"
                                    _dark={{
                                    color: "white",
                                    }}
                                    letterSpacing={1}
                                >
                                    {value.productName}
                                </chakra.h3>
    
                                <Flex
                                    alignItems="center"
                                    justifyContent="space-between"
                                    py={2}
                                    px={3}
                                    bg="gray.200"
                                    _dark={{
                                    bg: "gray.700",
                                    }}
                                >
                                    <chakra.span
                                    fontWeight="bold"
                                    color="gray.800"
                                    _dark={{
                                        color: "gray.200",
                                    }}
                                    >
                                    ${value.price}
                                    </chakra.span>
                                    
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
                                </Flex>
                                </Box>
                            </Flex>
                            </Flex>
                        )
                    })
                    ) : (
                        
                        !selectedCategory ? (
                            products.map((product) => {
                                return (
                                    <Flex
                                        p={50}
                                        w="full"
                                        h="full"
                                        alignItems="center"
                                        justifyContent="center"
                                        key={product._id}
                                    >
                                    <Flex
                                        direction="column"
                                        justifyContent="center"
                                        alignItems="center"
                                        w="sm"
                                        mx="auto"
                                    >
                                        <Box
                                            bg="gray.300"
                                            h={64}
                                            w="full"
                                            rounded="lg"
                                            shadow="md"
                                            bgSize="cover"
                                            bgPos="center"
                                            style={{
                                                backgroundImage:
                                                `url(${product.content[0]})`,
                                            }}
                                        ></Box>
            
                                        <Box
                                            w={{
                                                base: 56,
                                                md: 64,
                                            }}
                                            bg="gray.800"
                                            _dark={{
                                                bg: "gray.800",
                                            }}
                                            mt={-10}
                                            shadow="lg"
                                            rounded="lg"
                                            overflow="hidden"
                                        >
                                        <chakra.h3
                                            py={2}
                                            textAlign="center"
                                            fontWeight="bold"
                                            textTransform="uppercase"
                                            color="gray.200"
                                            _dark={{
                                            color: "white",
                                            }}
                                            letterSpacing={1}
                                        >
                                            {product.productName}
                                        </chakra.h3>
            
                                        <Flex
                                            alignItems="center"
                                            justifyContent="space-between"
                                            py={2}
                                            px={3}
                                            bg="gray.200"
                                            _dark={{
                                            bg: "gray.700",
                                            }}
                                        >
                                            <chakra.span
                                            fontWeight="bold"
                                            color="gray.800"
                                            _dark={{
                                                color: "gray.200",
                                            }}
                                            >
                                            ${product.price}
                                            </chakra.span>
                                            
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
                                        </Flex>
                                        </Box>
                                    </Flex>
                                    </Flex>
                                )
                            })
                        ) : 

                        wordEntered.length > 0 && filteredData.length == 0 && 
    
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
                                <h3>¡Ooppsss! Parece que ese producto no existe.</h3>
                            </Flex>
                            </Flex>
                        )
                
                    
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