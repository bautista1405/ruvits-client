import { getSession } from "next-auth/client";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import dayjs from "dayjs";
// mongoose.set('debug', true);
// const conn = mongoose.connection;

export default async function updateStore(req, res) {
    
    const { body } = req;
    console.log(body)
    const {storeName, description, email, id} = body
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
      
        const StoreSchema = new Schema({
            storeName: {
                type: String,
                
            },
            email: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            banner: {
                type: String
            },
            products: []
        });
        
        mongoose.models = {}
        const Store = mongoose.model('stores', StoreSchema);

        // const newStore = new Store({
        //     storeName,
        //     email: session.user.email,
        //     description,
        // })

        

        await Store.findByIdAndUpdate(id, {storeName, email, description})
        
        
        res.status(201).json({ success: true })
        // return newStore
        
    } 
    
    catch (e) {
        console.log(e)
    }
}