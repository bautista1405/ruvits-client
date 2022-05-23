import React, {useEffect, useState} from 'react'
import axios from 'axios'

const Discover = () => {
    
    const [products, setProducts] = useState([]);

    const url = "http://3.95.83.1:3000/api/products"
    
    useEffect(() => {
        axios.get(url).then((res) => {
            setProducts(res?.data || []);
            console.log(res.data)
        })
    }, [url])

  return (
    <div>
        <ul>
        { 
            products.map( product => {
                return ( 
                    <>
                        <li> {product.title} </li> 
                        <li> {product.description} </li>
                        <li> {product.price} </li>
                    </>
                )
            }) 
        }
        </ul>
    </div>
  )
}

export default Discover