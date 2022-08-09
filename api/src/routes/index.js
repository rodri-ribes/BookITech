const { Router } = require('express');
const booksRoutes = require ("./books")
const usersRoutes = require ("./users")
const commentsRoutes = require ("./comments")
const cartRoutes = require('./cartRoutes');


const router = Router()

router.use("/books", booksRoutes);
router.use("/signup", usersRoutes);
router.use("/signin", usersRoutes)
router.use("/comments",commentsRoutes)
router.use('/cart', cartRoutes)

module.exports = router