const { Router } = require('express');
const { getBooks, getBooksByName, getBooksById ,postBooks, updateBook, deleteBook} = require('../controllers/booksController');
const router = Router()




router.get("/", getBooks)

router.get("/:name", getBooksByName)

router.get("/id/:id", getBooksById)

router.post("/",postBooks)

router.put("/:id",updateBook)

router.delete("/:id",deleteBook)




module.exports = router
