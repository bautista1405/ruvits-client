import React from 'react'
import styles from './Home.module.css'

import { Grid, GridItem, Button, Text, Flex } from '@chakra-ui/react'

import Hero from './Hero'
import CTA from './Cta'
import Fgl from './Features'

const Home = () => {
  return (
    <>
      
      <Hero />
      <CTA />
      {/* <Fgl /> */}
      
    </>
  )
}

export default Home