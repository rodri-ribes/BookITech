const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: {
        type: String
    },
    date: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    rating: {
        type: Number, min: 0, max: 5
    },
    parentId: {
        type: String, 
        default:null
    },
    username:{
        type:String,
    }
   

},{versionKey:false})

module.exports = mongoose.model('Comment', CommentSchema)
