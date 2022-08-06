const axios = require ("axios")
const Book = require('../models/Book')



async function getBooks (req, res){
    const { title } = req.query
    try {
        if (title){
            let search = await Book.find({title: `/${title}/i`})
            console.log(title);
            res.status(200).send(search)
        }else {
            let allBooks = await Book.find({})
            res.status(200).send(allBooks)
        }
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}
    

async function getBooksByName (req, res){
    const { title } = req.query
    try {
        console.log(title);
        let search = await Book.find({ title: `/${title}/i` })
        res.status(200).send(search)
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}


async function getBooksById (req, res){
    const { id } = req.query
    try {
        let book = await Book.findOne({isbn13: id})
        res.status(200).send(book) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}





module.exports = {
    getBooks,
    getBooksByName,
    getBooksById
}