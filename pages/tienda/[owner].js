import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Flex, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from "next-auth/client";
import mongoose from 'mongoose';



const StoreOwner = ({ user }) => {

  // const [session, loading] = useSession();
  // const getUser = '/api/getusers'
  // const [users, setUsers] = useState([]);
  // const router = useRouter();

  // useEffect( () => {
  
  //   const storeOwner = user.filter(user => window.location.href == `/tienda/${user.name}`)
  //   const localOwner = localStorage.setItem('owner', JSON.stringify({storeOwner}))
  //   const owner = localStorage.getItem('owner');
        
  // }, []) 

  // const handleOwner = () => {

  //   if(typeof window !== 'undefined') {
  //     const owner = localStorage.getItem('owner');
  //   }
  // }


  return (
    <>
        <Flex justify="center">
            {user.length > 0 ? user.map((user) => {
                return (
                    <Text key={user._id}>{user.name}</Text>
                )
            }) : (
              <Text>
                ¡Oopss! Parece que el usuario que buscas no existe.
              </Text>
            )
            }
            
        </Flex>
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
  const user = await User.find({name: { $regex: owner, $options: 'i' } })

  console.log(user)
    
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