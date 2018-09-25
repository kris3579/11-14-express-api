'use strict';

const uuid = require('uuid/v1');

class Cat {
  constructor(name, color) {
    this.id = uuid();
    this.name = name;
    this.color = color;
  }
}

module.exports = Cat;
