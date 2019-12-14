const express = require('express')
const auth = require('../middleware/auth')
const Transaction = require('../models/Transaction')
const transactionDetail = require('../models/TransactionDetail')
const router = new express.Router()

router.post('/checkOut', auth, async (req, res) => {
  const transaction = new Transaction(req.body)

  try {
    await transaction.save()
    res.status(201).send(transaction)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/checkOut', async (req, res) => {
  try {
    const category = await Category.find({})
    res.send(category)
  } catch (e) {
    res.status(500).send({e})
  }
})

router.get('/checkOut/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const category = await Category.findById(_id)

    if (!category) {
      return res.status(404).send()
    }

    res.send(category)
  } catch (e) {
    res.status(500).send({e})
  }
})

router.delete('/checkOut/:id', auth, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)

    if (!category) {
      res.status(404).send()
    }

    res.send(category)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router