// import nodemailer from "nodemailer"

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
//     pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
//   },
// });

// export const sendMail = async() =>{
//     const info = await transporter.sendMail({
//       from: '"Fred Foo 👻" <foo@example.com>', 
//       to: "bar@example.com, baz@example.com", 
//       subject: "Hello ✔", 
//       text: "Hello world?", 
//     });
  
//     console.log("Message sent: %s", info.messageId);
  
  
//   main().catch(console.error);
// }