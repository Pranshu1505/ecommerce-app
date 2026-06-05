const express = require('express')
const router = express.Router()
const Cart = require('../models/Cart')
const auth = require('../middleware/authMiddleware')

// Cart dekho
router.get('/', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product')
    res.json(cart || { items: [] })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Cart mein add karo
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body
    let cart = await Cart.findOne({ user: req.user.id })
    if (!cart) cart = await Cart.create({ user: req.user.id, items: [] })
    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId)
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 })
    }
    await cart.save()
    res.json({ message: 'Cart mein add ho gaya' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Cart se remove karo
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId)
    await cart.save()
    res.json({ message: 'Cart se remove ho gaya' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Cart clear karo
router.delete('/clear', auth, async (req, res) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user.id }, { items: [] })
    res.json({ message: 'Cart clear ho gaya' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router