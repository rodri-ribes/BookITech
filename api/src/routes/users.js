const { Router } = require('express');
const { createUser, loginUser,GetUser, PutUser } = require("../controllers/usersController");

const router = Router();


router.post('/' , createUser);

router.get('/:id', GetUser)
router.post('/', loginUser);
router.put('/:id',PutUser)
module.exports = router
