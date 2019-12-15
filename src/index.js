//validasi express
const express = require('express')
const app = express()

//validasi cors
const cors = require('cors')

//validasi mongoose
require('./db/mongoose')

//validasi port 
const port = 8000

//validasi controller
const bookRouter = require('./routers/BookController')
const categoryRouter = require('./routers/CategoryController')
const userRouter = require('./routers/UserController')
const cartRouter = require('./routers/CartController')
const orderRouter = require('./routers/orderController')

//validasi app.use
app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(bookRouter)
app.use(categoryRouter)
app.use(cartRouter)
app.use(orderRouter)

//validasi listen port
app.listen(port, () => {
    console.log(`Server is running in ${port}`)
})