const { Router } = require('express');
const  { createUser, loginUser } = require ("../controllers/usersController");
const { verifyToken } = require("./verifyToken.js");

const router = Router();

router.post('/' , createUser);

router.post('/', verifyToken , loginUser);

module.exports = router
