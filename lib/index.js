var multibot = require('multibot'),
    damon = require('./damon');

exports = module.exports = multibot(
    damon.food(),
    damon.basic()
);
