import mongoose from 'mongoose';
// mongoose.set('debug', true);
import { getSession } from "next-auth/client";


export default async function getUser(req, res) {

    const db = process.env.NEXT_PUBLIC_MONGODB_URI
    mongoose.connect(db, {  //connect to the db
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    const { query } = req
    const { qry, collection } = query
    const session = await getSession({req})
    
    try {

        mongoose.models = []
        
        const User = mongoose.model('users', {
            name: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
           
        });

        const email = session.user.email
        const getUsers = await User.find()
        res.json(getUsers)
        console.log(getUsers)

        

    } catch (e) {
        console.error(e)
        res.status(500).send(e)
    }
}