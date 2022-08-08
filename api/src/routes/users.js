const { Router } = require('express');
const { createUser, loginUser } = require("../controllers/usersController");

const router = Router();


router.post('/' , createUser);


router.post('/', loginUser);

module.exports = router
