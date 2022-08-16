const { Router } = require('express');
const { postComments, updateComments, deleteComments } = require("../controllers/CommentsController")
const router = Router()


router.post("/:id", postComments)

router.put("/edit/:id/:idcomment", updateComments)

router.delete("/delete/:id/:idcomment", deleteComments)



module.exports = router