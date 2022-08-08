const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: {
        type: String
    },
    rating: {
        type: Number, min: 0, max: 5
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
    }
})

module.exports = mongoose.model('Comment', CommentSchema)
