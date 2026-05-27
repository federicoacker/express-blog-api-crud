import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

async function sendMail({to, subject, message}){
    const messageToSend = await message;
    const id = transporter.sendMail({
        from:'"Claudio, il tuo assistente personale" <acker.federico@gmail.com>',
        to,
        subject,
        html:message  
    }).then(responseFromGoogle => {
        return true;
    })
}

export default sendMail;