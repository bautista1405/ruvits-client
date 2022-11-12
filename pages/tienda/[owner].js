import { useState, useEffect } from 'react'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { Flex, Text, Box, Grid, Icon, GridItem, SimpleGrid, Image, Divider,
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
import StoreDescription from '../../components/store/Description';

import designer from "../../assets/designer.png";
import { MdEdit } from "react-icons/md";

const StoreOwner = ({ user, rating }) => {

  const [session, loading] = useSession();
  const router = useRouter();
  const getStores = '/api/getstore'
  const getStoreProducts = "/api/getproducts";
  const getSales = '/api/getpayment'
  const getRating = '/api/getcomments'

  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);

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
            axios.get(getSales)
            .then((res) => {
                setSales(res?.data?.getSales || [])
            })
        
    }, [getStores, getStoreProducts, getSales, getRating]) 

    const store = stores.filter(store => store.email === user[0].email )
    const storeProducts = products.filter(storeProducts => storeProducts.vendor === user[0].name)
    const storeSales = sales.filter(sale => sale.vendor === user[0].name)

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
            <Box key={user._id}>
          
            {store.length > 0 ? store.map((store) => {
              return (
                <Box key={store._id} >
                  
                  
                      <Grid>
                        
                        {rating.length > 0 && rating.map((rating) => {
                          return (

                            <Banner
                              key={rating}
                              gridArea='1 / 1 / 2 / 2'
                              banner={store.banner[0]}
                              avatar={store.banner[1] || store.avatar}
                              name={store.storeName}
                              job={store.category}
                              productos={storeProducts.length}
                              ventas={storeSales.length}
                              rating={rating.avg_val}
                            />
                            )
                          })}

                      </Grid>
                  
                  <GridItem mt={60}>
                    {/* <Flex 
                      justify='center' 
                      mb={20} 
                      margin='150px' 
                      shadow="base"
                      rounded={[null, "md"]}
                      borderRadius="5px"
                      boxShadow='md' 
                      p='6'
                    >
                      {store.description}
                    </Flex> */}
                    
                    {/* <General /> */}

                    <StoreDescription 
                      description={store.description}
                      storeOwner={store.storeName}
                      avatar={store.banner[1] || store.avatar}
                      personalPage={store.personalPage}
                      // email={`mailto@${store.email}`}
                    />

                  </GridItem>

                  {/* <Flex justify='center' color='black'>
                    <Divider orientation='horizontal' w='80%' borderColor='black' />
                  </Flex> */}
                  
                  <Box margin="150px">
                  <Flex justify='center'>
                    <Text mb={10} fontSize={22} fontWeight='bold'>Productos</Text>
                  </Flex>
                  <SimpleGrid
                    columns={[1, 2, 2, 3]} 
                    spacing={10} 
                      
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

  const Comment = mongoose.model('comments', {
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    productOwner: {
      type: String,
      required: true
    },
    productTitle: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    }   
  });

  const username = user.name
  const comment = await Comment.find({productOwner: username})

  const rating = await Comment.aggregate(
    [
      {$group: {_id:null, avg_val:{$avg:"$rating"}}}
    ],
    {
      allowDiskUse: true
    }
  );

  console.log(rating)
  console.log(comment)
    
    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        rating: JSON.parse(JSON.stringify(rating))
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
}


export default StoreOwner