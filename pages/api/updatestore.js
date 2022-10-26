import { getSession } from "next-auth/client";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import dayjs from "dayjs";
// mongoose.set('debug', true);
// const conn = mongoose.connection;

import Multer from "multer";
const path = require('path');
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
import fileMiddleware from "../../middlewares/fileMiddleware";
const { handleStore } = require('../../services/store');

export const config = {
    api: {
      bodyParser: false,
    },
}

export default async function updateStore(req, res) {
    
    const session = await getSession({req})

    aws.config.update({
        secretAccessKey: process.env.S3_SECRET,
        accessKeyId: process.env.S3_ACCESS_KEY,
        region: "us-east-2",
    });
    const s3 = new aws.S3();

    const storage = multerS3({
        acl: "public-read",
        s3,
        bucket: "bitsroad",
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${file.originalname}`);
        }
    });
    
    const upload = Multer({ storage: storage }).any('banner');
  
    console.log(req.file, req.body)
  
    await fileMiddleware(req, res, upload);

    try {

        const db = process.env.NEXT_PUBLIC_MONGODB_URI

        // const conn = mongoose.connection;
      
        mongoose.connect(db, {  //connect to the db
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      
        const StoreSchema = new Schema({
            avatar: {
                type: String,
            },
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
            banner: {
                type: []
            },
        });
        
        mongoose.models = {}
        const Store = mongoose.model('stores', StoreSchema);

        console.log(req.body)
        console.log(req.files)
        const updateUserStore = handleStore(req.body, req.files);
        console.log(updateUserStore);
        const store = new Store(updateUserStore);
        const update = await Store.findByIdAndUpdate(req.body.id, {
            avatar: req.files[1].location,
            storeName: req.body.storeName, 
            email: req.body.email, 
            description: req.body.description, 
            banner: req.files[0].location,
        });
        console.log(update)
        console.log(req.files[0].location)
        
        res.status(201).json({ success: true })
        // return newStore
        
    } 
    
    catch (e) {
        console.log(e)
    }
}