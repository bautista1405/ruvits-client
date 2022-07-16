import {useEffect} from 'react'
import { Button } from '@chakra-ui/react';
import { Link } from '@nextui-org/react';
import { useRouter } from 'next/router'
import axios from 'axios';

const Payments = () => {

  const router = useRouter();
  
  const getCode = () => {
     try {
      axios.post(process.env.NEXT_PUBLIC_MP_AUTH0_TOKEN, 
        {
            client_id: process.env.NEXT_PUBLIC_MP_API_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_MP_API_CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: query.code,
            redirect_uri: 'http://localhost:3000/api/mp'
        }
        ).then(res => {
          console.log(res)
        })
     } catch (e) {
        console.error(e);
     }
  } 
  
  
  return (
    <div>
        <Link href={process.env.NEXT_PUBLIC_MP_API_AUTH} >
            <Button>
                Conectar mi cuenta de Mercado Pago    
            </Button> 
        </Link>
    </div>
  )
}

export default Payments;