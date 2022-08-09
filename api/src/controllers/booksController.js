const axios = require ("axios")
const Book = require('../models/Book')


//ESTA FUNCIÓN TRAE TODOS LOS LIBROS Y SI SE LE MANDA UNA QUERY HACE EL FILTRO POR EL DETERMINADO TITLE O AUTHORS

async function getBooks (req, res){
    const { title } = req.query
    try {
        if (title){
            let search = await Book.find({title: { "$regex": `${title}`, "$options": "i" } })
            let searchAuthors = await Book.find({authors: { "$regex": `${title}`, "$options": "i" }})
            res.status(200).send(search.concat(searchAuthors))
        }else {
            let allBooks = await Book.find({})
            res.status(200).send(allBooks)
        }
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}
    
//ESTA FUNCIÓN PUEDE SER UTILIZADA PARA USAR LOS FILTROS, BUSCA POR TITLE Y AUTHORS

async function getBooksByName (req, res){
    const { name } = req.params
    try {
        let search = await Book.find({title: { "$regex": `${name}`, "$options": "i" }})
        let searchAuthors = await Book.find({authors: { "$regex": `${name}`, "$options": "i" }})
        res.status(200).send(search.concat(searchAuthors))
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}


async function getBooksById (req, res){
    const { id } = req.params
    try {
        let book = await Book.findOne({isbn13: id})
        res.status(200).send(book) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}

/// Admin roles
async function postBooks(req, res){
    const { title, authors, publisher, subtitle, 
            language, pages, year, desc, price, image }=req.body
        if( title && authors && publisher ){
            let existe=await Book.findOne({
                title
            })
            if(existe){
                return res.status(401).send("The Book is already registered");
            }
            const newBook= new Book({
                title, authors, publisher, subtitle, 
                language, pages, year, desc, price, image
            })
            await newBook.save()
            res.status(200).json({
                title:newBook.title,
                authors:newBook.authors,
                publisher:newBook.publisher,
                subtitle:newBook.subtitle,
                language:newBook.language,
                pages:newBook.pages,
                year:newBook.year,
                desc:newBook.desc,
                price:newBook.price,
                image:newBook.image,
            })
        }
}
async function updateBook(req, res){
    const { title, authors, publisher, subtitle, 
        language, pages, year, desc, price, image }= req.body
    const updateBook = { title, authors, publisher, subtitle, 
        language, pages, year, desc, price, image }
    await Book.findByIdAndUpdate(req.params.id,updateBook)
    res.status(200).json({status:"Book update"})
}
async function deleteBook(req, res){
    await Book.findByIdAndRemove(req.params.id)
    res.json("eliminado babe")
}


module.exports = {
    getBooks,
    getBooksByName,
    getBooksById,
    postBooks,
    updateBook,
    deleteBook
}