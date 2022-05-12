import { NextUIProvider } from '@nextui-org/react';
// import { SessionProvider } from "next-auth/react";
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    // <SessionProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider> 
    // </SessionProvider> 
  )
}

export default MyApp
