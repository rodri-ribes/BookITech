const { Router } = require('express');
const { PostFav,GetFav, DeleteFav } = require('../controllers/FavController');
const router = Router()



router.get('/',GetFav)
router.post("/", PostFav)
router.delete('/', DeleteFav)



module.exports = router
