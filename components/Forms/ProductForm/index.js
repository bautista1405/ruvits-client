import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { useRouter } from 'next/router'

import {
  chakra,
  Box,
  Flex,
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
import { useFormik, Field, Formik } from "formik";
import swal from 'sweetalert';

import { FaUser } from "react-icons/fa";
import { signIn, signOut, useSession, getSession, session } from "next-auth/client";

export default function ProductForm() {

    const [error, setError] = useState(null)

    const [session, loading] = useSession();

    const router = useRouter()

    const headers = {
        'Content-Type': 'multipart/form-data',
    }
  
    const formik = useFormik({
      initialValues: {
        vendor: session.user.name,
        title: '',
        description: '',
        price: Number,
        content: [],
        mpAccessToken: session.mpAccessToken || null, //we get the access token from the user
      },
      onSubmit: (values = {vendor, title, description, price, photos, content, mpAccessToken}) => {
        try {
          axios.post(
            'http://3.95.83.1:3000/api/products', 
            {
              vendor: values.vendor,
              title: values.title, 
              description: values.description, 
              price: values.price, 
              photos: values.photos,
              content: values.content, 
              mpAccessToken: values.mpAccessToken,
            },
            {headers}
            )
            .then( () => {
              swal({
                title: "Tu producto fue exitosamente creado.",
                text: "¡Tu producto ya está online!",
                icon: "success",
              }).then(() => {router.push('/dashboard')})
            })
            
          } catch(err) {
              
          }    
      },
    });

    useEffect(() => {
      if(session && !session.mpAccessToken) {
        swal({
          title: "Parece que todavía no vinculaste tu cuenta con MercadoPago.",
          text: '',
          icon: "warning",
          button: "Vincular mi cuenta",
        })
        .then(() => {router.push('/dashboard/pagos')})
      }
    }, [])

  return (
    <>
      {!session && (<p>Debes estar logueado para ver esta página</p>) } 
      {session && !session.mpAccessToken && 
        ( 
        <>
          <Flex alignItems="center" justifyContent="center" h="54vh">
            {/* <p>
              Parece que todavía no vinculaste tu cuenta con Mercado Pago.
            </p>
            <p mt={5}>
              <Link href='/dashboard/pagos'>
                ¡Acá lo podés hacer!
              </Link>
            </p> */}
          </Flex>
          </>
        ) 
      }

      {session && session.mpAccessToken &&
      
      <Box 
        margin="100px" 
        shadow="base"
        rounded={[null, "md"]}
        borderRadius="5px"
        backgroundColor="gray.100"
        w={["70vw", "100vw", "90vw", "83vw", "86vw"]}
        
      >
          <SimpleGrid
            display={{ base: "initial", md: "grid" }}
            columns={{ md: 3 }}
            spacing={{ md: 6 }}
            
          >
            <GridItem colSpan={{ md: 1 }}>
              <Box px={[4, 0]} margin="30px"  >
                <Heading fontSize="lg" fontWeight="md" lineHeight="6" >
                  Tu producto
                </Heading>
                <Text
                  mt={1}
                  fontSize="sm"
                  color="gray.700"
                >
                  Acá vas a poder agregar tu producto y toda su información correspondiente.
                </Text>
              </Box>
            </GridItem>
            <GridItem mt={[5, null, 0]} colSpan={{ md: 2 }}>
              
              <form
                // target="invisible"
                encType="multipart/form-data" 
                // method="post" 
                // action="http://3.95.83.1:3000/api/products"
                shadow="base"
                rounded={[null, "md"]}
                overflow={{ sm: "hidden" }}
                onSubmit={formik.handleSubmit}
                // onSubmit={ () => { swal({
                //   title: "Tu producto fue exitosamente creado.",
                //   text: "¡Tu producto ya está online!",
                //   icon: "success",
                //   }).then(() => {router.push('/dashboard')})} 
                // }
              >
                <Stack
                  px={4}
                  py={5}
                  bg="white"
                  spacing={6}
                  p={{ sm: 6 }}
                >

                  <Input 
                    type="hidden"
                    id="vendor" 
                    name='vendor'
                    value={formik.values.vendor}
                    required  
                  />

                  <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                      >
                        Nombre
                      </FormLabel>
                      <InputGroup size="sm">
                        <Input
                          placeholder="Nombre de tu producto..."  
                          type='text'
                          id='title'
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
                        color="gray.700"
                      >
                        Descripción
                      </FormLabel>
                      <Textarea
                        placeholder="Describe tu producto..."  
                        type='text'
                        id='description'
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

                  <FormControl>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="md"
                      color="gray.700"
                    >
                      Foto de portada de tu producto
                    </FormLabel>
                    <Flex alignItems="center" mt={1}>
                    <chakra.label
                            htmlFor="file-upload1"
                            cursor="pointer"
                            rounded="md"
                            fontSize="sm"
                            color="brand.700"
                            pos="relative"
                            _hover={{
                              color: "brand.400",
                            }}
                    >
                            
                            <Icon
                              mx="auto"
                              boxSize={12}
                              color="gray.500"
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
                            
                            <VisuallyHidden>
                              <Input
                                type="file"  
                                id="file-upload1"
                                accept="image/jpeg,image/png"
                                name='photos'
                                value={undefined}
                                onChange={(e) =>
                                  formik.setFieldValue('photos', e.currentTarget.files[0])
                                }
                                onBlur={formik.handleBlur}
                                required
                              />
                            </VisuallyHidden>
                          </chakra.label>
                    </Flex>
                          <FormHelperText>
                            Esta foto es la que aparecerá cuando vean tu producto
                          </FormHelperText>
                  </FormControl>

                  <SimpleGrid columns={3} spacing={6}>
                    <FormControl as={GridItem} colSpan={[3, 2]}>
                      <FormLabel
                        fontSize="sm"
                        fontWeight="md"
                        color="gray.700"
                      >
                        Precio
                      </FormLabel>
                      <InputGroup size="sm">
                        <Input
                          placeholder="Precio de tu producto..."  
                          type='number'
                          id='price'
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
                      color="gray.700"
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
                      borderColor="gray.500"
                      borderStyle="dashed"
                      rounded="md"
                    >
                      <Stack spacing={1} textAlign="center">
                        <Icon
                          mx="auto"
                          boxSize={12}
                          color="gray.400"
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
                          color="gray.500"
                          alignItems="baseline"
                        >
                          <chakra.label
                            htmlFor="file-upload"
                            cursor="pointer"
                            rounded="md"
                            fontSize="md"
                            color="brand.700"
                            pos="relative"
                            _hover={{
                              color: "brand.400",
                            }}
                          >
                            <span>Sube 1 (un) archivo</span>
                            <VisuallyHidden>
                              <Input
                                type="file"  
                                id="file-upload" 
                                name='content'
                                value={undefined}
                                onChange={(e) =>
                                  formik.setFieldValue('content', e.currentTarget.files[0])
                                }
                                onBlur={formik.handleBlur}
                                required
                                />
                            </VisuallyHidden>
                          </chakra.label>
                          
                        </Flex>
                        <Text
                          fontSize="xs"
                          color="gray.500"
                        >
                          PNG, JPG, PDF, MP4, PPT
                        </Text>
                      </Stack>
                    </Flex>
                    <FormHelperText mt={5} fontSize="md" >
                    ⚠️ ¡Acordate que cuanto mejor sea la descripción de tu producto, más llamará la atención! ⚠️
                    </FormHelperText>
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
                  bg="gray.400"
                  display="flex"
                  justifyContent="center"
                  shadow="base"
                  rounded={[null, "md"]}
                  borderRadius="5px"
                  >
                  <Button
                    type="submit"
                    color="gray.700"
                    _focus={{ shadow: "" }}
                    fontWeight="md"
                    
                  >
                    <b>Crear producto</b>
                  </Button>
                </Box>
              </form>
              
            </GridItem>
          </SimpleGrid>
          {/* <iframe id="invisible" name="invisible" style={{backgroundColor: "red"}}></iframe> */}
        </Box>
      }
      </>
  );
}
