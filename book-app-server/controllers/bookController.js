const Book = require('../models/Book')

// Get all books for user
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json({ success: true, count: books.length, data: books })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// Add new book
exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body
    
    const book = new Book({
      title,
      author,
      userId: req.userId
    })

    await book.save()

    res.status(201).json({ success: true, data: book })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message)
      return res.status(400).json({ success: false, message: messages })
    }
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// Update book
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params
    const { title, author } = req.body

    const book = await Book.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, author },
      { new: true, runValidators: true }
    )

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' })
    }

    res.json({ success: true, data: book })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message)
      return res.status(400).json({ success: false, message: messages })
    }
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

// Delete book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findOneAndDelete({ _id: id, userId: req.userId })

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' })
    }

    res.json({ success: true, data: {} })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' })
  }
}