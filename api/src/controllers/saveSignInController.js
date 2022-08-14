const User = require('../models/User.js')
const nodemailer = require('nodemailer')
const Book = require('../models/Book')
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
        const book = await Book.find()
            let img = book.map(e => {
                let min = []
                if(min.length < 6){
                    min.push(e.image)
                }
                return min
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
            html:  `
            <h1>Welcome to BookITech 📖</h1>
                    <img src=${img[0]} alt='img not foun' width='100' height='100' />
                    <img src=${img[1]} alt='img not foun' width='100' height='100'/>
                    <img src=${img[2]} alt='img not foun' width='100' height='100'/>                      
                    <img src=${img[3]} alt='img not foun' width='100' height='100'/>
                    <img src=${img[4]} alt='img not foun' width='100' height='100'/>
                    <img src=${img[5]} alt='img not foun' width='100' height='100'/>
                <h5>BUY HERE!</h5>
                <h4>Link to the page</h4>
            `
          })
        return res.send("creado");
    }
    return res.send("ya existe");
    // return res.status(200);
}

module.exports = saveSignIn;