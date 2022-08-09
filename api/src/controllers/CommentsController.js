const Comment = require("../models/Comment")

async function getComments (req, res){
    const Comments=await Comment.find()
    res.json(Comments)
}
async function getOneComment (req, res){
    const Comments= await Comment.findById(
        req.params.id
    )
    res.json(Comments)
}

async function postComments (req, res) {

    const {content,rating,date,user,book}=req.body
    
   const newComment= new Comment({content,rating,date,user,book})
        await newComment.save()
    res.status(200).json({
        content:newComment.content,
        rating: newComment.rating,
        date: newComment.date,
        user: newComment.user,
        book: newComment.book,
    })
}
async function updateComments (req, res){
    const { content }= req.body
    const newComment= { content }
    await Comment.findByIdAndUpdate(req.params.id,newComment)
    res.status(200).json({status:"comment update"})   
}
async function deleteComments (req, res){
    await Comment.findByIdAndRemove(req.params.id)
    res.json("eliminado babe")
}

module.exports={
    postComments,
    getComments,
    getOneComment,
    updateComments,
    deleteComments,
}