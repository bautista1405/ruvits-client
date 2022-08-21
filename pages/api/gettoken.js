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
        
        const Token = mongoose.model('tokens', 
            {
                name: {
                    type: String,
                },
                email: {
                    type: String,
                },
                mpAccessToken: {
                    type: String,
                },

            }
        );

        const email = session.user.email
        const getToken = await Token.find({email})
        // console.log(getToken)

        res.status(200).json({ getToken })
        return getToken

    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
}