import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Text } from '@chakra-ui/react'

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
import { useSession } from "next-auth/client";
import mongoose from 'mongoose';
import { useFormik, Field, Formik } from "formik";
import swal from 'sweetalert';

const OnboardPage = () => {

    const [session, loading] = useSession();

    const formik = useFormik({
        initialValues: {
          store: '',
        }
    })

    const handleStore = () => { 
        
            const name = session.user.name
            fetch('/api/createstore', {
                
                method: 'PATCH',
                headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
                body: JSON.stringify({
                    name
                }),
            })
            swal({
                title: "¡Tu tienda fue creada!",
                text: "Ahora todos tus productos van a aparecer acá.",
                icon: "success",
            }).then(() => {router.push('/dashboard')})
       
      }

  return (
    <>
        <Flex justify="center">
          <Text>Crea tu tienda</Text>

        </Flex>
        <Flex justify="center">
        <Formik>
                          <Form className="my-3" id="form-container" onSubmit={handleStore}>
              
                            <div className="my-2 inputs_login d-flex">
                            
                          

                              { !session && (
                                  
                                    <Button
                                      onClick={ () => {
                                        swal({
                                          title: "Parece que todavía no estás registrado.",
                                          text: "Create una cuenta para poder comprar.",
                                          icon: "warning",
                                        })
                                      }
                                      }
                                  
                                    ></Button>
                                  
                                )
                              } 
                              
                              { session && (

                                    <>

                                      

                                           
                                                  <FormControl>
                                                    <FormLabel>Nombre de tu tienda</FormLabel>
                                                    <Input 
                                                     
                                                      placeholder='Nombre de tu tienda...'
                                                      type='text'
                                                      // id='name'
                                                      name='store'
                                                      value={formik.values.store}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      required
                                                    />
                                                  </FormControl>

                                                  {/* <FormControl>
                                                    
                                                    <Input 
                                                      type="hidden"
                                                      // id='name'
                                                      name='title'
                                                      value={formik.values.title}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      required
                                                    />
                                                  </FormControl>

                                                  <FormControl mt={4}>
                                                    <FormLabel>Descripción</FormLabel>
                                                    <Textarea 
                                                      placeholder={product.description} 
                                                      type='text'
                                                      //id='name'
                                                      name='description'
                                                      value={formik.values.description}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      required
                                                      maxLength="2000"
                                                    />
                                                  </FormControl>

                                                  <FormControl mt={4}>
                                                    <FormLabel>Precio</FormLabel>
                                                    <Input 
                                                      placeholder={product.price} 
                                                      type='text'
                                                      id='name'
                                                      name='price'
                                                      value={formik.values.price}
                                                      onChange={formik.handleChange}
                                                      onBlur={formik.handleBlur}
                                                      required
                                                    />
                                                  </FormControl> */}


                                    

                                    </>
                                  )
                                
                                
                              }

                            </div>
                          </Form>
                        </Formik>
        </Flex>
    </>
  )
}

export default OnboardPage