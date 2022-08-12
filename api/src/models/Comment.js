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
    book: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
   

},{versionKey:false})

module.exports = mongoose.model('Comment', CommentSchema)
