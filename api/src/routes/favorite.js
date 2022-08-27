const { Router } = require('express');
const { PostFav,GetFav, DeleteFav,GetFavById } = require('../controllers/FavController');
const router = Router()



router.get('/',GetFav)
router.get('/id',GetFavById)
router.post("/", PostFav)
router.put('/', DeleteFav)



module.exports = router
