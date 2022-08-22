const { Router } = require('express');
const { createUser, loginUser, GetUser, PutUser, PostBook, GetUsersAdmin, createReview, editReview, ChangePass } = require("../controllers/usersController");

const router = Router();

router.post('/signup', createUser);
router.post('/signin', loginUser);

router.get('/user/:admin', GetUsersAdmin)

router.get('/user/:id', GetUser)
router.put('/user/:id', PutUser)
router.post('/user/:email', PostBook)
router.put("/user/change/:id", ChangePass)

router.post('/review/:id', createReview)
router.put('/review/edit/:id', editReview)

module.exports = router
