const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { REQUIRED_FIELD, INVALID_EMAIL, INVALID_LENGTH } = require('../config/errorMessages');
const ROUNDS = 10;
const EMAIL_PATTERN =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, REQUIRED_FIELD]
        },
        username: {
            type: String, 
            required: [true, REQUIRED_FIELD]
        },
        email: {
            type: String,
            required: [true, REQUIRED_FIELD],
            match: [EMAIL_PATTERN, INVALID_EMAIL], 
            lowercase: true, 
            unique: true
        },
        password: {
            type: String, 
            required: [true, REQUIRED_FIELD],
            minlength: [8, INVALID_LENGTH]
        },
        image: {
            type: String,
            default: "https://res.cloudinary.com/dgnace8dp/image/upload/v1676728201/profile-default_zk16xw.jpg"
        },
        bio: {
            type: String, 
            minlength: [10, INVALID_LENGTH]
        },
        googleID: {
            type: String,
        }
    },
    {
        timestamps: true, 
        toJSON: {
            virtuals: true, 
            transform: (doc, ret) => {
               delete ret.__v;
               delete ret.__id;
               delete ret.password;
            }
        }
    }
)

UserSchema.virtual("beat", {
    ref: "Beat",
    localField: "_id",
    foreignField: "owner",
    justOne: true,
});

UserSchema.virtual("favorite", {
    ref: "Favorite",
    localField: "_id",
    foreignField: "owner",
    justOne: true,
});

UserSchema.virtual("comment", {
    ref: "Comment",
    localField: "_id",
    foreignField: "owner",
    justOne: true,
});

UserSchema.pre('save', function(next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, ROUNDS)
        .then(hash => {
            this.password = hash
            next()
        })
        .catch(next)
    } else {
        next()
    }
})

UserSchema.methods.checkPassword = function(passwordToCompare) {
    return bcrypt.compare(passwordToCompare, this.password);
}

const User = mongoose.model('User', UserSchema);

module.exports = User;