"use strict";
const nodemailer = require("nodemailer");
import { getSession } from "next-auth/client";

// async..await is not allowed in global scope, must use a wrapper
export default async function sendEmail(req, res) {

  
  const { body } = req;
  const {product} = body;
  const parsedProduct = JSON.parse(product)
  // console.log(body);
  // console.log(parsedProduct)
  const {id, title, productName, description, price, content} = parsedProduct
  const session = await getSession({req})
  
  const user = process.env.NEXT_PUBLIC_USER
  const pass = process.env.NEXT_PUBLIC_PASS
  
  try {
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false, // true for 465, false for other ports
        auth: {
          user: user, 
          pass: pass, 
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Ruvits 👻" <ruvitsarg@gmail.com>', // sender address
        to: `${session.user.email}`, // list of receivers
        subject: "¡Acá te dejamos tu producto! ✔", // Subject line
        text: `
          Hola, acá te dejamos el producto que compraste: ${title}
          Descripción: ${description}
          Precio:  $${price}
        `, // plain text body
        html: `
          Hola, acá te dejamos el producto que compraste: ${productName} <br></br>
          Descripción: ${description} <br></br>
          Precio:  $${price} <br></br>
          <a href=${content[1]} download> Descargar producto </a>
        `, // html body
      });

      res.status(200).json({ message: "Email sent" });
    
  } catch (e) {
    console.log(e);
  }

}