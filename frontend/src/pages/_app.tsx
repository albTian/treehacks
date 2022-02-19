import { ChakraProvider } from '@chakra-ui/react'
import { ClerkProvider } from '@clerk/nextjs';


import theme from '../theme'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ClerkProvider>
  )
}

export default MyApp
