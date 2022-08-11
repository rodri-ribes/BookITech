const { Router }= require('express');
const { postComments, getComments, updateComments, deleteComments, getOneComment }=require("../controllers/CommentsController")
const router = Router()



router.get("/",getComments)
router.get("/:id",getOneComment)
router.post("/",postComments)
router.put("/:id",updateComments)
router.delete("/:id",deleteComments)


module.exports = router