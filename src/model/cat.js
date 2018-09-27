'use strict';

const mongoose = require('mongoose');

// const uuid = require('uuid/v1');
//
// class Cat {
//   constructor(name, color) {
//     this.id = uuid();
//     this.name = name;
//     this.color = color;
//   }
// }

const catSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('cat', catSchema);
