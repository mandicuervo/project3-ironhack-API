const mongoose = require('mongoose');
const { REQUIRED_FIELD } = require('../config/errorMessages');


const ReviewSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    beat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Beat'
    },
    comment: {
        type: String,
        required: [true, 'Comment what you think about this beat'],
        minLength: [3, 'The comment must have at least 3 characters'],
        required: [true, REQUIRED_FIELD]
    }
  },
  {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret.__v;
            delete ret._id;
            delete ret.password;

            return ret
        }
    }
  }
);

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
