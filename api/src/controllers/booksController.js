const axios = require ("axios")

async function getBooks (req, res){
    let dataDefault = await axios(`https://api.itbook.store/1.0/search/mongo`)
    try {
            res.status(200).json(dataDefault.data.books)
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}

async function getBooksByName (req, res){
    const { name } = req.params
    let data = await axios(`https://api.itbook.store/1.0/search/${name}`)
    try {
            let bookSearched = await data.data.books.filter(d => d.title.toLowerCase().includes(name.toLowerCase()));
                res.status(200).send(bookSearched) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}

async function getBooksById (req, res){
    const { id } = req.params
    let book = await axios(`https://api.itbook.store/1.0/search/${id}`)
    try {
            res.status(200).send(book.data.books) 
    } catch (error) {
        res.status(404).json({error: "An unexpected error occurred, please try again later"})
    }
}




module.exports = {
    getBooks,
    getBooksByName,
    getBooksById
}