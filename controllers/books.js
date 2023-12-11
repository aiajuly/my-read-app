const Book = require('../models/books')
const Comment = require('../models/comments');
const comments = require('./comments');

module.exports = {
    index: async(req, res) => {
        const books = await Book.find({});
        res.render('books/index', {books, title: 'All Books'});
    },
    newForm: (req, res) => {
        res.render('books/new', {title: 'New Book'})
    },
    newBook: async(req, res) => {
        const {bookName, author, imageUrl, description} = req.body;
        const newBook = new Book({bookName, author, imageUrl, description});
        newBook.owner = req.user._id;
        newBook.save();
        res.redirect('/books')
    },
    showBook: async(req, res) => {
        const id = await req.params.id;
        // nested population
        const foundBook = await Book.findById(id).populate('owner').populate({
            path: 'comments',
            populate: {
                path: 'owner',
                model: 'User'
            }

    })
        res.render('books/show', {title: "Book's Details", foundBook})
    },
    editForm: async(req, res) => {
        const id = await req.params.id;
        const foundBook = await Book.findById(id);
        res.render('books/edit', {title: 'Edit book', foundBook})
    },
    editBook: async(req, res) => {
        const id = await req.params.id;
        const {bookName, author, imageUrl, description} = req.body;
        const foundBook = await Book.findByIdAndUpdate(id, {bookName, author, imageUrl, description});
        res.redirect(`/books/${id}`);
    },
    deleteBook: async(req, res) => {
        const id = await req.params.id;
        const foundBook = await Book.findById(id);
        for(comment of foundBook.comments){
            await Comment.deleteOne({ _id: comment._id})
        }
        await Book.findByIdAndDelete(id);
        res.redirect('/books')
    }
}