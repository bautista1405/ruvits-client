

const StoreOwner = () => {
  return (
    <>
        StoreOwner
    </>
  )
}



// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
    const res = await fetch(process.env.GET_ALL_PRODUCTS)
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
    const res = await fetch(process.env.GET_ALL_PRODUCTS)
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
  

export default StoreOwner