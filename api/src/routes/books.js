const { Router } = require ('express')
const { getBooks } = require('../controllers/booksController')

const router = Router()

router.get("/", getBooks)

// router.get("/:name", getBooksByName)

// router.get("/id/:id", getBooksById)

module.exports = router
