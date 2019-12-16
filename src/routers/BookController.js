const express = require('express')
const auth = require('../middleware/auth')
const Book = require('../models/Book')
const Category = require('../models/Category')
const router = new express.Router()

router.post('/book', auth, async (req, res) => {
  const book = new Book(req.body)
  try {
    await book.save()
    
    return res.status(200).send(book)
  } catch (e) {
    res.status(500).send({e})
  }
})

router.get('/book', async (req, res) => {
  try {
    const book = await Book.find({}).populate('category', 'categoryName')
    res.send(book)
  } catch (e) {
    res.status(500).send({e})
  }
})

router.get('/book/:id', async (req, res) => {
  const _id = req.params.id

  try {
    const book = await Book.findById(_id).populate('category', 'categoryName')

    if (!book) {
      return res.status(404).send()
    }

    res.send(book)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/bookCategory/:id', async (req, res) => {
  const _id = req.params.id
  // const category = req.params.category

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

router.patch('/book/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!book) {
      return res.status(404).send()
    }

    res.send(book)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/book/:id', auth, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)

    if (!book) {
      res.status(404).send()
    }

    res.send(book)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router