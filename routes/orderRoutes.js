const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const auth = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')

// Order place karo
router.post('/place', auth, async (req, res) => {
  try {
    const { address } = req.body
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart khali hai' })
    const items = cart.items.map(i => ({
      product: i.product._id,
      quantity: i.quantity,
      price: i.product.price
    }))
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const order = await Order.create({ user: req.user.id, items, totalAmount, address })
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] })
    res.json({ message: 'Order place ho gaya', order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Apne orders dekho
router.get('/my', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product').sort('-createdAt')
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Sare orders (admin)
router.get('/all', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product').sort('-createdAt')
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Order status update (admin)
router.put('/status/:id', auth, admin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json({ message: 'Status update ho gaya', order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router