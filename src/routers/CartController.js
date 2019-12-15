const express = require('express')
const auth = require('../middleware/auth')
const Cart = require('../models/Book')
const router = new express.Router()

router.post('/cart', auth, async (req, res) => {
  const cart = new Cart(req.body)
  try {
    await cart.save()
    
    return res.status(200).send(cart)
  } catch (e) {
    res.status(500).send({e})
  }
})

router.get('/cart', async (req, res) => {
  try {
    const cart = await Cart.find({}).populate('category', 'categoryName')
    res.send(cart)
  } catch (e) {
    res.status(500).send({e})
  }
})

router.get('/cart/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const cart = await Cart.findById(_id)

    if (!cart) {
      return res.status(404).send()
    }

    res.send(cart)
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/cart/:id', auth, async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id)

    if (!cart) {
      res.status(404).send()
    }

    res.send(cart)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router