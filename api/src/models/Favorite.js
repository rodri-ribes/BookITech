const mongoose = require('mongoose');
const { Schema } = mongoose;

const FavoriteSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    heart:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Favorite', FavoriteSchema)