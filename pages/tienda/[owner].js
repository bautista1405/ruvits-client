import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head';
import { Flex, Text, Box, Grid } from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from "next-auth/client";
import mongoose from 'mongoose';

import Banner from "../../components/store/components/Banner";
import General from "../../components/store/components/General";
import Notifications from "../../components/store/components/Notifications";
import Projects from "../../components/store/components/Projects";

import banner from "../../assets/transaction.png";


const StoreOwner = ({ user }) => {

  const [session, loading] = useSession();
  const router = useRouter();
  const getStores = '/api/getstore'

  const [stores, setStores] = useState([]);

    useEffect( () => {
        
            axios.get(getStores)
            .then((res) => {
                setStores(res?.data?.getStores || [])
            })
        
    }, [getStores]) 

    const store = stores.filter(store => store.email === user.email )
    // console.log(stores)
    // console.log(user.email)
    // console.log(store.email)

  return (
    <>    
      <Head>
        {user.length > 0  && user.map((user) => {
          return (

            <title key={user._id} >{user.name} | Ruvits </title>
          )
          
        })}
            <link rel="icon" href="/favicon-32x32.png" sizes="16x16 32x32" type="image/png"/>
      </Head> 
        {user.length > 0 ? user.map((user) => {
          return (
            <Box pt={{ base: "130px", md: "80px", xl: "80px" }} key={user._id}>
          
              <Grid>
                
                <Banner
                  gridArea='1 / 1 / 2 / 2'
                  banner={banner}
                  // avatar={avatar}
                  name={user.name}
                  job='Product Designer'
                  posts='17'
                  followers='9.7k'
                  following='274'
                />
                
              </Grid>
              <Grid
                mb='20px'
                margin={20}
                gap={{ base: "20px", xl: "20px" }}>
                <Projects
                  gridArea='1 / 2 / 2 / 2'
                  // banner={banner}
                  // avatar={avatar}
                  name='Adela Parkson'
                  job='Product Designer'
                  posts='17'
                  followers='9.7k'
                  following='274'
                />
                <General
                  gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
                  minH='365px'
                  pe='20px'
                >
                  <Text> {store.description} </Text>
                </General>
              
              </Grid>
            </Box> 
            )
            }) : (
            <Text>
              ¡Oopss! Parece que el usuario que buscas no existe.
            </Text>
            )
          }
{/* 
          {store.map((store) => {
            return (
              <Text> {store.storeName} </Text>
            )
          } )} */}
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