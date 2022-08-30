import React from "react";
import Link from 'next/link'
import { chakra, Flex, Icon, useColorModeValue, Text } from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <Flex
      w="full"
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        w="full"
        as="footer"
        flexDir={{ base: "column", sm: "row" }}
        align="center"
        justify="space-between"
        px="6"
        py="4"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
      >

        <Flex align="center" justify="center" flexDir={{ base: "column", sm: "column" }}>

        <Link
          href='/faqs'
          fontWeight="bold"
          color="gray.600"
          _dark={{
            color: "white",
            _hover: {
              color: "gray.300",
            },
          }}
          _hover={{
            color: "gray.700",
          }}
        >
          <Text fontSize={14} fontWeight="bold" style={{cursor: 'pointer'}}> Preguntas frecuentes </Text>
        </Link>
        <Link
          href="/terms"
          fontWeight="bold"
          color="gray.600"
          _dark={{
            color: "white",
            _hover: {
              color: "gray.300",
            },
          }}
          _hover={{
            color: "gray.700",
          }}
        >
          <Text fontSize={14} fontWeight="bold" style={{cursor: 'pointer'}}> Términos y condiciones </Text>
        </Link>
        <Link
          href="/privacy_policies"
          fontWeight="bold"
          color="gray.600"
          _dark={{
            color: "white",
            _hover: {
              color: "gray.300",
            },
          }}
          _hover={{
            color: "gray.700",
          }}
        >
          <Text fontSize={14} fontWeight="bold" style={{cursor: 'pointer'}}> Política de privacidad </Text>
        </Link>
        </Flex>

        <chakra.p
          py={{ base: "2", sm: "0" }}
          color="gray.700"
          _dark={{ color: "white" }}
          fontSize="md"
          fontWeight="bold"
          
        >
         ©️ Ruvits | 2022
        </chakra.p>

        <Flex mx="-2">
          <chakra.a
            href="https://twitter.com/ruvitsarg"
            mx="2"
            color="gray.600"
            _dark={{ color: "gray.300", _hover: { color: "gray.400" } }}
            _hover={{
              color: "gray.500",
            }}
            aria-label="Reddit"
            
          >
            <Icon boxSize="5" viewBox="0 0 24 24" fill="currentColor" as={FaTwitter}>
              
            </Icon>
          </chakra.a>

          <chakra.a
            href="#"
            mx="2"
            color="gray.600"
            _dark={{ color: "gray.300", _hover: { color: "gray.400" } }}
            _hover={{
              color: "gray.500",
            }}
            aria-label="Facebook"
          >
            <Icon boxSize="5" viewBox="0 0 24 24" fill="currentColor" as={FaInstagram}>
              
            </Icon>
          </chakra.a>

         
        </Flex>
      </Flex>
    </Flex>
  );
}
