// import Link from 'next/link'
// import Image from 'next/image'

import { Box, Flex, Text, chakra, Image, Link } from "@chakra-ui/react";

const storeDescription = (props) => {
    const {description, storeOwner, avatar, personalPage, email} = props

  return (
    <>
        <Flex
            bg="#F9FAFB"
            // _dark={{
            //     bg: "#3e3e3e",
            // }}
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
            >
            <Box
                mx="auto"
                px={8}
                py={4}
                rounded="lg"
                shadow="dark-lg"
                bg="white"
                _dark={{
                bg: "gray.800",
                }}
                maxW="2xl"
            >
                <Flex justifyContent="flex-end" alignItems="center">
                
                <Link
                    px={3}
                    py={1}
                    bg="gray.600"
                    color="gray.100"
                    fontSize="sm"
                    fontWeight="700"
                    rounded="md"
                    _hover={{
                    bg: "gray.500",
                    }}
                    href={personalPage}
                >
                    ¡Visita mi página!
                </Link>
                </Flex>

                <Box mt={2}>
                
                <chakra.p
                    mt={2}
                    color="gray.600"
                    _dark={{
                    color: "gray.300",
                    }}
                >
                    {description}
                </chakra.p>
                </Box>

                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                <Link
                    color="teal"
                    // _dark={{
                    // color: "brand.400",
                    // }}
                    _hover={{
                    textDecor: "underline",
                    }}
                    href={email}
                >
                    ¡Contactame!
                </Link>

                <Flex alignItems="center">
                    <Image
                    mx={4}
                    w={10}
                    h={10}
                    rounded="full"
                    fit="cover"
                    display={{
                        base: "none",
                        sm: "block",
                    }}
                    src={avatar}
                    alt="avatar"
                    />
                    <Text
                    color="gray.700"
                    _dark={{
                        color: "gray.200",
                    }}
                    fontWeight="700"
                    >
                        {storeOwner}
                    </Text>
                </Flex>
                </Flex>
            </Box>
            </Flex>

    </>
  )
}

export default storeDescription