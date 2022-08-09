const { Router } = require("express");
const { getCart, addCart, deleteBookInCart } = require("../controllers/cartController");

const router = Router();

router.get('/', getCart);

router.put('/delete', deleteBookInCart);

router.post('/add', addCart);

module.exports = router;