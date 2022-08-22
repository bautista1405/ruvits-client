import mongoose from 'mongoose';
import { getSession } from "next-auth/client";

const deleteToken = async (req, res) => {  

    const db = process.env.NEXT_PUBLIC_MONGODB_URI

    try {

                const session = await getSession({req}) //get info from the session

                mongoose.connect(db, {  //connect to the db
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });

                mongoose.models = {}

                const Token = mongoose.model('tokens',  //here we define the schema
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
                )
               

                const email = session.user.email //define the filter
                const update = await Token.findOneAndRemove({ email: email }) //remove the field
                console.log(update)
                res.status(200).json({ message: 'Token eliminado' })
                
    } catch (e) {
        console.log(e)
    }
}

export default deleteToken;