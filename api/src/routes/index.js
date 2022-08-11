const { Router } = require('express');
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
router.use('/cart', cartRoutes)
router.use('/favorite', FavRouter)
router.use('/save', saveSignInRoutes)




module.exports = router