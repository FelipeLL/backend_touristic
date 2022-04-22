import nodemailer from "nodemailer"
//email remitente
const mail = {

    user: "robert.runolfsdottir3@ethereal.email",
    pass: "mBfUdSMCdDyUsRR2hf"

}


let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: mail.user, // generated ethereal user
        pass: mail.pass, // generated ethereal password
    },
});

export const sendEmail = async (email, subject, html) => {
    try {
        await transporter.sendMail({
            from: `FelipeLL <${mail.user}>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hola mundo", // plain text body
            html, // html body
        });
    } catch (error) {
        console.log(error);
    }
}


export const getTemplate = (name, token) => {
    return `
    <h2>${name}</h2>
    <p>Confirma tu cuenta ingresando en el siguiente enlace</p>
    <a href="http://localhost:5000/users/confirm/${token}">Confirmar cuenta</a>
    `
}

