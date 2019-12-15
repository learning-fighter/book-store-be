const express = require('express')
const Cart = require('../models/Cart')
const Book = require('../models/Book')
const auth = require('../middleware/auth')
const router = new express.Router()
const Order = require('../models/Order')
const ObjectID = require('mongodb').ObjectID

router.post('/orders', auth, async (req, res) => {
    const order = new Order({
        ...req.body,
        owner: req.user._id,
    })

    try {
        await Book.findById(req.body.book_id, async (err, response) => {
            console.log(response.stock)
            console.log(req.body.qty)
            // return response.stock
            const oldStock = response.stock
            const newStcok = oldStock - req.body.qty
            const filter = {_id: ObjectID(req.body.book_id)}
            const update = {stock: newStcok}
            console.log(filter)
            console.log(update)

            if(req.body.qty < oldStock ){
                await Book.findOneAndUpdate(filter, update, {
                    new:true
                })
                await order.save()
                await Cart.findByIdAndDelete(req.body.cart_id)
            } else {
                res.send({message: `Qty terlalu banyak, Jumlah Qty Available ${oldStock}`})
            }
           
        })

        res.status(201).send(order)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/orders', auth, async (req, res) => {
    try {
        await Order.aggregate([
            {
                $match:{
                    owner:req.user._id
                }
            },
            { 
                $lookup: { 
                    from: "books",
                    localField: "book_id", 
                    foreignField: "_id", 
                    as: "dataOrders "
                }
            }
        ], async (err, response) => {
            if(err){
                res.status(500).send(err)
            } else {
                res.status(200).send(response)
            }
        })
    } catch (error) {
        res.status(500).send(error)
    }
})

// router.get('/orders/transactions', auth, async (req, res) => {
//     try {
//         await Order.aggregate([
//             {
//                 $match:{
//                     book_owner: req.user._id
//                 }
//             },
//             { 
//                 $lookup: { 
//                     from: "books",
//                     localField: "book_id", 
//                     foreignField: "_id", 
//                     as: "dataOrders "
//                 }
//             }
//         ], async (err, response) => {
//             if(err){
//                 res.status(500).send(err)
//             } else {
//                 res.status(200).send(response)
//             }
//         })
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// router.get('/order/:id', auth, async (req, res) => {
//     if(!ObjectID.isValid(req.params.id)){
//         res.status(404).send({data : "ID not Found!"})
//     }
//     const match = {}
//     const sort = {}

//     if (req.query.completed) {
//         match.completed = req.query.completed === req.query.completed
//     }

//     if(req.query.sortBy){
//         const parts = req.query.sortBy.split(':')
//         sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
//     }

//     try {
        
//         await Cart.aggregate([
//             {
//                 $match:{
//                    _id: ObjectID(req.params.id),
//                    owner: req.user._id
//                 }
//             },
//             { 
//                 $lookup: { 
//                     from: "books",
//                     localField: "book_id", 
//                     foreignField: "_id", 
//                     as: "dataOrders "
//                 }
//             }
//         ], async (err, response) => {
//             if(err){
//                 res.status(500).send(err)
//             } else {
//                 res.status(200).send(response)
//                 console.log(response)
//             }
//         })
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

module.exports = router