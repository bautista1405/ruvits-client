import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'
import styles from './Register.module.css'
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

const Register = () => {

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
    onSubmit: (values = {email, password, name, lastname}) => {
      try {
        axios.post(
          'http://3.95.83.1:3000/api/auth/', 
          {email: values.email, password: values.password, name: values.name, lastname: values.lastname}
          ).then(res => {
            if (res.status === 201) {
              router.push('/successful')
            }
          }).catch(e => {
              setError('El email ya está en uso') 
            })
          
        } catch(err) {
            
        }    
    },
  });

  
  
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
                  <h3>Registrate</h3>

                  <label htmlFor="name" className={styles.label}>Nombre</label>
                  <input 
                    placeholder="Tu nombre..."  
                    className={styles.input} 
                    type='text'
                    id='name'
                    name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />

                  <label htmlFor="lastname" className={styles.label}>Apellido</label>
                  <input 
                    placeholder="Tu apellido..."  
                    className={styles.input} 
                    type='text'
                    id='lastname'
                    name='lastname'
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />

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
                    ¿Ya tenés una cuenta? {" "}
                    <Link href="/login" >Ingresa</Link>
                  </p>

                  <Button className={styles.button}  type='submit'>Crear cuenta</Button>
                  
              </form>
          </Grid>
      </Grid.Container>
    </div>
  )
}

export default Register