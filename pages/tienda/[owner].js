import { Flex, Text } from '@chakra-ui/react'
import { getSession } from "next-auth/client";


const StoreOwner = ({ user, req }) => {

    const getUser = '/api/getusers'

  return (
    <>
        <Flex justify="center">
            {user.length > 0 && user.map((user) => {
                return (
                    <Text key={user._id} >{user.name}</Text>
                )
            }) }
        </Flex>
    </>
  )
}



// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths(req) {
    const session = await getSession({req})
    const res = await fetch('https://ruvits.com/api/getusers')
    const user = session.user.name

    // const users = await fetch('https://ruvits.com/api/getusers')
    //     .then((res) => {
    //        return res?.data?.getUsers || []
    //     })
    console.log(user)
  
    // Get the paths we want to pre-render based on users
    const paths = {params: { userId: user.toString() }}
      
    
  
    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    
    return { paths, fallback: 'blocking' }
}
  // This function gets called at build time on server-side.
  // It may be called again, on a serverless function, if
  // revalidation is enabled and a new request comes in
export async function getStaticProps({params}) {
    const res = await fetch('https://ruvits.com/api/getusers')
    const users = await res.json() 
    const user = users.filter(user => user.name === params.userId)
    
    return {
      props: {
        user
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every 10 seconds
      revalidate: 10, // In seconds
    }
}
  

export default StoreOwner