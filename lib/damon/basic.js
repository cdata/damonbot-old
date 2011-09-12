module.exports = exports = function(damonbot) {

    var funny = [
            'Chris is infesting something. It might be my brain.',
            'Watch out or I\'ll be evil and include a hashtag.',
            'Tremble before Darth Damon (bot)!',
            'This isn\'t the first time people have treated me like a bot..'
        ],
        general = [
            'People get on my nerves sometimes.',
            'I\'d love to talk but.. oh, look! A customer support request! brb.',
            '$1, I wish I had a nickle for every time I\'ve heard that one.'
        ];

    return function(message, next) {

        if(message.data.chat.private || message.data.body.match(/^damon\s*bot/i)) {

            var concluded = false;

            if(message.data.body.indexOf('joke') !== -1 || message.data.body.indexOf('funny') !== -1) {
                message.respond(funny[Math.floor(Math.random() * funny.length)]);
                concluded = true;
            }

            if(!concluded) {
                if(message.data.body.indexOf('?') !== -1)
                    message.respond("Sorry, " + message.data.sender.name + ", but I'm not smart enough to know how to help you yet. Help make me smarter by forking me at http://github.com/cdata/damonbot!");
                else
                    message.respond(general[Math.floor(Math.random() * general.length)].replace('$1', message.data.sender.name));
            }
        }
    }
}
