import nodemailer from 'nodemailer';

const sendEmail = async (opetions) => {
  // 1) create a transporter
  // transporter ناقل
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_POSRT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  // 2) Define the email option

  const mailOptions = {
    from: "Khalid Alhadi <hello@gmail.com>",
    to: opetions.email,
    subject: opetions.subject,
    text: opetions.message
  }

  // 3) Actually send the email
  await transporter.sendMail(mailOptions)
}

export default sendEmail;