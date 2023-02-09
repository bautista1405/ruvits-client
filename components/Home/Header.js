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
      <SimpleGrid 
        columns={{ base: 1, md: 2 }} 
        spacing={50} 
        pl={20}
      >
        <Flex display={["none", "none", "block", "block"]} ml={20}>
          <Image
            src={peep5}
            alt="3 women looking at a laptop"
            fit="cover"
            width="350px"
            h="350px"
            bg="gray.100"
            loading="lazy"
            // style={{filter:"drop-shadow(8px 8px 30px rgb(88, 200, 228))"}}
          />
        </Flex>
        <Flex
          direction="column"
          alignItems="start"
          justifyContent="center"
          // px={{ base: 4, md: 8, lg: 20 }}
          // py={24}
          // zIndex={3}
          mr={20}
          
        >
          <Box> 
            <chakra.span
              color={useColorModeValue("brand.600", "gray.300")}
              fontSize="lg"
              textTransform="uppercase"
              fontWeight="extrabold"
            >
              ¿Sos creador de contenido digital?
            </chakra.span>
            <chakra.h1
              mb={4}
              fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
              fontWeight="bold"
              color={useColorModeValue("brand.600", "gray.300")}
              lineHeight="shorter"
              textShadow="2px 0 currentcolor"
            >
              Crealo una vez, vendelo muchas veces.
            </chakra.h1>
            <chakra.p
              pr={{ base: 0, lg: 16 }}
              mb={4}
              fontSize="lg"
              color={useColorModeValue("brand.600", "gray.400")}
              letterSpacing="wider"
            >
              Vendé tus productos de una manera simple. Asociá tu cuenta de Mercado Pago (Argentina) y empezá a vender. <br />
              Acá te dejamos una  <b style={{textDecoration: 'underline'}}><Link href="/blog/crea-tu-producto" color="gray.800" fontWeight="bold">guía rápida</Link></b> para 
              crear tu primer producto y te contamos <b style={{textDecoration: 'underline'}}><Link href="/blog/como-funciona-ruvits" color="gray.800" fontWeight="bold">
              cómo funciona Ruvits.</Link></b>

            </chakra.p>
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
            <Text ml={2} fontSize={22}>Tarjeta de crédito</Text>
          </Stack>
        </Flex>

        <Flex>
          <Stack direction='horizontal' alignItems='center'>
            <Image src={debitCard} w='20px' h='20px' />
            <Text ml={2} fontSize={22}>Tarjeta de débito</Text>
          </Stack>
        </Flex>

        <Flex>
          <Stack direction='horizontal' alignItems='center'>
            <Image src={mpIcon} w='20px' h='20px' />
            <Text ml={2} fontSize={22}>Mercado Pago (Argentina)</Text>
          </Stack>
        </Flex>
      </Flex>
      
    </>
  );
};

export default Header;
