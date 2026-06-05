const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middleware/authMiddleware')
const admin = require('../middleware/adminMiddleware')
const { cloudinary, upload } = require('../config/cloudinary')

// Sare products
router.get('/', async (req, res) => {
  try {
    const { category, search, sort } = req.query
    let query = {}
    if (category) query.category = category
    if (search) query.name = { $regex: search, $options: 'i' }
    let products = Product.find(query)
    if (sort === 'price_asc') products = products.sort({ price: 1 })
    if (sort === 'price_desc') products = products.sort({ price: -1 })
    res.json(await products)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product nahi mila' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Product add with image (admin only)
router.post('/add', auth, admin, upload.single('image'), async (req, res) => {
  try {
    let imageUrl = ''

    // Image upload to Cloudinary
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'ecommerce' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(req.file.buffer)
      })
      imageUrl = result.secure_url
    }

    const product = await Product.create({ ...req.body, image: imageUrl })
    res.json({ message: 'Product add ho gaya', product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Product update (admin only)
router.put('/update/:id', auth, admin, upload.single('image'), async (req, res) => {
  try {
    let updateData = { ...req.body }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'ecommerce' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        ).end(req.file.buffer)
      })
      updateData.image = result.secure_url
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true })
    res.json({ message: 'Product update ho gaya', product })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Product delete (admin only)
router.delete('/delete/:id', auth, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product delete ho gaya' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Rating add karo
router.post('/rate/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const { rating } = req.body
    product.ratings = product.ratings.filter(r => r.user.toString() !== req.user.id)
    product.ratings.push({ user: req.user.id, rating })
    product.avgRating = product.ratings.reduce((a, b) => a + b.rating, 0) / product.ratings.length
    await product.save()
    res.json({ message: 'Rating add ho gaya' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router