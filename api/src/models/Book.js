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
    author:{
        type: String,
        required: false,
        lowercase: true
    },
    editorial:{
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
    format:{
        type: String,
        enum: ['pdf', 'physical']
    },
    price:{
        type: String,
        min: 0
    },
    stock:{
        type: Number,
        min: 0
    },
    release_date:{
        type: Date
    },
    image:{
        type:String
    },
    comments:[{
        type: Schema.Types.ObjectId,
        ref:'Comment'
    }]
    

})

module.exports = mongoose.model('Book', BookSchema)