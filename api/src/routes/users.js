const { Router } = require('express');

const { createUser, loginUser, GetUser, PutUser, PostBook, banUser, GetUsersAdmin, createReview, editReview, ChangePass, getToken ,getAllUsers, unbanUser, deleteUser } = require("../controllers/usersController");


const router = Router();

router.post('/signup', createUser);
router.post('/signin', loginUser);

router.get('/user/admin/:admin', GetUsersAdmin)

router.get('/user/:id', GetUser)
router.put('/user/:id', PutUser)
router.put('/user/ban/:id', banUser)
router.put('/user/unban/:id', unbanUser)
router.post('/user/:email', PostBook)
router.put("/user/change/:id", ChangePass)
router.get('/users/all', getAllUsers)
router.post('/review/:id', createReview)
router.put('/review/edit/:id', editReview)
router.get("/verify/:id/:token", getToken)
router.delete("/user/:id", deleteUser)

module.exports = router
