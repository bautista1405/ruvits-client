import mongoose from 'mongoose';
// mongoose.set('debug', true);
import { getSession } from "next-auth/client";


export default async function getStore(req, res) {

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
        
        const Store = mongoose.model('stores', {
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
            products: []
        });

        
        const getStores = await Store.find({  })
        // console.log(getStores)

        res.status(200).json({ getStores })
        return getStores

    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
}