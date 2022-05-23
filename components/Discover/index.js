import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useSession } from "next-auth/client";

import { SimpleGrid, Box, Flex, chakra, Link } from '@chakra-ui/react'

import image from '../../assets/transaction.png'

const Discover = () => {

    const [session, loading] = useSession();
    
    const [products, setProducts] = useState([]);

    const url = "http://3.95.83.1:3000/api/products"
    
    useEffect(() => {
        axios.get(url).then((res) => {
            setProducts(res?.data || []);
            console.log(res.data)
        })
    }, [url])

  return (
    <div>
        <SimpleGrid columns={2} spacing={10}>
            {products.map(product => {
                return (
                        <Flex
                            bg="transparent"
                            p={50}
                            w="full"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box
                                mx="auto"
                                rounded="lg"
                                shadow="md"
                                bg="gray"
                                maxW="2xl"
                            >
                                <Image
                                roundedTop="lg"
                                width="500px"
                                height="500px"
                                fit="cover"
                                src={image}
                                alt="Article"
                                />
                                <hr></hr>
                                <Box p={6}>
                                <Box>
                                    <Link
                                    display="block"
                                    color="gray.800"
                                    fontWeight="bold"
                                    fontSize="2xl"
                                    mt={2}
                                    _hover={{ color: "gray.600", textDecor: "underline" }}
                                    >
                                    {product.title}
                                    </Link>
                                    <chakra.p
                                    mt={2}
                                    fontSize="sm"
                                    color="gray.600"
                                    >
                                    {product.description}
                                    </chakra.p>
                                </Box>
                                
                                <Box mt={4}>
                                    <Flex alignItems="center">
                                    <Flex alignItems="center">
                                        <Image
                                        h={10}
                                        fit="cover"
                                        rounded="full"
                                        width="10px"
                                        height="10px"
                                        src={image}
                                        alt="Avatar"
                                        />
                                        <Link
                                        mx={2}
                                        fontWeight="bold"
                                        color="gray.400"
                                        >
                                        {/* {session.user.name} */}
                                        </Link>
                                    </Flex>
                                    <chakra.span
                                        mx={1}
                                        fontSize="sm"
                                        color="gray.300"
                                    >
                                        ${product.price}
                                    </chakra.span>
                                    </Flex>
                                </Box>
                                </Box>
                            </Box>
                        </Flex>
                    )
            })}
        </SimpleGrid>
    </div>
  )
}

export default Discover