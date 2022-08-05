const { Router } = require('express');
const booksRoutes = require ("./books")
const usersRoutes = require ("./users")

const router = Router()

router.use("/books", booksRoutes)
router.use("/signup", usersRoutes);
router.use("/signin", usersRoutes)


module.exports = router