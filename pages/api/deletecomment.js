import mongoose from 'mongoose';

export default async function handler(req, res) {

    try {
      const db = process.env.NEXT_PUBLIC_MONGODB_URI
      
        mongoose.connect(db, {  //connect to the db
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      
      mongoose.models = {}
      
          const Comment = mongoose.model('comments', 
          {
            comment: {
                type: String,
                required: true,
               },
               user: {
                type: String,
                required: true,
               },
               productOwner: {
                type: String,
                required: true
               },
               productTitle: {
                type: String,
                required: true,
               },
               rating: {
                type: Number,
                
               },
               date: {
                type: String,
                required: true,
               },
               category: {
                type: String,
                required: true,
               },
               content: {
                type: String,
                required: true
               },
               price: {
                type: Number,
                required: true,
               },
               productName: {
                type: String,
                required: true
               },
               productDate: {
                type: String,
                required: true,
               }
          })
          
          const { body } = req
          const { id } = body
          await Comment.findByIdAndDelete(id)
          res.status(200).json({ message: 'Comentario eliminado' })
    } catch (err) {
      console.log(err)
    }

}

export const config = {
  api: {
    bodyParser: true,
  },
};
