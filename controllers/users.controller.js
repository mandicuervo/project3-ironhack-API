const User = require('../models/User.model');
const createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');

module.exports.create = (req, res, next) => {
    const { name, username, email, password } = req.body.userInfo;

    User.findOne({ email })
      .then(user => {
        if(user) {
          next(createError(StatusCodes.CONFLICT, 'This email is already registered'))
        } else {
          return User.findOne({ username }) 
        }
      })
      .then(user => {
        if(user) {
          next(createError(StatusCodes.CONFLICT, 'This username is already in use, try another one'))
        } else {
          return User.create({ name, username, email, password})
        }
      })
      .then(userCreated => {
         res.status(StatusCodes.CREATED).json(userCreated);
      })
      .catch(next)
}

module.exports.edit = (req, res, next) => {
    const { _id, name, bio, username } = req.body;
    let image;

    if (req.file) {
      image = req.file.path;
    }
    
    User.findByIdAndUpdate(_id, { name, bio, image, username})
    .then((edited) => {
      res.status(StatusCodes.CREATED).json(edited);
    })
    .catch(next)
}

module.exports.list = (req, res, next) => {
    User.find()
    .then(users => res.json(users))
    .catch(next)
}

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUserId)
    .then(user => {
      if (!user) {
        next(createError(StatusCodes.NOT_FOUND, 'User not found'))
      } else {
        res.json(user);
      }
    })
    .catch(next)
}

module.exports.getUserByUsername = (req, res, next) => {
  const { username } = req.params;

  User.findOne({username})
  .then(user => res.json(user))
  .catch(next)
}