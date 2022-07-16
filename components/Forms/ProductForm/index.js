import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  Heading,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormHelperText,
  Textarea,
  Avatar,
  Icon,
  Button,
  VisuallyHidden,
  Select,
  Checkbox,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import axios from 'axios'
import { useFormik } from "formik";
import swal from 'sweetalert';

import { FaUser } from "react-icons/fa";
import { signIn, signOut, useSession, getSession, session } from "next-auth/client";

export default function ProductForm() {

    const [error, setError] = useState(null)

    const [session, loading] = useSession();

    const router = useRouter()
  
    const formik = useFormik({
      initialValues: {
        title: '',
        description: '',
        price: Number,
        content: [],
        mpAccessToken: session.mpAccessToken || null, //we get the access token from the user
      },
      onSubmit: (values = {title, description, price, content, mpAccessToken}) => {
        try {
          axios.post(
            'http://3.95.83.1:3000/api/products', 
            {
              title: values.title, 
              description: values.description, 
              price: values.price, 
              content: values.content, 
              mpAccessToken: values.mpAccessToken
            },
            ).then(res => {
              if (res) {
                setError('Producto creado exitosamente')
              }
            }).catch(e => {
                setError('El email ya está en uso') 
              })
            
          } catch(err) {
              
          }    
      },
    });
  

  return (
    
      <Box margin="100px">
        <SimpleGrid
          display={{ base: "initial", md: "grid" }}
          columns={{ md: 3 }}
          spacing={{ md: 6 }}
        >
          <GridItem colSpan={{ md: 1 }}>
            <Box px={[4, 0]}>
              <Heading fontSize="lg" fontWeight="md" lineHeight="6">
                Tu producto
              </Heading>
              <Text
                mt={1}
                fontSize="sm"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Acá vas a poder agregar tu producto y toda su información correspondiente.
              </Text>
            </Box>
          </GridItem>
          <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
            <chakra.form
              target="invisible"
              encType="multipart/form-data" 
              method="post" 
              action="http://3.95.83.1:3000/api/products"
              shadow="base"
              rounded={[null, "md"]}
              overflow={{ sm: "hidden" }}
              onSubmit={ () => { swal({
                title: "Tu producto fue exitosamente creado.",
                text: "¡Tu producto ya está online!",
                icon: "success",
                }).then(() => {router.push('/dashboard')})} 
              }
            >
              <Stack
                px={4}
                py={5}
                bg={useColorModeValue("white", "gray.700")}
                spacing={6}
                p={{ sm: 6 }}
              >
                <SimpleGrid columns={3} spacing={6}>
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Nombre
                    </FormLabel>
                    <InputGroup size="sm">
                      <Input
                        placeholder="Nombre de tu producto..."  
                        type='text'
                        id='name'
                        name='title'
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        focusBorderColor="brand.400"
                        rounded="md"
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>

                <div>
                  <FormControl id="email" mt={1}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Descripción
                    </FormLabel>
                    <Textarea
                      placeholder="Describe tu producto..."  
                      type='text'
                      id='lastname'
                      name='description'
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      mt={1}
                      rows={3}
                      shadow="sm"
                      focusBorderColor="brand.400"
                      fontSize={{ sm: "sm" }}
                    />
                    <FormHelperText>
                      Breve descripción: puede ser el tipo de contenido, el tipo de archivo...
                    </FormHelperText>
                  </FormControl>
                </div>

                {/* <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Photo
                  </FormLabel>
                  <Flex alignItems="center" mt={1}>
                    <Avatar
                      boxSize={12}
                      bg={useColorModeValue("gray.100", "gray.800")}
                      icon={
                        <Icon
                          as={FaUser}
                          boxSize={9}
                          mt={3}
                          rounded="full"
                          color={useColorModeValue("gray.300", "gray.700")}
                        />
                      }
                    />
                    <Button
                      type="button"
                      ml={5}
                      variant="outline"
                      size="sm"
                      fontWeight="medium"
                      _focus={{ shadow: "none" }}
                    >
                      Change
                    </Button>
                  </Flex>
                </FormControl> */}

                <SimpleGrid columns={3} spacing={6}>
                  <FormControl as={GridItem} colSpan={[3, 2]}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color={useColorModeValue("gray.700", "gray.50")}
                    >
                      Precio
                    </FormLabel>
                    <InputGroup size="sm">
                      <Input
                        placeholder="Precio de tu producto..."  
                        type='number'
                        id='email'
                        name='price'
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        focusBorderColor="brand.400"
                        rounded="md"
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color={useColorModeValue("gray.700", "gray.50")}
                  >
                    Contenido/archivos
                  </FormLabel>
                  <Flex
                    mt={1}
                    justify="center"
                    px={6}
                    pt={5}
                    pb={6}
                    borderWidth={2}
                    borderColor={useColorModeValue("gray.300", "gray.500")}
                    borderStyle="dashed"
                    rounded="md"
                  >
                    <Stack spacing={1} textAlign="center">
                      <Icon
                        mx="auto"
                        boxSize={12}
                        color={useColorModeValue("gray.400", "gray.500")}
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </Icon>
                      <Flex
                        fontSize="sm"
                        color={useColorModeValue("gray.600", "gray.400")}
                        alignItems="baseline"
                      >
                        <chakra.label
                          htmlFor="file-upload"
                          cursor="pointer"
                          rounded="md"
                          fontSize="md"
                          color={useColorModeValue("brand.600", "brand.200")}
                          pos="relative"
                          _hover={{
                            color: useColorModeValue("brand.400", "brand.300"),
                          }}
                        >
                          <span>Sube un archivo</span>
                          <VisuallyHidden>
                            <Input
                              type="file" 
                              placeholder="Tu contraseña..." 
                              id="file-upload" 
                              name='content'
                              value={formik.values.content}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              required
                            />
                          </VisuallyHidden>
                        </chakra.label>
                        
                      </Flex>
                      <Text
                        fontSize="xs"
                        color={useColorModeValue("gray.500", "gray.50")}
                      >
                        PNG, JPG, PDF, MP4
                      </Text>
                    </Stack>
                  </Flex>
                </FormControl>
              </Stack>
              
              <Input 
                type="hidden"
                id="mpAccessToken" 
                name='mpAccessToken'
                value={formik.values.mpAccessToken}
                required  
              />
              
              <Box
                px={{ base: 4, sm: 6 }}
                py={3}
                bg={useColorModeValue("gray.50", "gray.900")}
                display="flex"
                justifyContent="center"
              >
                <Button
                  type="submit"
                  color="white"
                  _focus={{ shadow: "" }}
                  fontWeight="md"
                  onSubmit={ () => { swal({
                            title: "Tu producto fue exitosamente creado.",
                            text: "¡Tu producto ya está online!",
                            icon: "success",
                            })} 
                          }
                >
                  Crear producto
                </Button>
              </Box>
            </chakra.form>
          </GridItem>
        </SimpleGrid>
        <iframe id="invisible" name="invisible" style={{backgroundColor: "red"}}></iframe>
      </Box>
  );
}
