const { StatusCodes } = require('http-status-codes');
const Comment = require('../models/Comment.model');
const Favorite = require('../models/Favorite.model');
const Beat = require('../models/Beat.model');

module.exports.createComment = (req, res, next) => {
    const beatId = req.params.id;
    const { comment, currentUserId } = req.body;
    
    Comment.create({beat: beatId, user: currentUserId, comment})
    .then((created) => {
        res.status(StatusCodes.CREATED).json(created);
    })
    .catch(next)
}

module.exports.getBeatComments = (req, res, next) => {
    const beatId = req.params.id;
    
    Comment.find({beat: beatId})
    .populate('user')
    .then((comments) => {
        res.status(StatusCodes.OK).json(comments);
    })
    .catch(next)
}

module.exports.deleteComment = (req, res, next) => {
    const commentId = req.params.id;
    
    Comment.findByIdAndDelete(commentId)
    .then((deleted) => {
        res.status(StatusCodes.OK).json(deleted);
    })
    .catch(next)
}

module.exports.toggleFavorite = (req, res, next) => {
    const beatId = req.params.id;
    const { currentUserId } = req.body;

    Favorite.findOne({$and: [{ beat: beatId }, { user: currentUserId }] })
    .then((found) => {
        if(found) {
            Favorite.findByIdAndDelete(found.id)
            .then(deleted => {
                res.send(StatusCodes.OK)
                Beat.findById(beatId)
                .then(beatFound => {
                    let sum = beatFound.favoriteCount - 1;
                    beatFound.favoriteCount = sum;
                    beatFound.save()
                })
                .catch(next)
            })
            .catch(next)
        } else {
            Favorite.create({ user: currentUserId, beat: beatId })
            .then(created => {
                res.send(StatusCodes.CREATED)
                Beat.findById(beatId)
                .then(beatFound => {
                    let sum = beatFound.favoriteCount + 1;
                    beatFound.favoriteCount = sum;
                    beatFound.save()
                })
                .catch(next)
            })
            .catch(next)
        }
    })
    .catch(next)
}

module.exports.getIsFavorited = (req, res, next) => {
    const { id } = req.params;
    const { currentUserId } = req.body;
    
    Favorite.findOne({$and: [{ beat: id }, { user: currentUserId }] })
    .then((found) => {
        res.status(StatusCodes.OK).json(found);
    })
    .catch(next)
}