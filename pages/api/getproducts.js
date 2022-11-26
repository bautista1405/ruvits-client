import mongoose from 'mongoose';
// mongoose.set('debug', true);
// import { getSession } from "next-auth/client";


export default async function getProducts(request, res) {

    const db = process.env.NEXT_PUBLIC_MONGODB_URI
    mongoose.connect(db, {  //connect to the db
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    // const { qry, collection } = query
    // const session = await getSession({req})
    
    const ITEMS_PER_PAGE = 9;
    const page = request.query.page || 1;

    // Put all your query params in here
    const query = {};
    const { qry } = query
    
    try {

        const skip = (page - 1) * ITEMS_PER_PAGE; // 1 * 20 = 20

        
        
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
        // const getProducts = await Product.find({ })
        // console.log(getProducts)
        
        const countPromise = Product.estimatedDocumentCount(qry);

        const itemsPromise = Product.find(qry).sort({_id:-1}).limit(ITEMS_PER_PAGE).skip(skip);

        const [count, items] = await Promise.all([countPromise, itemsPromise]);

        const pageCount = count / ITEMS_PER_PAGE; // 400 items / 20 = 20

        res.status(200).json({ items, pageCount })
        // return getProducts

        return {
            pagination: {
              count,
              pageCount,
            },
            items,
          };

    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
}