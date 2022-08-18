const User = require('../models/User.js')
const nodemailer = require('nodemailer')
const Book = require('../models/Book')

const saveSignIn = async (req, res) => {

  let { email, displayName } = req.body;


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
      if (min.length < 4) {
        min.push(e.image)
      }
      return min
    })
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'ledobookitech@zohomail.com', // generated ethereal user
        pass: 'frqGYjAbPUUR', // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: '"BookITech 📖" <ledobookitech@zohomail.com> ',
      to: email,
      subject: "HELLOOO ",
      html: `
        <div style="background-color:#DCDCDC; border-radius:20px">
        <h1 style="text-align:center; padding:10px">Welcome to BookITech 📖</h1>
        <div style="text-align:center">
        <img src=${img[0]} alt='img not foun' width='150' height='150' />
        <img src=${img[1]} alt='img not foun' width='150' height='150'/>
                <img src=${img[2]} alt='img not foun' width='150' height='150'/>                      
                <img src=${img[3]} alt='img not foun' width='150' height='150'/>
        </div>
        <div style="text-align:center; padding:10px">
        <h5>↓BUY HERE!↓</h5>
        <a href="https://bookitech-olive.vercel.app/">📚BookITech 📗</a>
        </div>
        </div>
        `
    })
    return res.json({
      name: newuser.fullName,
      email: newuser.email,
      img: newuser.img,
      id: newuser._id,
      buy: newuser.buy
    })
  }
  return res.json({
    name: exist.fullName,
    email: exist.email,
    img: exist.img,
    id: exist._id,
    buy: exist.buy
  })
}

module.exports = saveSignIn;