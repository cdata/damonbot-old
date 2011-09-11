var twitter = require('../augmentation/twitter');

module.exports = exports = function(damonbot) {

    return function(message, next) {

        if(message.data.body.match(/food\s*truck/i)) {

            twitter.getUserTimeline(
                "TheLunchBoxSF",
                function(error, timeline) {

                    if(error || !timeline.length) {

                        next();

                    } else {

                        message.respond("This is what's cookin' at the The Lunch Box today (via Twitter): " + timeline[0].text);
                    }
                }
            );
        } else if(message.data.body.match(/lunch/i) && 
                 (message.data.body.length < 12 || message.data.body.match(/damon\s*bot/i))) {

            message.respond("Burritos!");
        } else if(message.data.body.match(/burrito/i) && message.data.body.match(/damon\s*bot/i)) {

            message.respond("I love burritos!!");
        } else
            next();
    }
}
