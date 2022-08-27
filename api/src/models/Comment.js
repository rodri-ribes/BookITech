const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: {
        type: String
    },
    date: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    book: {
        type: String
    }

}, { versionKey: false })

module.exports = mongoose.model('Comment', CommentSchema)
