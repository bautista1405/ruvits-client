import { getSession } from "next-auth/client";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import dayjs from "dayjs";
// mongoose.set('debug', true);
// const conn = mongoose.connection;

export default async function createPayment(req, res) {
    
    const { body } = req;
    const {product} = body;
    const parsedProduct = JSON.parse(product)
    // console.log(body);
    // console.log(parsedProduct)
    const {id, title, description, price, content, vendor} = parsedProduct
    const session = await getSession({req})

    try {

        const db = process.env.NEXT_PUBLIC_MONGODB_URI

        // const conn = mongoose.connection;
      
        mongoose.connect(db, {  //connect to the db
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      
        
        // const Purchase = mongoose.model('purchase', 
        //   {
        //       title: {
            //           type: String,
            //           required: true,
            //         },
            //         user: {
                //             type: String,
                //             required: true,
                //         },
                //         price: {
                    //           type: Number,
                    //           required: true,
                    //         },
                    //         description: {
                        //           type: String,
        //           required: true,
        //         },   
        //   }
        // )

        const PurchaseSchema = new Schema({
            title: {
                type: String,
                required: true,
            },
            user: {
                type: String,
                required: true,
            },
            vendor: {
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
            date: {
                type: String,
                required: true,
            }   
        });
        
        mongoose.models = {}
        const Purchase = mongoose.model('purchases', PurchaseSchema);

        const newPurchase = new Purchase({
            title,
            user: session.user.email,
            vendor,
            price,
            description,
            date: dayjs().format("DD-MM-YYYY")
        })
        
            
        if (newPurchase) {

            newPurchase.save()
        }
        
        res.status(201).json({ success: true })
        return newPurchase
        
    } 
    
    catch (e) {
        console.log(e)
    }
}