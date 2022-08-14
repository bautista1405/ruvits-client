import React from 'react'
import styles from './Home.module.css'

import { Box, Grid, GridItem, Button, Text, Flex } from '@chakra-ui/react'

import Hero from './Hero'
import CTA from './Cta'
import Fgl from './Features'

const Home = () => {
  return (
    <>
      <Box margin="auto">
        <Hero />
        <CTA />
        
      </Box>
      
    </>
  )
}

export default Home