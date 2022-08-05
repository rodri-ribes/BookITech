const axios = require ("axios")
const Book = require('../models/Book')


///////////Search in API
async function getBooks (req, res){
    try {
        let booksDefault = []
        for (let i = 0; i < 100; i++) {
            let data = await axios(`https://api.itbook.store/1.0/search/mongo/${i}`)
            booksDefault.push(await data.data.books.map(b => b))
        }
        let dataDefault = booksDefault.flat()
        let apiData = dataDefault.map(b => {
            return {
                title: b.title,
                subtitle: b.subtitle,
                isbn13: b.isbn13,
                price: b.price,
                image: b.image
            }
        })
            res.status(200).send(apiData) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}


async function getBooksByName (req, res){
    const { name } = req.params
    try {
        let bookSearched = []
        for (let i = 0; i < 10; i++) {
            let data = await axios(`https://api.itbook.store/1.0/search/${name}/${i}`)
            bookSearched.push(await data.data.books.map(b => b))
        }
        let dataDefault = bookSearched.flat()
        let apiData = dataDefault.map(b => {
            return {
                title: b.title,
                subtitle: b.subtitle,
                isbn13: b.isbn13,
                price: b.price,
                image: b.image
            }
        })
            res.status(200).send(apiData) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}


async function getBooksById (req, res){
    const { id } = req.params
    try {
        let book = await axios(`https://api.itbook.store/1.0/books/${id}`)
        delete book.data.error
        delete book.data.isbn10
        delete book.data.url
        res.status(200).send(book.data) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}



///////////Search in DB



// async function getBooks (req, res){
//     const { title } = req.query
//     try {
//         if (title){
//             let search = await Book.find({title: `/${title}/i`})
//             console.log(title);
//             res.status(200).send(search)
//         }else {
//             let allBooks = await Book.find({})
//             res.status(200).send(allBooks)
//         }
//     } catch (error) {
//         res.status(404).json({error: "An unexpected error occurred, please try again later"})
//     }
// }
    

// async function getBooksByName (req, res){
//     const { title } = req.query
//     try {
//         console.log(title);
//         let search = await Book.find({ title: `/${req.query}/i` })
//         res.status(200).send(search)
//     } catch (error) {
//         res.status(404).json({error: "An unexpected error occurred, please try again later"})
//     }
// }


// async function getBooksById (req, res){
//     const { id } = req.query
//     try {
//         let book = await Book.findOne({isbn13: id})
//         res.status(200).send(book) 
//     } catch (error) {
//         res.status(404).json({error: "An unexpected error occurred, please try again later"})
//     }
// }













module.exports = {
    getBooks,
    getBooksByName,
    getBooksById
}