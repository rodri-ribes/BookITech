const { Router } = require('express');
const { getBooks, getBooksByName, getBooksById ,postBooks, updateBook, deleteBook, PostReview, delistBook, updateHeart} = require('../controllers/booksController');

const router = Router()




router.get("/", getBooks)

router.get("/:name", getBooksByName)

router.get("/id/:id", getBooksById)

router.post("/",postBooks)

router.put("/id/:id",updateHeart)

router.put("/:id",updateBook)

router.put("/delist/:id", delistBook)

router.delete("/:id",deleteBook)

router.post('/review', PostReview)


module.exports = router
