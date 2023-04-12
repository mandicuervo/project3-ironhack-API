const { StatusCodes } = require('http-status-codes');
const Beat = require('../models/Beat.model');

module.exports.create = async (req, res, next) => {
  console.log(req.file)
    let { _id, name, price, bpm, key, scale, genre, mood, instrument } = req.body;
    let beat;

    if (req.file) {
      beat = req.file.path;
    }

    if(price) {
      price = Number(price).toFixed(2);
    }

    Beat.create({ owner: _id, name, price, bpm, key, scale, genre, mood, instrument, beat })
     .then(beatCreate => {
        res.status(StatusCodes.CREATED).json(beatCreate)
      })
     .catch(next)
}

module.exports.list = async (req, res, next) => {
  const id = req.params.userId

  Beat.find({ owner: id })
  .then(beats => res.status(StatusCodes.OK).json(beats))
  .catch(next)
}

module.exports.getOneBeat = async (req, res, next) => {
  const id = req.params.beatId

  Beat.findById(id)
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

  console.log(editBeat)
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
