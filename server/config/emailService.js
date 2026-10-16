import http from 'http';
import nodemailer from 'nodemailer';

//Configure the SMTP transporter

const transpoter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // eg "smtp.gmail.com" for Gmail
    port: 465, // or 465 for secure
    secure: true, // true for port 465, false for other ports
    auth:{
        user: process.env.EMAIL, // your smtp username
        pass: process.env.EMAIL_PASS,  // your smtp password
    },
    tls: {
        rejectUnauthorized: false // only for development
    }
});

// Function to the email 
async function sendEmail(to, subject, text, html){
    try{
        const info = await transpoter.sendMail({
            from: process.env.EMAIL, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body 
            html, // html body
            

        });
        return {success: true, messageId: info.messageId}
    } catch(error){
        console.error('Error sending email:', error)
        return {success : false, error:error.message}
    }
}

export  {sendEmail};