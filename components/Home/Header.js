import Image from 'next/image'
import Link from 'next/link'
import {
  chakra,
  Box,
  useColorModeValue,
  Button,
  Flex,
  Stack,
  SimpleGrid,
  Icon,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";

import { FiExternalLink } from "react-icons/fi";
import {MdCreditScore} from "react-icons/md"

import learn from '../../assets/learn.png'
import designer from '../../assets/designer.png'
import ideas from '../../assets/ideas.jpg'
import peep1 from '../../assets/peep1-bg.png'
import peep2 from '../../assets/peep2-bg.png'
import peep3 from '../../assets/peep3-bg.png'
import peep4 from '../../assets/peep4-bg.png'
import peep5 from '../../assets/peep5-bg.png'

import mpIcon from '../../assets/mp-icon.png'
import creditCard from '../../assets/credit-card.png'
import debitCard from '../../assets/debit-card.png'


const Header = () => {
  return (
    <>
      <Flex columns={{ base: 1, md: 2 }} justifyContent='center' mb={10} >
        <Stack p='20px'>
            <chakra.span
              color={useColorModeValue("brand.600", "gray.300")}
              fontSize="lg"
              textTransform="uppercase"
              fontWeight="extrabold"
              textAlign='center'
            >
              ¿Sos creador de contenido digital?
            </chakra.span>
            <chakra.h1
              mb={4}
              fontSize={{ base: "4xl", md: "4xl", lg: "4xl" }}
              fontWeight="bold"
              color={useColorModeValue("brand.600", "gray.300")}
              lineHeight="shorter"
              textShadow="2px 0 currentcolor"
            >
              Crealo una vez, vendelo muchas veces.
            </chakra.h1>
        </Stack>
      </Flex>
      <SimpleGrid 
        placeContent='center'
        columns={{ base: 1, md: 2 }} 
        mb={10}
      >
        <Flex display={["block", "block", "block", "block"]} margin='auto' fontSize={18}
         shadow="base"
         rounded={[null, "md"]}
         borderRadius="5px"
         boxShadow='2xl' 
         p='6'
         bg='#eff2f5'
         h={{base: '320px', md: '300px', lg: '290px', xl: '260px'}}
         w={{base: '300px', md: '350px', lg: '500px', xl: '500px'}}
        >

          <Stack>
                  <Text fontWeight='bold'>Sin Ruvits ❌</Text>
                  <chakra.ul>
                    <Text>💤 Crea tu producto</Text>
                    <Text>💤 Compra un dominio</Text>
                    <Text>💤 Configura tu servicio de host</Text>
                    <Text>💤 Diseña tu página web</Text>
                    <Text>💤 Configura pasarela de pagos</Text>
                    <Text>💤 Empezá a vender</Text>
                    <Text>💤 Envía el producto a tus compradores</Text>
                  </chakra.ul>
          </Stack>
        </Flex>
        <Flex
          // direction="column"
          // alignItems="start"
          // justifyContent="center"
          // px={{ base: 4, md: 8, lg: 20 }}
          // py={24}
          // zIndex={3}
          // mr={20}
          margin='auto'
        >
          <Box fontSize={18}
          shadow="base"
          rounded={[null, "md"]}
          borderRadius="5px"
          boxShadow='2xl' 
          p='6'
          bg='#eff2f5'
          h={{base: '250px', md: '300px', lg: '290px', xl: '260px'}}
          w={{base: '300px', md: '350px', lg: '500px', xl: '500px'}}
          > 

              <Stack>
               <Text fontWeight='bold'>Con Ruvits ✔️</Text> 
                <chakra.ul>
                  <Text>✅ Crea tu producto</Text>
                  <Text>✅ Asocía tu cuenta de Mercado Pago</Text>
                  <Text>✅ Subí tu producto</Text>
                  <Text>✅ Empezá a vender</Text>
                  <Text>✅ Tu producto es enviado automáticamente</Text>
                </chakra.ul>
              </Stack>
            
          </Box> 
        </Flex>
      </SimpleGrid>
      
      <Flex
        display={{base: 'none', md: 'flex', lg: 'flex', xl: 'lg'}}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        bg='#F9FAFB'
        w={['300px', '300px', '700px', '900px']}
        h='80px'
        margin='auto'
        justifyContent='space-around'
        
      >
        <Flex>
          <Stack direction='horizontal' alignItems='center'>
            <Image src={creditCard} w='20px' h='20px' />
            <Text ml={2} fontSize={18}>Tarjeta de crédito</Text>
          </Stack>
        </Flex>

        <Flex mt={4}>
          <Stack>
            
            <Stack direction='horizontal' alignItems='center' pl={7}>
              <Image src={debitCard} w='20px' h='20px' />
              <Text ml={2} fontSize={18}>Tarjeta de débito</Text>
            </Stack>

            <Stack >
              <Text mt={5} mb={5} textAlign='center'>*MP solo acepta pagos de Argentina</Text>
            </Stack>

          </Stack>
        </Flex>

        <Flex>
          <Stack direction='horizontal' alignItems='center'>
            <Image src={mpIcon} w='20px' h='20px' />
            <Text ml={2} fontSize={18}>Mercado Pago (Argentina)</Text>
          </Stack>
        </Flex>
      </Flex>
      
    </>
  );
};

export default Header;
