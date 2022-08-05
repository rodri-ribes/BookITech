const { Router } = require ('express')
const { getBooks, getBooksByName, getBooksById } = require('../controllers/booksController')

const router = Router()

router.get("/", getBooks)

// router.get("/:name", getBooksByName)

router.get("/id", getBooksById)

module.exports = router
