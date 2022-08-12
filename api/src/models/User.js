const mongoose = require('mongoose');
const { Schema } = mongoose;
const {random} = require('../image/image')
const UserSchema = new Schema({
    fullName:{type:String},
    email: {type:String},
    passwordHash:{type:String},
    comments:[{
        type: Schema.Types.ObjectId, //Para checkear
        ref:'Comment'
    }],
    ban: {type: Boolean,default:false},
    img:{type: String, default: random[0]},
    phone: {type: String},
    // rrss:[{type: String}],
    option: {type: Object, default: random},
    rol: {type : String, default: 'user'},
    buy:[{type: Object}]
})

module.exports = mongoose.model('User', UserSchema)
