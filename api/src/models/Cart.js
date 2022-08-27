const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    cart: [
        {
            _id: String,
            cantidad: Number
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Cart', CartSchema)