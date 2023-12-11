const Book = require('../models/books')

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const foundBook = await Book.findById(id).populate('owner');
    if (!foundBook.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/books/${id}`);
    }
    next();
}