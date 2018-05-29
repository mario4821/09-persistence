'use strict';

const uuid = require('uuid');
const logger = require('../lib/logger');

module.exports = class {
  constructor(title, content) {
    if (!title || !content) throw new Error('POST request requires title and content');
    this.title = title;
    this.content = content;
    this.id = uuid();
    logger.log(logger.INFO, `DRAGON: Created a new dragon: ${JSON.stringify(this)}`);
  }
};

