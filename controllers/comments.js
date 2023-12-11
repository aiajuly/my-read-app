const Book = require('../models/books');
const Comment = require('../models/comments');



module.exports = {
    newComment: async(req, res) => {
        const id = req.params.id;
        const {text} = req.body;

        const foundBook = await Book.findById(id);
        const newComment = new Comment({text});
        newComment.owner = req.user._id;

        foundBook.comments.push(newComment);
        await foundBook.save();
        await newComment.save();

        res.redirect(`/books/${id}`)
    },
    showEditComment: async(req, res) => {
        const foundBook = await Book.findById(req.params.id);
        const foundComment = await Comment.findById(req.params.commentId)
        res.render('comments/edit', {title: 'Edit Comment', foundBook, foundComment})
    },
    editComment: async(req, res) => {
        const {commentId, id} = req.params;
        const {text} = req.body;
        const foundComment = await Comment.findById(commentId);
        foundComment.text = text;
        foundComment.save();
        res.redirect(`/books/${id}`);
    },
    deleteComment: async(req, res) => {
        const {commentId, id} = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.redirect(`/books/${id}`);
    }
}