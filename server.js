const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json())


const attribute = require('./Routes/attribute')
app.use('/',attribute)

const department = require('./Routes/department')
app.use('/',department)

const categories = require('./Routes/categories')
app.use('/',categories)

const product = require('./Routes/products')
app.use('/',product)

const tax = require('./Routes/tax')
app.use('/',tax)

const shipping = require('./Routes/shipping')
app.use('/',shipping)

const customer = require('./Routes/customer')
app.use('/',customer)

const shoppingcart = require('./Routes/shopping_cart')
app.use('/',shoppingcart)

const order = require('./Routes/order')
app.use('/',order)


const PORT = process.env.PORT || 2022
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} port`)
})