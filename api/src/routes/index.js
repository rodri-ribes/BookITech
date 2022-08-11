const { Router } = require('express');
<<<<<<< HEAD
const booksRoutes = require ("./books")
const usersRoutes = require ("./users")
const commentsRoutes = require ("./comments")
const cartRoutes = require('./cartRoutes');
const router = Router()

router.use("/books", booksRoutes);
router.use("/signup", usersRoutes);
router.use("/signin", usersRoutes)
router.use("/comments",commentsRoutes)
=======
const booksRoutes = require("./books")
const usersRoutes = require("./users")
const commentsRoutes = require("./comments")
const cartRoutes = require('./cartRoutes');
const FavRouter = require('./favorite')
const saveSignInRoutes = require('./saveSigIn')

const router = Router()

router.use("/books", booksRoutes);
router.use("/", usersRoutes);
router.use("/comments", commentsRoutes)
>>>>>>> 324d33f94f7b9d5e9afd05f2d86cf46ebf909e1d
router.use('/cart', cartRoutes)
router.use('/favorite', FavRouter)
router.use('/save', saveSignInRoutes)




module.exports = router