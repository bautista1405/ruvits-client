import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import styles from './Login.module.css'
import { Grid, GridItem, Button, Text } from '@chakra-ui/react'

import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from "yup";
// import { useSession, signIn } from "next-auth/react"

import loginImage from '../../assets/transaction.png'

const Login = () => {

  // const { data: session } = useSession();
  const [error, setError] = useState(null)

  const router = useRouter()

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
        axios.post(
          'http://3.95.83.1:3000/api/auth/login', 
          {email: values.email, password: values.password}
          ).then(res => {
            if (res.status === 200) {
              router.push('/dashboard')
            }
          }).catch(e => {
              setError('Usuario o contraseña incorrectos') 
            })
          
        } catch(err) {
            
        }    
    },
  });
  
  return (
    <div className={styles.container}>
      <Grid templateColumns='repeat(2, 1fr)' gap={6} className={styles.layout}>
          <GridItem className={styles.grid1}>
            <Image 
              src={loginImage}
              alt="transaction.png" 
              width="600px" 
              height="600px"
              className={styles.image1}
            />
            <Text>¡Crea y vende tu contenido!</Text>
          </GridItem>
          <GridItem className={styles.login}>
            
              <form className={styles.form} onSubmit={formik.handleSubmit}>
                  <h3>Ingresa</h3>

                  <label htmlFor="username" className={styles.label}>Email</label>
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
                  {setError 
                    ? 
                      <div>
                        <p className="error">{error}</p>
                        <style jsx>{`.error{
                            color: red;
                          }`}
                        </style>
                      </div> 
                    : null
                  }
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
                    ¿No tenés una cuenta? {" "}
                    <Link href="/register" >Registrate </Link>
                  </p>

                  <Button className={styles.button}  type='submit'>Ingresar</Button>
                  {/* <p> o </p>
                  <button onClick={() => signIn()}>Sign in</button> */}
              
                  
              </form>
          </GridItem>
      </Grid>
    </div>
  )
}

export default Login