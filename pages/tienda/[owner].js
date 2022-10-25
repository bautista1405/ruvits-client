import { useState, useEffect } from 'react'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { Flex, Text, Box, Grid, Icon, GridItem, SimpleGrid, Image,
  Link,
  useColorModeValue, } from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from "next-auth/client";
import mongoose from 'mongoose';

import Banner from "../../components/store/components/Banner";
import General from "../../components/store/components/General";
import Card from "../../components/store/components/card/Card";
import Notifications from "../../components/store/components/Notifications";
import Projects from "../../components/store/components/Projects";

import designer from "../../assets/designer.png";
import { MdEdit } from "react-icons/md";

const StoreOwner = ({ user }) => {

  const [session, loading] = useSession();
  const router = useRouter();
  const getStores = '/api/getstore'
  const getStoreProducts = "/api/getproducts";

  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const brandColor = useColorModeValue("brand.500", "white");
  const bg = useColorModeValue("white", "navy.700");

    useEffect( () => {
        
            axios.get(getStores)
            .then((res) => {
                setStores(res?.data?.getStores || [])
            })
            axios.get(getStoreProducts).then((res) => {
              setProducts(res?.data?.getProducts || []);
              
            })
        
    }, [getStores, getStoreProducts]) 

    const store = stores.filter(store => store.email === user[0].email )
    const storeProducts = products.filter(storeProducts => storeProducts.vendor === user[0].name)

  return (
    <>    
      <Head>
        {user.map((user) => {
          return (

            <title key={user._id} >{user.name} | Ruvits </title>
          )
          
        })}
            <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
      </Head> 
        {user.length > 0 ? user.map((user) => {
          return (
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }} key={user._id}>
          
            {store.length > 0 ? store.map((store) => {
              return (
                <Box key={store._id}>
                  <Grid>
                    
                    <Banner
                      gridArea='1 / 1 / 2 / 2'
                      banner={store.banner[0]}
                      avatar={user.image}
                      name={store.storeName}
                      job='Product Designer'
                      productos='17'
                      ventas='9.7k'
                      rating='274'
                    />

                  </Grid>

                  <GridItem margin='80px'>
                    <Flex justify='center' mb={20}>
                      {store.description}
                    {/* <Image src={designer} height='100px' width='100px' /> */}
                    </Flex>
                    
                    <General />

                  </GridItem>
                  
                  <Flex justify='center'>
                    <Text mb={5} fontSize={22} fontWeight='bold'>Productos</Text>
                  </Flex>
                  <SimpleGrid
                    columns={[1, 2, 2, 3]} 
                    spacing={10} 
                    margin="50px"  
                  >


                    {storeProducts.length > 0 ? storeProducts.map((product) => {
                        return (
                          <Card 
                            bg={bg} 
                            p='14px' 
                            shadow="base"
                            rounded={[null, "md"]}
                            borderRadius="5px"
                            key={product._id}
                          >
                            <Flex align='center' direction={{ base: "column", md: "row" }}>
                              <Image h='80px' w='80px' src={product.content[0]} borderRadius='8px' me='20px' />
                              <Box mt={{ base: "10px", md: "0" }}>
                                <Text
                                  color={textColorPrimary}
                                  fontWeight='500'
                                  fontSize='md'
                                  mb='4px'>
                                  {product.productName}
                                </Text>
                                <Text
                                  fontWeight='500'
                                  color={textColorSecondary}
                                  fontSize='sm'
                                  me='4px'>
                                  
                                  <Link fontWeight='500' color={brandColor} href={`/productos/${product.title}`} fontSize='sm'>
                                    Ver detalles
                                  </Link>
                                </Text>
                              </Box>
                              
                            </Flex>
                          </Card>
                        )
                    }) : (
                      <Flex justify='center'>
                        ¡Upss! Parece que este usuario todavía no tiene productos.
                      </Flex>
                    )
                    }
                    
                  </SimpleGrid>
                  
                  
                    

              </Box>
              )
            }) : (
                  <Flex justify='center'>
                    ¡Oopss! Parece que este usuario aún no configuró su tienda.
                  </Flex>
            ) }
            </Box> 
            )
            }) : (
            <Flex justify='center'>
              ¡Oopss! Parece que el usuario que buscas no existe.
            </Flex>
            )
          }
    </>
  )
}



// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {

    const db = process.env.NEXT_PUBLIC_MONGODB_URI
    mongoose.connect(db, {  //connect to the db
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.models = {}

    const User = mongoose.model('users', {
      name: {
          type: String,
          required: true,
      },
      email: {
          type: String,
          required: true,
      },
      image: {
          type: String,
          required: true,
      },
     
  });

  const users = await User.find()
  
  
  
    // Get the paths we want to pre-render based on users
    const paths = users.map((user) => ({
      params: { owner: user._id.toString() },
      
    }))
    // console.log(paths)
  
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    
    return { paths, fallback: 'blocking' }
}
  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // revalidation is enabled and a new request comes in
export async function getStaticProps({params}) {

    const db = process.env.NEXT_PUBLIC_MONGODB_URI
    mongoose.connect(db, {  //connect to the db
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    mongoose.models = {}

    const User = mongoose.model('users', {
      name: {
          type: String,
          required: true,
      },
      email: {
          type: String,
          required: true,
      },
      image: {
          type: String,
          required: true,
      },
     
  });

  const owner = params.owner
  
  const user = await User.aggregate([
    {
      "$match": {
        "$expr": {
          "$eq": [
            {
              "$toLower": {
                "$replaceAll": {
                  "input": "$name",
                  "find": " ",
                  "replacement": ""
                }
              }
            },
            owner
          ]
        }
      }
    }
  ])
    
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)) 
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
}
  

export default StoreOwner