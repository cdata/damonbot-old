var weather = require('../augmentation/weather')

module.exports = exports = function() {

    return function(message, next) {
		
		if (message.data.body.match(/damon\s*bot/i)) {
			if (message.data.body.match(/cold\soutside/i)) {
				var date = new Date();
				date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
				var hour = date.getHours();
				if (hour > 20 || hour < 6) {
					message.respond("Seriously " + message.data.sender.name.split(" ")[0] + "? " + 
					"Has it ever been not cold this time of the day?");
				}
				weather.get_weather_data(94107, function(weather_data) {
					if (weather_data.temp_f <= 60) {
						message.respond("Yes, it's " + weather_data.temp_f + "\u00B0 outside");
					} else if (weather_data.temp_f > 60 && weather_data.temp_f < 65) {
						message.respond("I don't know, you decide, it's " + weather_data.temp_f + "\u00B0 but " 
						+ weather_data.condition.toLowerCase());
					} else if (weather_data.temp_f >= 65 && weather_data.temp_f < 72) {
						message.respond("It's nice outside, " + weather_data.temp_f + "\u00B0 if you care about the number");
					} else if (weather_data.temp_f >= 72) {
						message.respond("Holy cow! It's " + weather_data.temp_f + "\u00B0 in San Francisco. Global Warming!");
					}
				});
			} else if (message.data.body.match(/weather/i)) {
				weather.get_weather_data(94107, function(weather_data) {
					message.respond("It's " + weather_data.temp_f + "\u00B0 and " + weather_data.condition.toLowerCase());
				});				
			} else {
				next();
			}
		} else {
			next();
		}
	}
}