const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookSchema = new Schema({
    name:{
        type: String,
        required: true,
        lowercase: true
    },
    author:{
        type: String,
        required: true,
        lowercase: true
    },
    editorial:{
        type: String,
        required: true,
        lowercase: true
    },
    genre:{
        type: String,
        required: true,
        lowercase: true
    },
    language:{
        type: String,
        required: true,
        lowercase: true
    },
    format:{
        type: String,
        enum: ['pdf', 'physical']
    },
    price:{
        type: Number,
        min: 0
    },
    stock:{
        type: Number,
        min: 0
    },
    release_date:{
        type: Date
    },
    comments:[{
        body:{ type: String, date: Date},
        author:{ type: String },
        rating:{ type: Number, min: 0, max: 10},
        spoiler:{type: Boolean}
    }]

})

module.exports = mongoose.model('Book', BookSchema)