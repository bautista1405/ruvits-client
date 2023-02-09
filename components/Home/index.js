import React from 'react'
import styles from './Home.module.css'

import { Box, Grid, GridItem, Button, Text, Flex } from '@chakra-ui/react'

import Hero from './Hero'
import CTA from './Cta'
import Fgl from './Features'
import Header from './Header'
import TopRatedProducts from './TopRatedProducts'
import MostRecentProducts from './MostRecentProducts'

const Home = () => {
  return (
    <>
      <Box margin="auto">
        
        <Header />
        <TopRatedProducts />
        <Hero />
        <MostRecentProducts />
        <CTA />
        
      </Box>
      
    </>
  )
}

export default Home