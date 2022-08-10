const { Router } = require("express");
const { getCart, addCart, deleteBookInCart, deleteOneBookInCart } = require("../controllers/cartController");

const router = Router();

router.get('/:id', getCart);

router.put('/delete', deleteBookInCart);

router.put('/deleteone', deleteOneBookInCart);

router.post('/add', addCart);

module.exports = router;