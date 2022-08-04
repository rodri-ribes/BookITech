const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName:{type:String},
    email: {type:String},
    passwordHash:{type:String},
    comments:[{
        type: Schema.Types.ObjectId, //Para checkear
        ref:'Comment'
    }]
})

module.exports = mongoose.model('User', UserSchema)
