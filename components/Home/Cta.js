import Image from 'next/image'
import {
  chakra,
  Box,
  useColorModeValue,
  Flex,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";

import { FiExternalLink } from "react-icons/fi";

import learn from '../../assets/learn.png'
import designer from '../../assets/designer.png'
import ideas from '../../assets/ideas.jpg'
import peep1 from '../../assets/peep1-bg.png'
import peep2 from '../../assets/peep2-bg.png'
import peep3 from '../../assets/peep3-bg.png'
import peep4 from '../../assets/peep4-bg.png'

const CTA = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={0} pl={20} >
      <Flex bg="brand.400" display={["none", "none", "block", "block"]} ml={20}>
        <Image
          src={peep4}
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
          ¿Querés aprender y no sabés por dónde empezar?
        </chakra.span>
        <chakra.h1
          mb={4}
          fontSize={{ base: "4xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={useColorModeValue("brand.600", "gray.300")}
          lineHeight="shorter"
          textShadow="2px 0 currentcolor"
        >
          Nosotros te ayudamos
        </chakra.h1>
        <chakra.p
          pr={{ base: 0, lg: 16 }}
          mb={4}
          fontSize="lg"
          color={useColorModeValue("brand.600", "gray.400")}
          letterSpacing="wider"
        >
          ¡Visitá <a href='https://it-resources.vercel.app/'> <b>IT Resources</b> </a> y encontrá recursos para empezar tu camino!

        </chakra.p>
        <Box display="inline-flex" rounded="md" shadow="md">
          <chakra.a
            mt={2}
            display="inline-flex"
            alignitems="center"
            justifyContent="center"
            px={5}
            py={3}
            border="solid transparent"
            fontWeight="bold"
            w="full"
            rounded="md"
            color={useColorModeValue("gray.700")}
            bg={useColorModeValue("brand.600", "brand.500")}
            _hover={{
              bg: useColorModeValue("brand.700", "brand.600"),
            }}
            href='https://it-resources.vercel.app/'
            target="blank"
          >
            Ir a IT Resources
            <Icon as={FiExternalLink} ml={2} />
          </chakra.a>
        </Box>
      </Flex>
    </SimpleGrid>
  );
};

export default CTA;
