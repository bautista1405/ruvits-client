import React from 'react'

const ProductDetails = ({ products }) => {
    console.log(products)
  return (
    <>
      <div>
        <ul>
            {products.map(product => {
                return (
                    <div>
                    <li key={product.title}>{ product.title }</li>
                    {/* <img src={product.content[0]} /> */}
                    </div>
                )
            })}
        </ul>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const products = await fetch('http://3.95.83.1:3000/api/products').then(res => res.json());
  return {
    props: {
      products
    }
  }
}

export default ProductDetails