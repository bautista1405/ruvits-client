import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from "next-auth/client";
import {getSession} from "next-auth/client"

import { SimpleGrid, Box, Flex, chakra, Link, Input } from '@chakra-ui/react'

import image from '../../assets/transaction.png'

const Discover = () => {

    const [session, loading] = useSession();
    
    const [products, setProducts] = useState([]);
    const [filteredData, setFilteredData] = useState(products);
    const [wordEntered, setWordEntered] = useState("");

    const url = "http://3.95.83.1:3000/api/products"
    
    useEffect(() => {
        axios.get(url).then((res) => {
            setProducts(res?.data || []);
            
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
    

  return (
    <div>
        <Flex justify="center">
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
        <SimpleGrid 
            columns={[1, 2, 2, 3]} 
            spacing={10} 
            bg="#edf3f8" 
            margin="50px" 
            shadow="base"
            rounded={[null, "md"]}
            borderRadius="5px" 
        >

            {filteredData.length > 0 ? (
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
                                {value.title}
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
                                {/* <chakra.span
                                fontWeight="bold"
                                color="gray.800"
                                _dark={{
                                    color: "gray.200",
                                }}
                                >
                                ${value.vendor}
                                </chakra.span> */}
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

                    wordEntered.length == 0 && products.map((value, key) => (

                    <Flex
                        p={50}
                        w="full"
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
                                {value.title}
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
                                    <chakra.span
                                    fontWeight="bold"
                                    color="gray.800"
                                    _dark={{
                                        color: "gray.200",
                                    }}
                                >
                                    {value.vendor}
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