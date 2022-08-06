const { Router } = require('express');
const { getBooks, getBooksByName, getBooksById } = require('../controllers/booksController');
const router = Router()



router.get("/", getBooks)

router.get("/", getBooksByName)

router.get("/id/", getBooksById)




module.exports = router
