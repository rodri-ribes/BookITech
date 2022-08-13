const User = require('../models/User.js')
const nodemailer = require('nodemailer')

const saveSignIn = async (req, res) => {

    let { email, displayName, photoURL } = req.body;
    console.log(email, displayName, photoURL)
    let exist = await User.findOne({ email });

    if (!exist) {
        await User.create({
            email,
            fullName: displayName,
            img: photoURL
        })
        const  transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'luciano.diazocampo@gmail.com', // generated ethereal user
              pass: 'xztlubimqzwdmzov', // generated ethereal password
            },
          });

          await transporter.sendMail({
            from: '"BookITech 📖"  <luciano.diazocampo@gmail.com>',
            to: email,
            subject: "HELLOOO ",
            html: '<h1>Welcome to BookITech 📖</h1>'
          })
        return res.send("creado");
    }
    return res.send("ya existe");
    // return res.status(200);
}

module.exports = saveSignIn;