import mongoose, { Model, Mongoose } from 'mongoose';

const updateProduct = async (req, res) => {  //in this route we listen to the update product url to update the product

    try {

        const db = process.env.NEXT_PUBLIC_MONGODB_URI
      
        mongoose.connect(db, {  //connect to the db
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      
      mongoose.models = {}
      
          const Product = mongoose.model('products', 
          {
              title: {
                  type: String,
                  required: true,
                },
                price: {
                  type: Number,
                  required: true,
                },
                productName: {
                  type: String,
                  required: true,
                },
                description: {
                  type: String,
                  required: true,
                },
                photos: {
                  type: Array,
                  default: [],
                },
                enable: {
                  type: Boolean,
                  default: true,
                },
                stock: {
                  type: Number,
                  required: true,
                }
          })
          
          const { body } = req
          const { id, title, description, price} = body
          //console.log(req)
          await Product.findByIdAndUpdate(id, { title, productName, description, price }) 
          res.status(200).json({ message: 'Producto actualizado' })

    } catch (e) {
        console.log(e)
    }
}

export default updateProduct;
