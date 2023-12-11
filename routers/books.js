const express = require('express');
const router = express.Router();
const bookController =  require('../controllers/books')
const validatebooks = require('../utils/validation/validateBooks');
const {wrapAsync} = require('../utils/errors/errors')
const isLoggedIn = require('../middlewares/is-logged-in')
const isOwner = require('../middlewares/is-book-owner')





router.get('/', wrapAsync(bookController.index));
router.get('/new', isLoggedIn, bookController.newForm);
router.post('/', isLoggedIn, validatebooks, wrapAsync(bookController.newBook));
router.get('/:id', wrapAsync(bookController.showBook));
router.get('/:id/edit', isOwner, isLoggedIn, wrapAsync(bookController.editForm));
router.patch('/:id', isOwner, isLoggedIn, validatebooks, wrapAsync(bookController.editBook));
router.delete('/:id', isOwner, isLoggedIn, wrapAsync(bookController.deleteBook));




module.exports = router;