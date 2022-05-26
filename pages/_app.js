import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from "next-auth/client";
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <Provider session={session} refetchOnWindowFocus={false}>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
