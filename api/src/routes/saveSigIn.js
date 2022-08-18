const { Router } = require("express");
const saveSignIn = require("../controllers/saveSignInController");
const router = Router();

router.post('/', saveSignIn);

module.exports = router;

