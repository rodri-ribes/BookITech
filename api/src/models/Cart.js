const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    cart: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Cart', CartSchema)