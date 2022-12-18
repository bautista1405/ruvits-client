
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
import fileMiddleware from "../../middlewares/fileMiddleware";


import { S3Client } from "@aws-sdk/client-s3";
import {
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  DeleteBucketCommand
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fetch from "node-fetch";

// Set the AWS Region
const REGION = "us-east-2";
// Create an Amazon S3 service client object
const s3Client = new S3Client({ region: REGION });

// Set parameters
// Create a random name for the Amazon Simple Storage Service (Amazon S3) bucket and key
const bucketParams = {
  Bucket: "bitsroad",
  Key: process.env.S3_ACCESS_KEY,
  Body: "BODY"
};


const filesUpload = async (req, res) => {

    // aws.config.update({
    //     secretAccessKey: process.env.S3_SECRET,
    //     accessKeyId: process.env.S3_ACCESS_KEY,
    //     region: "us-east-2",
    // });
    // const s3 = new aws.S3();

    // try {

        // const storage = multerS3({
        //     acl: "public-read",
        //     s3,
        //     bucket: "bitsroad",
        //     metadata: (req, file, cb) => {
        //         cb(null, { fieldName: file.fieldname });
        //     },
        //     key: (req, file, cb) => {
        //         const ext = path.extname(file.originalname);
        //         cb(null, `${file.originalname}`);
        //     }
        // });
        
        // const upload = Multer({ storage: storage }).any('content');
        
        // console.log(req.file, req.body)
        
        // await fileMiddleware(req, res, upload);

        try {
            // Create a command to put the object in the S3 bucket
            const command = new PutObjectCommand(bucketParams);
            // Create the presigned URL
            const signedUrl = await getSignedUrl(s3Client, command, {
              expiresIn: 3600,
            });
            console.log(
              `\nPutting "${bucketParams.Key}" using signedUrl with body "${bucketParams.Body}" in v3`
            );
            console.log(signedUrl);
            const response = await fetch(signedUrl, {method: 'PUT', body: bucketParams.Body});
            console.log(
              `\nResponse returned by signed URL: ${await response.text()}\n`
            );
          } catch (err) {
            console.log("Error creating presigned URL", err);
          }
        
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
    // } catch(error) {
    //     console.log(error)
    // }

        
};


export default filesUpload;
