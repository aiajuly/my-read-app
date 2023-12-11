const express = require('express');
const router = express.Router();
const commentController =  require('../controllers/comments');
const {wrapAsync} = require('../utils/errors/errors')
const validateComment = require('../utils/validation/validateComments');
const isLoggedIn = require('../middlewares/is-logged-in')
const isOwner = require('../middlewares/is-comment-owner')



router.post('/:id/comments', isLoggedIn, validateComment, wrapAsync(commentController.newComment));
router.get('/:id/comments/:commentId/edit', isOwner, isLoggedIn, wrapAsync(commentController.showEditComment));
router.put('/:id/comments/:commentId', isOwner,  isLoggedIn, validateComment, wrapAsync(commentController.editComment));
router.delete('/:id/comments/:commentId', isOwner, isLoggedIn, wrapAsync(commentController.deleteComment));



module.exports = router