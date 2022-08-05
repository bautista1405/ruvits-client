import mongoose from 'mongoose';

export default async function handler(req, res) {

    try {
      const db = process.env.MONGODB_URI
      
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
          const { id } = body
          await Product.findByIdAndDelete(id)
          res.status(200).json({ message: 'Producto eliminado' })
    } catch (err) {
      console.log(err)
    }

}

export const config = {
  api: {
    bodyParser: true,
  },
};
