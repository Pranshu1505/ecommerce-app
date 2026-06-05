# 🛍️ ShopEasy - Full E-commerce Store

A full-featured e-commerce web application built with Node.js, Express, MongoDB, and Cloudinary.

## 🚀 Live Demo
[ShopEasy on Render](https://your-app.onrender.com)

## ✨ Features
- 🔐 Register & Login (JWT Authentication)
- 👤 Role-based access (Admin & User)
- 📦 Product listing with real images (Cloudinary)
- 🔍 Search, Filter & Sort products
- 🛒 Cart management
- 📋 Order placement & tracking
- ⭐ Product ratings
- 🖥️ Admin dashboard — add/delete products, manage orders

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT, bcryptjs
- **Image Upload:** Cloudinary, Multer
- **Frontend:** HTML, CSS, Vanilla JS

## ⚙️ Installation

```bash

# Dependencies install karo
npm install

# .env file banao
PORT=3000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Run karo
node index.js
```

## 📁 Project Structure
```
ecommerce-app/
├── config/          # Cloudinary config
├── middleware/      # Auth & Admin middleware
├── models/          # MongoDB models
├── public/          # Frontend HTML files
├── routes/          # API routes
└── index.js         # Entry point
```

## 📡 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /auth/register | Register | ❌ |
| POST | /auth/login | Login | ❌ |
| GET | /products | Sare products | ❌ |
| POST | /products/add | Product add | Admin |
| DELETE | /products/delete/:id | Product delete | Admin |
| GET | /cart | Cart dekho | User |
| POST | /cart/add | Cart mein add | User |
| POST | /orders/place | Order place | User |
| GET | /orders/my | Mere orders | User |
| GET | /orders/all | Sare orders | Admin |

## 👨‍💻 Author
**Pranshu** - [GitHub](https://github.com/Pranshu1505)