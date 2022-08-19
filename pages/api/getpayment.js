import mongoose from 'mongoose';
// mongoose.set('debug', true);
import { getSession } from "next-auth/client";


export default async function getPayment(req, res) {

    const db = process.env.NEXT_PUBLIC_MONGODB_URI
    mongoose.connect(db, {  //connect to the db
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const { query } = req
    const { qry, collection } = query
    const session = await getSession({req})
    
    try {

        mongoose.models = {}
        
        const Purchase = mongoose.model('purchases', {
            title: {
                type: String,
                required: true,
            },
            user: {
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

        const email = session.user.email
        const getPayments = await Purchase.find({ email })
        // console.log(getPayments)

        res.status(200).json({ getPayments })
        return getPayments

    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
}