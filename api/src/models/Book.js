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
    ratings:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            rating:{
                type: Number
            },
            data:{
                type: String
            },
            content:{
                type: String
            }
        }
    ],
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
    delisted:{
        type: Boolean,
        default: false
    },
    comments: [ 
        {
            content: {
                type: String
            },
            date: {
                type: String,
            },
            user: Array
        }
    ],
    heart:{
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Book', BookSchema)