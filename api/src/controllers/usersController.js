const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Book = require('../models/Book')
const User = require("../models/User");
const Cart = require("../models/Cart");
const nodemailer = require('nodemailer')

async function GetUser(req, res) {
    const { id } = req.params;

    try {
        let user = await User.findById(id)
        res.status(200).send(user)
    } catch (err) {
        res.status(404).send('Fallo en el id')
    }
}

async function getAllUsers(req, res) { 

    const users = await User.find({}).catch(err => console.log(err))
    if(!users) return res.status(400).send("no users found")
    return res.status(200).send(users)
}

async function banUser(req, res){ 

    const {id} = req.params
    const user = await User.findById(id).catch(err => console.log(err))
    if(user.banned.isBanned) return res.status(401).send("user already banned")    
    if(user.banned.flaggedComments<2) {
        user.banned.flaggedComments = user.banned.flaggedComments +1
    }else{ 
    user.banned.flaggedComments = 0
    user.banned.isBanned= true
    user.banned.date = new Date().toDateString()
    user.banned.numberOfBans = user.banned.numberOfBans +1
    } 
    user.comments = user.comments?.length ? [...user.comments] : []
    console.log(user)

    const success = await user.save().catch(err => console.log(err))
    if(!success) return res.status(400).send("banning update failed")
    return res.status(200).send(success)
}

async function unbanUser(req, res){
    
    const {id} = req.params
    const user = await User.findById(id).catch(err => alert(err))
    if(!user.banned.isBanned) return res.status(400).send('user was not banned')
    user.banned.flaggedComments = 0
    user.banned.isBanned= false
    user.banned.date = ''
    user.banned.numberOfBans = user.banned.numberOfBans - 1
    user.comments = user.comments?.length ? [...user.comments] : []
    console.log(user)

    const success = await user.save().catch(err => console.log(err))
    if(!success) return res.status(400).send("banning update failed")
    return res.status(200).send(success)
}



async function GetUsersAdmin(req, res) {
    const { admin } = req.params;

    try {
        let users = await User.find({})
        res.status(200).send(users)
    } catch (err) {
        res.status(404).send('Fallo en el id')
    }
}


async function PutUser(req, res) {
    try {
        const { fullName, img, phone } = req.body
        const { id } = req.params

        if (fullName && img && phone) {

            let upDate = { fullName, img, phone }
            await User.findByIdAndUpdate(id, upDate)
            return res.status(200).send('Actualizado')
        }
        return res.status(404).send('falta el body')

    } catch (err) {
        res.status(404).send('Fallo en el PUT')
    }
}

async function updateUser(req, res){

    const {id} = req.params
    const {newValues} = req.body
    const success = await User.findByIdAndUpdate(id, newValues).catch(err => console.log(err))
    if(!success) return res.status(400).send("update failed").json({ok: false})
    return res.status(200).send(success)

}

async function loginUser(req, res) {

    const { email, password } = req.body;


    const user = await User.findOne({
        email

    })

    if (user) {

        bcrypt.compare(password, user.passwordHash, function (err, pass) {
            if (pass) {

                const token = jwt.sign({ _id: user.id }, 'secretKey')
                res.json({
                    id: user.id,
                    name: user.fullName,
                    email: user.email,
                    token: token,
                    ban: user.ban,
                    img: user.img,
                    phone: user.phone,
                    // rrss: user.rrss,
                    option: user.option,
                    rol: user.rol,
                    buy: user.buy
                })
            } else {

                res.status(401).send("invalid user or password")
            }
        })


    } else {
        res.status(401).send("invalid user or password")
    }
};



async function createUser(req, res) {
    const { fullName, email, password } = req.body;

    console.log(fullName, email, password)

    if (fullName && email && password) {




        let existe = await User.findOne({
            email
        })




        if (existe) {
            return res.status(401).send("The user is already registered");
        } else {

            let passwordHash = await bcrypt.hash(password, 10);


            //const newUser = await User.save({
            //    name, email, password, passwordHash
            //})

            const newUser = new User({ fullName, email, passwordHash })
            await newUser.save();


            const token = jwt.sign({ _id: newUser.id }, 'secretKey')
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

            const prueba = await transporter.sendMail({
                from: '"BookITech 📖" <ledobookitech@zohomail.com> ',
                to: email,
                subject: "HELLOOO ",
                html: `
                <div  style="justify-content:center;">
                <div  style="background-color:#DCDCDC; border-radius:20px; font-family:Rockweel,Lucidatypewriter; font-size=40px;">
                <h1 style="text-align:center; padding:10px; text-decoration:underline; background-color:#0a1929; color:#DADADA;">Welcome to BookITech 📖</h1>
                <div  style="text-align:center; padding:0px 100px">
                <img src=${img[0]} alt='img not foun' width="200px" height="200px" />
                <img src=${img[1]} alt='img not foun' width="200px" height="200px"/>
                        <img src=${img[2]} alt='img not foun' width="200px" height="200px"/>                      
                        <img src=${img[3]} alt='img not foun' width="200px" height="200px"/>
                </div>
                <div style="text-align:center; padding:10px; background-color:#0a1929; color:#DADADA;">
                <p style="font-family:Rockweel,Lucidatypewriter; font-size:15px;" >↓BUY HERE!↓</p>
                <a href="https://bookitech-olive.vercel.app/" style="font-family:Rockweel,Lucidatypewriter; font-size:17px; >📚BookITech 📗</a>
                </div>
                </div>
                </div>
                `
            })
            console.log(prueba.messageId);
            res.status(200).json({
                id: newUser.id,
                name: newUser.fullName,
                email: newUser.email,
                realName: newUser.realName,
                lastname: newUser.lastname,
                token: token,
                ban: newUser.ban,
                img: newUser.img,
                phone: newUser.phone,
                address: newUser.address,
                // rrss: newUser.rrss,
                option: newUser.option,
                rol: newUser.rol,
                buy: newUser.buy
            })
        }
    }
}

