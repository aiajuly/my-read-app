const Comment = require('../models/comments');


module.exports = async (req, res, next) => {
    const { id, commentId } = req.params;
    const foundComment = await Comment.findById(commentId).populate('owner');
    console.log(foundComment)
    if (!foundComment.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/books/${id}`);
    }
    next();
}