var vm = require('vm');

exports = module.exports = function(damonbot) {

    damonbot.api = damonbot.api || {};

    return function(message, next) {

        var commandChecker = /^damonbot.([a-zA-Z]*)\((.*)\);/;

        if(commandChecker.test(message.body))
            vm.runInNewContext(message.body, damonbot.api);
        else
            next();
    };
};
