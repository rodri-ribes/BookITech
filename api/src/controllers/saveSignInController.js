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
      verified: true
      

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
        user: 'bookitech@zohomail.com', // generated ethereal user
        pass: '81tmAGWHmRtd', // generated ethereal password
      },
    });

    await transporter.sendMail({
      from: '"BookITech 📖" <bookitech@zohomail.com> ',
      to: email,
      subject: "HELLOOO ",
      html: `
        <div style="justify-content:center;">
        <div style="background-color:#DCDCDC; border-radius:20px; font-family:Rockweel,Lucidatypewriter; font-size=40px ">
        <h1 style="text-align:center; padding:10px; text-decoration:underline; background-color:#0a1929; color:#DADADA;">Welcome to BookITech 📖</h1>
        <div style="text-align:center; padding:0px 100px">
        <img src=${img[0]} alt='img not foun' width="200px" height="200px" />
        <img src=${img[1]} alt='img not foun' width="200px" height="200px"/>
                <img src=${img[2]} alt='img not foun' width="200px" height="200px"/>                      
                <img src=${img[3]} alt='img not foun' width="200px" height="200px"/>
        </div>
        <div style="text-align:center; padding:10px; background-color:#0a1929; color:#DADADA;">
        <p style="font-family:Rockweel,Lucidatypewriter; font-size:15px;" >↓BUY HERE!↓</p>
        <a href="https://bookitech-olive.vercel.app/" style="font-family:Rockweel,Lucidatypewriter; font-size:17px; " >📚BookITech 📗</a>
        </div>
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