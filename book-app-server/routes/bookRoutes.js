const express = require('express');
const { 
  getBooks, 
  addBook, 
  updateBook, 
  deleteBook 
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');
const { validateBook } = require('../middleware/validationMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getBooks)
  .post(protect, validateBook, addBook);

router.route('/:id')
  .put(protect, validateBook, updateBook)
  .delete(protect, deleteBook);

module.exports = router;