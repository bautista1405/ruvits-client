import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './Login.module.css'
import {
  Container,
  Button,
  Input,
  Spacer,
  Text,
  Card,
  Grid
} from '@nextui-org/react';

import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from "yup";

import loginImage from '../../assets/transaction.png'

const Login = () => {

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email requerido"),
      password: Yup.string()
        .required("Contraseña requerida")
    }),
    onSubmit: (values = {email, password}) => {
      try {
        axios.post('http://3.95.83.1:3000/api/auth/login', {email: values.email, password: values.password})
        console.log(values);
        
      } catch (e) {
        console.error(e)
      }
    },
  });
  
  // const handleLogin = (e, email, password) => {
  //   try {
  //     axios.post('http://3.95.83.1:3000/api/auth/login', {email, password})
  //     console.log(email, password)
      
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

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
            
              <form className={styles.form} onSubmit={formik.handleSubmit}>
                  <h3>Ingresa</h3>

                  <label htmlFor="username" className={styles.label}>Usuario</label>
                  <input 
                    placeholder="Tu email..."  
                    className={styles.input} 
                    type='email'
                    id='email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />

                  <label htmlFor="password" className={styles.label}>Contraseña</label>
                  <input 
                    type="password" 
                    placeholder="Tu contraseña..." 
                    id="password" 
                    className={styles.input} 
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />

                  <p className={styles.register}>
                    ¿No estás registrado? {" "}
                    <Link href="/register" >Registrate acá</Link>
                  </p>

                  <Button className={styles.button}  type='submit'>Ingresar</Button>
                  
              </form>
          </Grid>
      </Grid.Container>
    </div>
  )
}

export default Login