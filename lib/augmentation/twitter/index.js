var http = require('http'),
    url = require('url');

function request(fullUrl, callback) {

    var urlParts = url.parse(fullUrl);

    http.get(
        {
            host: urlParts.hostname,
            port: urlParts.port,
            path: urlParts.pathname + (urlParts.search || '')
        },
        function(response) {

            var result = '';

            response.setEncoding('utf8');
            response.on('data', function(data) { result += data; });
            response.on('end', function() {
                
                try {
                    result = JSON.parse(result);
                    callback(0, result);
                } catch(e) {
                    callback(e);
                }
            });
        }
    ).on('error', callback);
}

exports.getUserTimeline = function(user, callback) {

    request('http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + user, callback);
}

