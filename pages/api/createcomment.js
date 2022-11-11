import { getSession } from "next-auth/client";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import dayjs from "dayjs";
// mongoose.set('debug', true);
// const conn = mongoose.connection;

const createStore = async (req, res) => {
    
    const { body } = req;
    // console.log(body)
    const {comment, productOwner, user, productTitle, rating} = body
    // const {product} = body;
    // const parsedProduct = JSON.parse(product)
    // console.log(body);
    // console.log(parsedProduct)
    // const {id, title, description, price, content, vendor} = parsedProduct
    const session = await getSession({req})

    try {

        const db = process.env.NEXT_PUBLIC_MONGODB_URI

        // const conn = mongoose.connection;
      
        mongoose.connect(db, {  //connect to the db
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      
        const CommentSchema = new Schema({
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
            required: true,
           },
           date: {
            type: String,
            required: true,
           }   
        });
        
        mongoose.models = {}
        const Comment = mongoose.model('comments', CommentSchema);

        const newComment = new Comment({
            comment,
            productOwner,
            user,
            productTitle,
            rating,
            date: dayjs().format("DD-MM-YYYY")
        })
        
            
        if (newComment) {

            newComment.save()
        }
        
        res.status(201).json({ success: true })
        return newComment
    } 
    
    catch (e) {
        console.log(e)
        return e
    }
}

export default createStore;