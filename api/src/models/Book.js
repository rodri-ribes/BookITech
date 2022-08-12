const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    title:{
        type: String,
        required: true,
        lowercase: true
    },
    isbn13:{
        type: String
    },
    authors:{
        type: String,
        required: false,
        lowercase: true
    },
    publisher:{
        type: String,
        required: false,
        lowercase: true
    },
    subtitle:{
        type: String,
        required: false,
        lowercase: true
    },
    language:{
        type: String,
        required: false,
        lowercase: true
    },
    pages:{
        type: Number
    },
    year:{
        type: Number
    },
    rating:{
        type: Number
    },
    desc:{
        type: String
    },
    price:{
        type: String,
        min: 0
    },
    image:{
        type: String
    },
})

module.exports = mongoose.model('Book', BookSchema)