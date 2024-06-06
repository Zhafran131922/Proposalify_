const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    proposal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proposal', 
        required: true
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
