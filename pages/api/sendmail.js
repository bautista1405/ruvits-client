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
  const {id, title, description, price, content} = parsedProduct
  const session = await getSession({req})
  
  
  try {
    
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();
    
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Ruvits 👻" <ruvitsarg@gmail.com>', // sender address
        to: `${session.user.email}`, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `
          Hola, acá te dejamos el producto que compraste: ${title}
          Descripción: ${description}
          Precio:  $${price}
        `, // plain text body
        html: `
          Hola, acá te dejamos el producto que compraste: ${title}
          Descripción: ${description}
          Precio:  $${price}
          <a href=${content[1]} download> Descargar producto </a>
        `, // html body
      });
    
      // console.log("Message sent: %s", info.messageId);
      // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.status(200).json({ message: "Email sent" });
    
  } catch (e) {
    console.log(e);
  }

}