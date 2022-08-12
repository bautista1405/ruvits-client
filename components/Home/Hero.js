import Image from 'next/image'

import { chakra, Box, useColorModeValue, Icon, Link } from "@chakra-ui/react";

import learn from '../../assets/learn.png'
import designer from '../../assets/designer.png'
import ideas from '../../assets/ideas.jpg'
import peep1 from '../../assets/peep1-bg.png'
import peep2 from '../../assets/peep2-bg.png'

const Hero = () => {
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box pos="relative" overflow="hidden" bg={bg} mt={20} ml={20} >
      <Box maxW="7xl" mx="auto">
        <Box
          pos="relative"
          pb={{ base: 8, sm: 16, md: 20, lg: 28, xl: 32 }}
          maxW={{ lg: "2xl" }}
          w={{ lg: "full" }}
          zIndex={1}
          bg={bg}
          border="solid 1px transparent"
        >
          <Icon
            display={{ base: "none", lg: "block" }}
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            h="full"
            w={48}
            color={bg}
            transform="translateX(50%)"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </Icon>
          <Box
            mx="auto"
            maxW={{ base: "7xl" }}
            px={{ base: 4, sm: 6, lg: 8 }}
            mt={{ base: 10, sm: 12, md: 16, lg: 20, xl: 28 }}
          >
            <Box
              w="full"
              textAlign={{ sm: "center", lg: "left" }}
              justifyContent="center"
              alignItems="center"
            >
              <chakra.h1
                fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
                letterSpacing="tight"
                lineHeight="short"
                fontWeight="extrabold"
                color={useColorModeValue("gray.900", "white")}
              >
                <chakra.span display={{ base: "block", xl: "inline" }}>
                  Creá y vendé{" "}
                </chakra.span>
                <chakra.span
                  display={{ base: "block", xl: "inline" }}
                  color={useColorModeValue("brand.600", "brand.400")}
                >
                  tus productos digitales.
                </chakra.span>
              </chakra.h1>
              <chakra.p
                mt={{ base: 3, sm: 5, md: 5 }}
                fontSize={{ sm: "lg", md: "xl" }}
                maxW={{ sm: "xl" }}
                mx={{ sm: "auto", lg: 0 }}
                color="gray.500"
              >
                Vender tus productos nunca fue tan fácil. Asociá tu cuenta de Mercado Pago y empezá a vender. <br />
                Acá te dejamos una <Link href="/blog/crea-tu-producto" color="gray.800" fontWeight="bold">guía rápida</Link> para crear tu primer producto.
              </chakra.p>
              
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        display={["none", "none", "none", "block"]}
        position={{ lg: "absolute" }}
        top={{ lg: 0 }}
        bottom={{ lg: 0 }}
        right={{ lg: 0 }}
        w={["300px", "400px", "500px", "500px", "600px"]}
        border="solid 1px transparent"
      >
        <Image
          height="500px"
          width="500px"
          fit="cover"
          src={peep2}
          alt=""
          loading="lazy"
        />
      </Box>
    </Box>
  );
};

export default Hero;
