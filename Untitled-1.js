
product.map(product => {

    if(typeof window !== 'undefined') {
      const data = {
        "items": [
          {
            "title": product.title,
            "quantity": 1,
            "unit_price": product.price,
            "picture_url": product.content[0]
          }
        ],
        "marketplace": appID,
        "marketplace_fee": 1,
        "auto_return": "approved",
        "back_urls": {
          "success": "/successful",
        },
        "payment_methods": {
          "excluded_payment_methods": [
            {
              "id": "atm"
            }
          ],
          "excluded_payment_types": [
            {
              "id": "ticket"
            }
          ],
        },
      };
    
      const productData = localStorage.setItem('data', data);
    }
 })

 const data = localStorage.getItem('data');

 const headers = { 
    "Authorization": process.env.PROD_TOKEN,
    "Content-Type": "application/json",
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
  };


const formik =  useFormik({
     
      onSubmit: () => {
        try {
                axios.post(URL, data, {headers} )
                .then(response => {
                
                if(typeof window !== 'undefined') {
                
                    const testProduct = localStorage.setItem('product', JSON.stringify({
                    id: product._id,
                    title: product.title,
                    vendor: product.vendor,
                    description: product.description,
                    price: product.price,
                    content: product.content,
                    }))
                    
                }
                window.location.href = response.data.init_point
                
                
                })
            
            } catch(res) {
                if(res.status === 500) {
              
              swal({
                title: "Oopss. Parece que hubo un error.",
                text: "Intenta de nuevo.",
                icon: "error",
              }).then(() => {router.push('/dashboard')})
            }
          }    
      },
    });
