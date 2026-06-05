require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())


// MongoDB connect 
mongoose.connect(process.env.MONGO_URL)
   .then(() => console.log('MongoDB connected'))
   .catch((err) => console.log('MongoDB Error:', err))
 

// Routes
app.use('/auth', require('./routes/authRoutes'))
app.use('/products', require('./routes/productRoutes'))
app.use('/cart', require('./routes/cartRoutes'))
app.use('/orders', require('./routes/orderRoutes'))


// Redirect

app.get('/', (req, res) => {
    res.redirect('/landing.html')
})

// Static files
app.use(express.static('public'))

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server chal raha hai: http://localhost:${process.env.PORT || 4000}`)
    
})