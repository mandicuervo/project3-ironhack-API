const { StatusCodes } = require('http-status-codes');
const Beat = require('../models/Beat.model');
const User = require('../models/User.model');

module.exports.create = async (req, res, next) => {
    let { _id, name, price, bpm, key, scale, genre, mood, instrument, tags } = req.body;
    let beat;

    if (req.file) {
      beat = req.file.path;
    }

    if(price) {
      price = Number(price).toFixed(2);
    }

    Beat.create({ owner: _id, name, price, bpm, key, scale, genre, mood, instrument, beat, tags })
     .then(beatCreate => {
        res.status(StatusCodes.CREATED).json(beatCreate)
      })
     .catch(next)
}

module.exports.list = async (req, res, next) => {
  const id = req.params.userId

  Beat.find({ owner: id })
  .populate('owner')
  .then(beats => res.status(StatusCodes.OK).json(beats))
  .catch(next)
}

module.exports.getOneBeat = async (req, res, next) => {
  const id = req.params.beatId

  Beat.findById(id)
  .populate('owner')
  .then(beat => res.status(StatusCodes.OK).json(beat))
  .catch(next)
}

module.exports.editBeat = (req, res, next) => {
  const { id } = req.params;
  const editBeat = {
    ...req.body,
  };

  if (req.file) {
    editBeat.image = req.file.path;
  }

  Beat.findByIdAndUpdate(id, editBeat)
  .then(beat => res.status(StatusCodes.OK).json(beat))
  .catch(next)
}

module.exports.deleteBeat = (req, res, next) => {
  const { id } = req.params;

  Beat.findByIdAndDelete(id)
  .then(beat => res.status(StatusCodes.OK).json(beat))
  .catch(next)
}

module.exports.addCountPlayer = (req, res, next) => {
  const {id} = req.params

  Beat.findById(id)
  .then(beat => {
    let sum = beat.playingCount + 1;
    beat.playingCount = sum;
    beat.save()
  })
  .catch(next)
}

module.exports.beatsFromUser = (req, res, next) => {
  const {id} = req.params

  Beat.find({user: id})
  .then(beatsList => res.json(beatsList))
  .catch(next)

}

module.exports.getTopBeats = (req, res, next) => {  
  Beat.find().sort({playingCount: -1}).limit(10)
  .then(list => res.json(list))
  .catch(next)
}

module.exports.resultsFromSearch = (req, res, next) => {
  const { searchText } = req.params;
  
  Beat.find({ tags: {"$regex":`^${searchText}*`}})
  .populate('owner')
  .then(beats => {
    User.find({ username: {"$regex":`^${searchText}*`}})
    .then(users => {
      let infoToSend = {
        beats,
        users
      }
      res.json(infoToSend)
    })
  })
  .catch(err => console.log(err))
}