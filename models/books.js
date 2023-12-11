const mongoose = require('mongoose');
const Comment = require('./comments')



const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, "Name can't be blank"]
    },
    author: {
        type: String,
        required: [true, "Author can't be blank"]
    },
    imageUrl: {
        type: String,
        required: [true, "Image URL can't be blank"]
    },
    description: {
        type: String,
        required: [true, "Description can't be blank"],
        min: 120
    },
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: Comment
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});


const Book = mongoose.model('Book', bookSchema);


module.exports = Book;