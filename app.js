require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const connectDB = require('./database/connect')

//helpers
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.options("*", cors());



//routes
const authRoute = require('./routes/auth-route')
const userRoute = require('./routes/user-route')
const categoryRoute = require('./routes/category-route')
const productRoute = require('./routes/product-route')
const orderRoute = require('./routes/order-route')
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/categories', categoryRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/orders', orderRoute)



//middlewares
const ErrorHandlerMiddleware = require('./middleware/error-handler')
const NotFoundMiddleware = require('./middleware/not-found')
app.use(ErrorHandlerMiddleware)
app.use(NotFoundMiddleware)



const port = 5000
const url = process.env.MONGO_URL
const start = async() => {
    try {
        await connectDB(url)
        app.listen(port, () => {
            console.log(`the server is ON listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()