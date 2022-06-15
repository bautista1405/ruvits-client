import React from 'react'

const ProductDetails = ({ product }) => {
  console.log(product)
  return (
    <>
      <div>
        
        <ul>
          
              {product.length > 0 ?
                product.map(product => {
                
                  return (
                    <li key={product._id}>
                      <p>{ product.title }</p>
                      <p>{ product.description }</p>
                      <img src={product.content[0]} width="100%" alt="Portada del producto" />
                    </li>
                  )
                }) : <p>¡Oopsss! Este producto no existe.</p> 
              }
           
        </ul>
      </div>
    </>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const res = await fetch('http://3.95.83.1:3000/api/products')
  const products = await res.json()

  // Get the paths we want to pre-render based on products
  const paths = products.map((product) => ({
    params: { productId: product._id.toString() },
    
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  
  return { paths, fallback: 'blocking' }
}
// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({params}) {
  const res = await fetch('http://3.95.83.1:3000/api/products')
  const products = await res.json();
  const product = products.filter(product => product.title === params.productId)
  
  return {
    props: {
      product
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  }
}


// export async function getStaticProps({ params }) {
//   const productId = params.productId.replace(/\-/g, '+')
//   const results = await fetch(`http://3.95.83.1:3000/api/products?title=${productId}`).then(res => res.json());
//   return {
//     props: {
//       product: results[0]
//     }
//   }
// }

// export async function getStaticPaths() {
//   const products = await fetch('http://3.95.83.1:3000/api/products').then(res => res.json());
//   const paths = products.map(product => {
//     const productId = product.title.toLowerCase().replace(/ /g, '-');
//     return {
//       params: {
//         productId
//       }
//     }
//   });
//   console.log(paths)
//   return {
//     paths,
//     fallback: false
//   }
// }

// export async function getServerSideProps(context) {
//   const productId = context.params.productId.replace(/\-/g, '+')
//   const res = await fetch(`http://3.95.83.1:3000/api/products?product=${productId}`);
//   const productsList = await res.json();
//   const [product] = productsList; // Get first item in array returned from API
//   return {
//     props: {
//       productId,
//       product
//     }
//   }
// }

// export async function getStaticPaths(){
//   const request  = await fetch('http://3.95.83.1:3000/api/products')
//   const products = await request.json()

//   const paths = products.map(product =>`/productos/${product.title}`)
//   // const paths = products.map(product =>({
//   //     params: {productId: product._id.toString()},
//   // }))

//   return {
//       paths,
//       fallback: false,
//   }
// }

// export async function getStaticProps(){
//   const request = await fetch('http://3.95.83.1:3000/api/products')
//   const product = await request.json()

//   return{
//       props:{
//           product
//       }
//   }
// }


export default ProductDetails