async function ChangePass(req, res) {
    const { id } = req.params
    const { current, password } = req.body

    const _id = await User.findById(id)
    if (current === password) {
        res.status(400).send("new password can't be equal than last")
    }
    try {
        bcrypt.compare(current, _id.passwordHash, async function (err, pass) {
            if (pass) {
                let passwordHash = await bcrypt.hash(password, 10)
                await User.findByIdAndUpdate(_id, { passwordHash: passwordHash })
                res.status(200).send("cambiado")
            }
            else {
                res.status(401).send("invalid current Password")
            }
        })

    }


    catch (error) {
        console.log(error)
    }

}

async function GetUser(req, res) {
    try {
        const { id } = req.params;

        // let _id = id
        let user = await User.findById(id)
        res.status(200).send(user)

    } catch (err) {
        res.status(404).send('Fallo en el id')
    }

}

async function PutUser(req, res) {
    try {
        const { fullName, img, lastname, realName, email, phone, address } = req.body
        const { id } = req.params

        if (fullName || img || phone || realName || lastname || email || address) {

            let upDate = { fullName, img, email, realName, lastname, phone, address }
            await User.findByIdAndUpdate(id, upDate)
            return res.status(200).send('Actualizado')
        }
        return res.status(404).send('falta el body')
    } catch (err) {
        res.status(404).send('Fallo en el PUT')
    }
}

async function PostBook(req, res) {
    try {
        const { email } = req.params;
        const { items } = req.body;
        // const nomb = await User.find()
        // let isbn13 = id
        // let _id = id

        const usuario = await User.findOne({ email })

        let cart = await Cart.findOne({ user: usuario.id })

        cart.cart.splice(0, cart.cart.length)

        await cart.save()

        items.forEach(e => {
            usuario.buy.push(e)
        });

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: 'ledobookitech@zohomail.com', // generated ethereal user
                pass: 'frqGYjAbPUUR', // generated ethereal password
            },
        });
        let url =items.flat().map(e => e)
        // <img src=${img[0]} alt='img not foun' width='150' height='150' />
        const prueba = await transporter.sendMail({
            from: '"BookITech 📖" <ledobookitech@zohomail.com> ',
            to: email,
            subject: "YOUR BOOKS ",
            html: `
            <div style="justify-content:center;">
            <div style="background-color:#DCDCDC; border-radius:20px; font-family:Rockweel,Lucidatypewriter; font-size=40px ">
            <h1 style="text-align:center; padding:10px; text-decoration:underline; background-color:#0a1929; color:#DADADA;">Thanks for purchasing at BookITech 📚</h1>
            <div style="text-align:center; padding:0px 100px">
            ${url.map(e => {
                return (
                    `
                    <img src=${e.image} alt="img not foundt" width="200px" height="200px" />
                    `
                    )
                })}
            </div>
            <div style="text-align:center; padding:10px; background-color:#0a1929; color:#DADADA;">
            <p style="font-family:Rockweel,Lucidatypewriter; font-size:15px;" >Buy more book? ↓HERE!↓</p>
            <a href="https://bookitech-olive.vercel.app/" style="font-family:Rockweel,Lucidatypewriter; font-size:17px; ">📚BookITech 📗</a>
            </div>
            </div>
            </div>
            `
        })
        console.log(prueba.messageId);
        await usuario.save()

        res.status(200).send('actualizado')

    } catch (err) {
        res.status(404).send('No pudimos comprar el libro')
    }
}

async function createReview(req, res) {
    try {
        const { id } = req.params;
        const { book, bookImg, bookTitle, bookAuthor, rating, status, review } = req.body;

        const usuario = await User.findOne({ _id: id })

        const bookEncontrado = await Book.findOne({ isbn13: book })

        bookEncontrado.reviews.push({
            book: book,
            bookImg: bookImg,
            bookTitle: bookTitle,
            bookAuthor: bookAuthor,
            userId: usuario.id,
            userImg: usuario.img,
            userName: usuario.fullName,
            rating: rating,
            status: status,
            review: review
        })

        usuario.reviews.push({
            book: book,
            bookImg: bookImg,
            bookTitle: bookTitle,
            bookAuthor: bookAuthor,
            rating: rating,
            status: status,
            review: review
        })

        await bookEncontrado.save()
        await usuario.save()
        res.status(200).send('actualizado')

    } catch (err) {
        res.status(404).send('No pudimos comprar el libro')
    }
}

async function editReview(req, res) {
    try {
        const { id } = req.params;
        const { book, rating, status, review } = req.body;

        const usuario = await User.findOne({ _id: id })

        const bookEncontrado = await Book.findOne({ isbn13: book })

        bookEncontrado.reviews.forEach(c => {
            if (c.userId === id && c.book === book) {
                c.rating = rating
                c.status = status
                c.review = review
            }
        })


        usuario.reviews.forEach(c => {
            if (c.book === book) {
                c.rating = rating
                c.status = status
                c.review = review
            }
        })

        await bookEncontrado.save()
        await usuario.save()
        res.status(200).send('actualizado')

    } catch (err) {
        res.status(404).send('No pudimos comprar el libro')
    }
}



module.exports = {
    loginUser,
    createUser,
    GetUser,
    PutUser,
    ChangePass,
    PostBook,
    editReview,
    createReview,
    GetUsersAdmin,
    getAllUsers,
    updateUser,
    banUser,
    unbanUser
}
