import React from 'react'
import Image from 'next/image';
import styles from './Login.module.css'

import loginImage from '../../assets/transaction.png'

import {
  Container,
  Button,
  Input,
  Spacer,
  Text,
  Link,
  Card,
  Grid
} from '@nextui-org/react';

const Login = () => {
  return (
    <div className={styles.container}>
      <Grid.Container gap={2} justify="center" className={styles.layout}>
          <Grid className={styles.grid1}>
            <Image 
              src={loginImage}
              alt="transaction.png" 
              width="600px" 
              height="600px"
              className={styles.image1}
            />
            <Text>¡Crea y vende tu contenido!</Text>
          </Grid>
          <Grid className={styles.login}>
            
              <form className={styles.form}>
                  <h3>Ingresa</h3>

                  <label for="username" className={styles.label}>Usuario</label>
                  <input type="text" placeholder="Tu email..." id="username" className={styles.input}/>

                  <label for="password" className={styles.label}>Contraseña</label>
                  <input type="password" placeholder="Tu contraseña..." id="password" className={styles.input}/>

                  <Button className={styles.button} >Ingresar</Button>
                  
              </form>
          </Grid>
      </Grid.Container>
    </div>
  )
}

export default Login