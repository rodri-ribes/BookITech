const axios = require("axios")
const Book = require('../models/Book')
const User = require('../models/User')
const nodemailer = require('nodemailer')
//ESTA FUNCIÓN TRAE TODOS LOS LIBROS Y SI SE LE MANDA UNA QUERY HACE EL FILTRO POR EL DETERMINADO TITLE O AUTHORS

async function getBooks(req, res) {
    const { title } = req.query
    try {
        if (title){
            let search = await Book.find({title: { "$regex": `${title}`, "$options": "i" } })
            let searchAuthors = await Book.find({authors: { "$regex": `${title}`, "$options": "i" }})
            res.status(200).send(search.concat(searchAuthors).filter(e => !e.delisted))
        }else {
            let allBooks = await Book.find({})
            res.status(200).send(allBooks.filter(e => !e.delisted))
        }
    } catch (error) {
        res.status(404).json({ error: "An unexpected error occurred, please try again later" })
    }
}

//ESTA FUNCIÓN PUEDE SER UTILIZADA PARA USAR LOS FILTROS, BUSCA POR TITLE Y AUTHORS

async function getBooksByName(req, res) {
    const { name } = req.params
    try {
        let search = await Book.find({title: { "$regex": `${name}`, "$options": "i" }})
        let searchAuthors = await Book.find({authors: { "$regex": `${name}`, "$options": "i" }})
        res.status(200).send(search.concat(searchAuthors).filter(e => !e.delisted))
    } catch (error) {
        res.status(404).json({ error: "An unexpected error occurred, please try again later" })
    }
}


async function getBooksById(req, res) {
    const { id } = req.params
    try {
        let book = await Book.findOne({ isbn13: id }).populate('comments')
        if (!book) res.status(404)
        res.status(200).send(book)
    } catch (error) {
        res.status(404).json({ error: "An unexpected error occurred, please try again later" })
    }
}

/// Admin roles

async function postBooks(req, res){
    const { title, authors, publisher, subtitle, isbn13,
            language, pages, year, desc, price, image }=req.body
        if( title && authors && publisher ){
            let existe=await Book.findOne({
                title
            })
            if(existe){
                return res.status(401).send("The Book is already registered");
            }
            const newBook= new Book({
                title, authors, publisher, subtitle, isbn13,
                language, pages, year, desc, price, image
            })
            await newBook.save()
            const user = await User.find()
            const transporter = nodemailer.createTransport({
                host: "smtp.zoho.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'ledobookitech@zohomail.com', // generated ethereal user
                    pass: 'frqGYjAbPUUR', // generated ethereal password
                },
            });
            
            user.forEach(async(e) => {
                 await transporter.sendMail({
                    from: '"BookITech 📖" <ledobookitech@zohomail.com> ',
                to: e.email,
                subject: "NEW BOOKS",
                html: `
                <div style="background-color:#DCDCDC; border-radius:20px">
                    <h1  style="text-align:center; padding:10px">We have New Books 📚</h1>
                        <div style="text-align:center">
                            <img src=${newBook.image} alt='img not foun' width='100' height='100' />
                        </div>
                         <div style="text-align:center; padding:10px">
                         <h5>↓BUY HERE!↓</h5>
                         <a href="https://bookitech-olive.vercel.app/">📚BookITech 📗</a>
                         </div>
                </div>
                `
            })
        })
            console.log(prueba.messageId)
            res.status(200).json({
                title:newBook.title,
                authors:newBook.authors,
                publisher:newBook.publisher,
                subtitle:newBook.subtitle,
                language:newBook.language,
                isbn13: newBook.isbn13,
                pages:newBook.pages,
                year:newBook.year,
                desc:newBook.desc,
                price:newBook.price,
                image:newBook.image,
            
    })
}
}

async function updateBook(req, res) {
    const { title, authors, publisher, subtitle,
        language, pages, year, desc, price, image  } = req.body
    const updateBook = {
        title, authors, publisher, subtitle,
        language, pages, year, desc, price, image
    }
    await Book.findByIdAndUpdate(req.params.id, updateBook)
    res.status(200).json({ status: "Book update" })
}
async function updateHeart(req, res) {
    const {t}=req.body
    let heart=t
    const update={ heart }
    await Book.findOneAndUpdate({isbn13:req.params.id}, update)
    res.status(200).send("update")
}
async function deleteBook(req, res) {
    await Book.findByIdAndRemove(req.params.id)
    res.json("eliminado babe")
}

async function delistBook(req, res){
    const {id} = req.params
    const success = await Book.findByIdAndUpdate( id, {delisted: true})
    if(!success) return res.status(400)
    return res.status(200)
}

//Review
async function PostReview(req,res){
    try{    
        const {title,email,data,rating,content} = req.body
        let book = await Book.findOne({title})
        let user = await User.findOne({email})
        const total = {user, data,rating,content}
        book.ratings.push(total)
        // console.log(book.rating)
        await book.save()
        res.status(200).send('Agregado rating')
    } catch(err){
        res.status(404).send('No se agrego el rating')
    }
}


module.exports = {
    getBooks,
    getBooksByName,
    getBooksById,
    postBooks,
    updateHeart,
    updateBook,
    deleteBook,
    delistBook,
    PostReview

}