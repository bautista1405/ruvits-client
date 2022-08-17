import mongoose from 'mongoose';
// mongoose.set('debug', true);
// import { getSession } from "next-auth/client";


export default async function getProducts(req, res) {

    const db = process.env.NEXT_PUBLIC_MONGODB_URI
    mongoose.connect(db, {  //connect to the db
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const { query } = req
    const { qry, collection } = query
    // const session = await getSession({req})
    
    try {

        mongoose.models = {}
        
        const Product = mongoose.model('products', {
            title: {
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
            content: {
                type: [],
                required: true,
            },
            mpAccessToken: {
                type: String,
                required: true,
            },
            creationDate: {
                type: String,
                required: true,
            }   
        });

        // const email = session.user.email
        const getProducts = await Product.find({ })
        // console.log(getProducts)

        res.status(200).json({ getProducts })
        return getProducts

    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
}