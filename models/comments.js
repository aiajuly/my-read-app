const mongoose = require('mongoose'); 


const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Comment can't be blank."]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Comment', commentSchema)