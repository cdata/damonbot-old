/* 
	Get weather info using Google's (un-official) Weather API 
	http://blog.programmableweb.com/2010/02/08/googles-secret-weather-api/
*/

var http 	= require('http'),
	url		= require('url')
	xml2js	= require('xml2js');


/*
	Fetch the weather data using Google's API, parse the XML extract the 
	required values and store in an object.
*/ 

exports.get_weather_data = function(location, callback) {
	
	if (typeof(location) == "undefined" || location === "") {
		location = 94107;
	}
	
	var google_weather_base_url = "http://www.google.com/ig/api?weather=";
	
	var google_weather_url = url.parse(google_weather_base_url + encodeURIComponent(location));
	
	http.get(
		{
			host: google_weather_url.host,
			port: google_weather_url.port,
			path: google_weather_url.pathname + google_weather_url.search
		}, function(response) {
			var result = '';
			response.on('data', function(data) { 
				result += data;
			});
			response.on('end', function() {
				// parse the XML response and extract useful data
				try {
					var parser = new xml2js.Parser();
					parser.on('end', function(parsed_xml) {
						weather_data = new Object();
						weather_data.temp_f = parsed_xml["weather"]["current_conditions"]["temp_f"]["@"]["data"];
						weather_data.temp_f = parseInt(weather_data.temp_f, 10);
						weather_data.condition = parsed_xml["weather"]["current_conditions"]["condition"]["@"]["data"];
						weather_data.current_conditions = parsed_xml["weather"]["current_conditions"];
						callback(weather_data);
					});
					parser.parseString(result);
				} catch(error) {
					console.log("Error parsing/extracting weather data from response - " + result);
					callback(false);
				}
				
			});
		}).on('error', function() {
			console.log("HTTP request to Google Weather API failed");
			callback(false);
		});
	
}