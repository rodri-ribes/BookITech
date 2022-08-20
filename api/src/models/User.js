const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const { random } = require('../image/image')

const UserSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    passwordHash: { type: String },
    comments: [{
        type: Schema.Types.ObjectId, //Para checkear
        ref: 'Comment'
    }],
    realName: { type: String },
    lastname: { type: String },
    ban: { type: Boolean, default: false },
    img: { type: String, default: random[0] },
    phone: { type: String },
    address: { type: String },
    // rrss:[{type: String}],
    option: { type: Object, default: random },
    rol: { type: String, default: 'user' },
    buy: [
        { type: Object }
    ],
    reviews: [
        {
            book: String,
            bookImg: String,
            bookTitle: String,
            bookAuthor: String,
            rating: Number,
            status: String,
            review: String,
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)
