const { Router } = require('express');
const booksRoutes = require ("./books")

const router = Router()

router.use("/books", booksRoutes)

module.exports = router