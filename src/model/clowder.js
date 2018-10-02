'use strict';

const mongoose = require('mongoose');

const clowderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  timeStamp: {
    type: Date,
    default: () => new Date(),
  },
  cats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cat',
    },
  ],
},
{
  usePushEach: true,
});

module.exports = mongoose.model('clowder', clowderSchema);
