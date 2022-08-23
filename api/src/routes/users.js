const { Router } = require('express');
const { createUser, loginUser, GetUser, PutUser, PostBook, banUser, GetUsersAdmin, createReview, editReview, ChangePass, getAllUsers, unbanUser } = require("../controllers/usersController");

const router = Router();

router.post('/signup', createUser);
router.post('/signin', loginUser);

router.get('/user/:admin', GetUsersAdmin)

router.get('/user/:id', GetUser)
router.put('/user/:id', PutUser)
router.put('/user/ban/:id', banUser)
router.put('/user/unban/:id', unbanUser)
router.post('/user/:email', PostBook)
router.put("/user/change/:id", ChangePass)
router.get('/users/all', getAllUsers)
router.post('/review/:id', createReview)
router.put('/review/edit/:id', editReview)

module.exports = router
