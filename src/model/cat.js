'use strict';

const mongoose = require('mongoose');
const HttpError = require('http-errors');
const Clowder = require('./clowder');

const catSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: () => new Date(),
  },
  clowder: // fix one to many
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'clowder',
    },
});

function catPreHook(done) {
  return Clowder.findById(this.clowder)
    .then((clowderFound) => {
      if (!clowderFound) {
        throw new HttpError(404, 'Clowder not found');
      }
      clowderFound.cats.push(this._id);
      return clowderFound.save();
    })
    .then(() => {
      return done();
    })
    .catch((error) => {
      done(error);
    });
}

const catPostHook = (document, done) => {
  return Clowder.findById(document.clowder)
    .then((clowderFound) => {
      if (!clowderFound) {
        throw new HttpError(500, 'Clowder not found');
      }
      clowderFound.clowder = clowderFound.clowder.filter((cat) => {
        return cat._id.toString() !== document._id.toString();
      });
      return clowderFound.save();
    })
    .then(() => done())
    .catch(done);
};

catSchema.pre('save', catPreHook());
catSchema.post('remove', catPostHook());

module.exports = mongoose.model('cat', catSchema);
