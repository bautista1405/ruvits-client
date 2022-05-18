import React from 'react'
import styles from './Home.module.css'

import { Grid, GridItem, Button, Text } from '@chakra-ui/react'

import Header from '../Navbar/Header'
import Hero from './Hero'
import CTA from './Cta'
import Fgl from './Features'
import Footer from '../Footer'

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <CTA />
      <Fgl />
      <Footer /> 
    </div>
  )
}

export default Home