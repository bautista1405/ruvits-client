import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from "next-auth/client";
import {getSession} from "next-auth/client"
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session} refetchInterval={0}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  )
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      session: await getSession(ctx)
    }
  }
}

export default MyApp
