const nodemailer = require("nodemailer");



const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'itbooks@zohomail.com', // generated ethereal user
                pass: 'pedroangel02', // generated ethereal password
            },
        });
  
      await transporter.sendMail({
        from: '"BookITech 📖" <itbooks@zohomail.com> ',
        to: email,
        subject: subject,
        text: text,
      });
      console.log("email sent sucessfully");
    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
};
  

module.exports = sendEmail;