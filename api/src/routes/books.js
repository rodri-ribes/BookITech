const { Router } = require ('express');
const { getBooks, getBooksByName, getBooksById } = require('../controllers/booksController');
const { verifyToken } = require("./verifyToken.js");
const router = Router()

router.get("/", getBooks)

router.get("/:name", verifyToken, getBooksByName)

router.get("/id/:id", verifyToken, getBooksById)

module.exports = router
