const { StatusCodes } = require('http-status-codes');
const Beat = require('../models/Beat.model');

module.exports.create = async (req, res, next) => {
  console.log(req.body)
    const { _id, name, price, bpm, key, scale, genre, mood, instrument } = req.body;
    let beat;

    if (req.file) {
      beat = req.file.path;
    }

    Beat.create({ owner: _id, name, price, bpm, key, scale, genre, mood, instrument, beat })
     .then(beatCreate => {
        console.log('ENTRAAAAA')
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

