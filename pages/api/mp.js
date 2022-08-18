import axios from 'axios'
import mongoose, { Model, Mongoose } from 'mongoose';
import { getSession } from "next-auth/client";

const getCode = (req, res) => {  //in this route we listen to the redirect authorization url to get the authorization code

    const db = process.env.NEXT_PUBLIC_MONGODB_URI

    try {

        // const { data } = await axios.get(process.env.NEXT_PUBLIC_MP_API_AUTH, code)
        res.redirect('https://ruvits.com/vinculacionexitosa');
        const { query } = req

        const headers = {
            "Authorization": process.env.NEXT_PUBLIC_MERCADO_PAGO_ACCESS_TOKEN,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        };

        const { code } = query
        console.log(code)

        const data = {
            client_id: process.env.APP_ID,
            client_secret: process.env.APP_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: 'https://ruvits.com/api/mp',
            //test_token: true
        }

        console.log(query)

        axios.post(process.env.NEXT_PUBLIC_MP_AUTH0_TOKEN, data, { headers }) //POST request to obtain access token
            .then(async res => {
                console.log(res)
                const session = await getSession({req}) //get info from the session
                const accessToken = res.data.access_token
                console.log(accessToken)
                console.log(session.user.email)

                mongoose.connect(db, {  //connect to the db
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                });

                mongoose.models = {}
                // const User = mongoose.model('users', {
                //     mpAccessToken: {
                //         type: String,
                //     }
                // })

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
                            required: true,
                       },

                    }
                )
               

                const email = session.user.email //define the filter
                const update = await User.findOneAndUpdate({ email: email },  {$set: {mpAccessToken: accessToken }} ) //populate the field
                console.log(update)
            })

        //console.log(res.data.access_token)
    } catch (e) {
        console.log(e)
    }
}

export default getCode;

