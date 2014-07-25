var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/:destination?', function(req, res) {
	console.log(req.params);
	var dest = req.params.destination || 'seville';
	if (dest === 'next') {

		url = 'http://localhost:5893/' + req.query.location;

	    // The structure of our request call
	    // The first parameter is our URL
	    // The callback function takes 3 parameters, an error, response status code and the html

		request(url, function(error, response, html){

	        // First we'll check to make sure no errors occurred when making the request

	        if(!error){
	            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
	            var $ = cheerio.load(html);


	            var currentNext = {
	            	location: req.query.location,
	            	nextLocation: $('a').attr('href').split('/').join('')
	            }
	            res.send(JSON.stringify(currentNext));
			}
		});

	}else if (dest === 'favicon.ico') { 
	}else{
		res.render(dest.toLowerCase(), {
			dest: dest
		}, function(err, html){
			if (err) {
				res.render('error', {
					dest: dest
				});
			}else{
				res.end(html);
			}
		});
	}
});

var server = app.listen(5893, function() {
	console.log('Express server listening on port ' + server.address().port);
});
