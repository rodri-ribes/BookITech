const { Router } = require('express');
const { getBooks, getBooksByName, getBooksById } = require('../controllers/booksController');
const router = Router()


///////routes for API
router.get("/", getBooks)

router.get("/:name", getBooksByName)

router.get("/id/:id", getBooksById)


///////routes for DB
// router.get("/", getBooks)

// router.get("/", getBooksByName)

// router.get("/id/", getBooksById)

module.exports = router
