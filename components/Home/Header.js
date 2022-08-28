import Image from 'next/image'
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Icon,
  Link,
} from "@chakra-ui/react";

import { FiExternalLink } from "react-icons/fi";

import learn from '../../assets/learn.png'
import designer from '../../assets/designer.png'
import ideas from '../../assets/ideas.jpg'
import peep1 from '../../assets/peep1-bg.png'
import peep2 from '../../assets/peep2-bg.png'
import peep3 from '../../assets/peep3-bg.png'
import peep4 from '../../assets/peep4-bg.png'
import peep5 from '../../assets/peep5-bg.png'

const Header = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={50} pl={20} >
      <Flex bg="brand.400" display={["none", "none", "block", "block"]} ml={20}>
        <Image
          src={peep5}
          alt="3 women looking at a laptop"
          fit="cover"
          width="350px"
          h="350px"
          bg="gray.100"
          loading="lazy"
          
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
          Publicá y vendé tu contenido en nuestra tienda.
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
        >
          Vendé tus productos de una manera simple. Asociá tu cuenta de Mercado Pago y empezá a vender. <br />
          Acá te dejamos una <Link href="/blog/crea-tu-producto" color="gray.800" fontWeight="bold">guía rápida</Link> para 
          crear tu primer producto y te contamos <Link href="/blog/como-funciona-ruvits" color="gray.800" fontWeight="bold">
            cómo funciona Ruvits.</Link>

        </chakra.p>
        
      </Flex>
    </SimpleGrid>
  );
};

export default Header;
