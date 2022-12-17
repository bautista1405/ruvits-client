
import Multer from "multer";
import { getSession } from "next-auth/client";
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import dayjs from "dayjs";
// mongoose.set('debug', true);
// const conn = mongoose.connection;
const path = require('path');

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const { createProduct } = require('../../services/product');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


import fileMiddleware from "../../middlewares/fileMiddleware";

app.post('/api/createproduct', bodyParser.json({ limit: '50mb' }), filesUpload);

const filesUpload = async (req, res) => {

    aws.config.update({
        secretAccessKey: process.env.S3_SECRET,
        accessKeyId: process.env.S3_ACCESS_KEY,
        region: "us-east-2",
    });
    const s3 = new aws.S3();

    try {

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
        
        const upload = Multer({ storage: storage }).any('content');
        
        console.log(req.file, req.body)
        
        await fileMiddleware(req, res, upload);
        
        const db = process.env.NEXT_PUBLIC_MONGODB_URI
        
            // const conn = mongoose.connection;
            
            mongoose.connect(db, {  //connect to the db
                useNewUrlParser: true,
              useUnifiedTopology: true,
            });
            
            
            const ProductSchema = new Schema({
                title: {
                    type: String,
                    required: true,
                },
                productName: {
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
                category: {
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
            
            mongoose.models = {}
            const Product = mongoose.model('products', ProductSchema);
            
            // console.log(req.body)
            // console.log(req.files)
            const newProduct = createProduct(req.body, req.files);
            // console.log(newProduct);
            const product = new Product(newProduct);
            await product.save();
            // console.log(product)
            res.status(201).json({message: 'Producto dado de alta'})
    } catch(error) {
        console.log(error)
    }

        
};


export default filesUpload;
