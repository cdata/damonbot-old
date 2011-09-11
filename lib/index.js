var multibot = require('multibot'),
    damon = require('./damon');

exports = module.exports = multibot(
    damon.weather,
    damon.food,
    damon.basic
);
