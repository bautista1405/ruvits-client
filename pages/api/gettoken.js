import mongoose from 'mongoose';
// mongoose.set('debug', true);
import { getSession } from "next-auth/client";


export default async function getToken(req, res) {

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
        
        const User = mongoose.model('users', 
            {
                name: {
                    type: String,
                },
                email: {
                    type: String,
                },
                image: {
                    type: String,
                },
                emailVerified: {
                    type: Date,
                },
                mpAccessToken: {
                    type: String,
                },

            }
        );

        const email = session.user.email
        const getToken = await User.find({})
        // console.log(getToken)

        res.status(200).json({ getToken })
        return getToken

    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
}