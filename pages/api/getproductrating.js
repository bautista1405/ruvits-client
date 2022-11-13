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
        
        const Comment = mongoose.model('comments', {
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

        // const email = session.user.email
        const getComments = await Comment.find({})
        // console.log(getComments)

        const rating = await Comment.aggregate(
            [
              {$group: {_id:"$productTitle", avg_val:{$avg:"$rating"}}}
            ],
            {
              allowDiskUse: true
            }
        );

        res.status(200).json({ rating })
        return rating

    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
}