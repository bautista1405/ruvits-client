import React from "react";
import Link from 'next/link'
import { signIn, signOut, useSession, getSession } from "next-auth/client";
import Image from 'next/image'
import { useRouter } from 'next/router'

import {
  chakra,
  Flex,
  HStack,
  Button,
  useColorModeValue,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  useDisclosure,
  Spacer,
  IconButton,
  SimpleGrid,
  Stack,
  VStack,
  CloseButton,
 
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider
} from "@chakra-ui/react";

import { IoIosArrowDown } from "react-icons/io";
import {FiChevronDown} from "react-icons/fi"
import {FcGoogle} from 'react-icons/fc'
import { AiFillHome, AiOutlineInbox, AiOutlineMenu } from "react-icons/ai";
import {GrBlog} from "react-icons/gr"
import {RiCompassDiscoverLine} from "react-icons/ri"
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FaMoon, FaSun } from "react-icons/fa";

import Logo from '../../assets/logo-bg.png'

export default function WfWf() {
  const bg = useColorModeValue("white", "gray.800");
  const cl = useColorModeValue("gray.800", "white");
  const mobileNav = useDisclosure();
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const ic = useColorModeValue("brand.600", "brand.50");
  const hbg = useColorModeValue("gray.50", "brand.400");
  const tcl = useColorModeValue("gray.900", "gray.50");
  const dcl = useColorModeValue("gray.500", "gray.50");
  const hbgh = useColorModeValue("gray.100", "brand.500");
  
  const [session, loading] = useSession();
  const router = useRouter();

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />

      <Link href='/descubre'>
        <Button w="full" variant="ghost" leftIcon={<RiCompassDiscoverLine />}>
          Descubrir
        </Button>
      </Link>

      {/* <Link href='/blog'>
      <Button w="full" variant="ghost" leftIcon={<GrBlog />}>
        Blog
      </Button>
      </Link> */}
      
    </VStack>
  );

  return (
    <React.Fragment>
      <chakra.header h="full" bg={bg} w="full" px={{ base: 2, sm: 14 }} >
        <Flex alignItems="center" justifyContent="space-between" mx="auto" margin="30px" >
          <Link display="flex" alignItems="center" href="/"  >
            <Image src={Logo} alt="logo" width="100px" height="100px" style={{cursor: 'pointer'}} />
            
          </Link>
          {/* <Spacer /> */}
          <Box display="flex" alignItems="center">
          <HStack spacing={2}>
          <Box display={{ base: "none", md: "inline-flex" }} >
            <HStack spacing={1}>
              
              <Button
                  bg={bg}
                  color="gray.700"
                  alignItems="center"
                  fontSize="md"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: "none" }}
                  colorScheme='gray' variant='ghost'
                >
                  <Link display="flex" alignItems="center" href="/descubre">
                    Descubrir
                  </Link>
                </Button>
                
              
              {/* <Button
                bg={bg}
                color="gray.700"
                display="inline-flex"
                alignItems="center"
                fontSize="md"
                _hover={{ color: cl }}
                _focus={{ boxShadow: "none" }}
                colorScheme='gray.400' variant='outline'
              >
                <Link display="flex" alignItems="center" href="/blog">
                    Blog
                </Link>
              </Button> */}
            </HStack>
          </Box>
            {session && (
              <>
                <Menu>
                  <MenuButton as={Button} rightIcon={<FiChevronDown />}>
                    <Avatar src={session.user.image} alt="user image" width="30px" height="30px" />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      
                        <Link href="/dashboard">
                          <p>Dashboard</p>
                        </Link> 
                      
                    </MenuItem>
                    <MenuItem>
                      <p onClick={() => signOut()}>Cerrar sesión</p>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )} 
            {!session && (
              <Button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "https://www.ruvits.com/onboard",
                  })
                }
                rightIcon={<FcGoogle />}
              >
                Ingresar 
              </Button>
            )}
            </HStack>
            {/* <IconButton
              size="md"
              fontSize="lg"
              aria-label={`Switch to ${text} mode`}
              variant="ghost"
              color="current"
              ml={{ base: "0", md: "3" }}
              onClick={toggleMode}
              icon={<SwitchIcon />}
            /> */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              color={useColorModeValue("gray.800", "inherit")}
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
          </Box>
        </Flex>

        {MobileNavContent}
      </chakra.header>
    </React.Fragment>
  );
}


export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}