const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  address: { type: String, required: true },
  paymentId: { type: String, default: '' },
  isPaid: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)