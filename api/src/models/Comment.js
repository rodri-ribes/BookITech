const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: {type : String},
    author:{type: String},
    rating:{ type: Number, min: 0, max: 10},
    spoiler:{type: Boolean},
    idUser:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
    
})

module.exports = mongoose.model('Comment', CommentSchema)
