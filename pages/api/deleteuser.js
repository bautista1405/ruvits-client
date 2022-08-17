import mongoose from 'mongoose';
import { getSession } from "next-auth/client";

const deleteUser = async (req, res) => {  

    const db = process.env.NEXT_PUBLIC_MONGODB_URI

    try {

                const session = await getSession({req}) //get info from the session

                mongoose.connect(db, {  //connect to the db
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });

                mongoose.models = {}

                const User = mongoose.model('users',  //here we define the schema
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
                )
               

                const email = session.user.email //define the filter
                const update = await User.findOneAndRemove({ email: email }) //remove the user
                console.log(update)
                res.status(200).json({ message: 'Usuario eliminado' })
                
    } catch (e) {
        console.log(e)
    }
}

export default deleteUser;