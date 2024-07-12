import nodemailer from 'nodemailer';

export const sendEmail = async (to, from, name) => {
    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: `"Pet Adoption Service" <${from}>`, // sender address
        to: email, // list of receivers
        subject: "Contact Request", // Subject line
        text: `You have a new contact request from ${name}.`, // plain text body
        html: `<b>You have a new contact request from ${name}.</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
};


export default sendEmail;