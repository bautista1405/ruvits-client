import React from 'react'
import styles from './Home.module.css'

import { Grid, GridItem, Button, Text } from '@chakra-ui/react'

import Hero from './Hero'
import CTA from './Cta'
import Fgl from './Features'

const Home = () => {
  return (
    <div>
      
      <Hero />
      <CTA />
      <Fgl />
      
    </div>
  )
}

export default Home