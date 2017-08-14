var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/loginapp');

var products = [
	new Product({
	imagePath: 'https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-12561-1lz3hha_fbe70d3f.jpeg',
	title: 'Lion King',
	description: 'Animation',
	price: 2.5
	}),
	new Product({
	imagePath: 'https://pbs.twimg.com/profile_images/751078072795820032/tC97fYE_.jpg',
	title: 'The Jungle Book',
	description: 'Animation',
	price: 2.5
	}),
	new Product({
	imagePath: 'https://images-na.ssl-images-amazon.com/images/I/514MTC2D1EL.jpg',
	title: 'Spy Kid',
	description: 'Comedy/Action',
	price: 3.5
	}),
	new Product({
	imagePath: 'https://d2kmm3vx031a1h.cloudfront.net/XCgjOTFQR866Jtx3ocuL_amazing-spider-man-movie-poster.jpg',
	title: 'Spider Man',
	description: 'Action',
	price: 3.0
	}),
	new Product({
	imagePath: 'https://static.comicvine.com/uploads/original/7/72524/4831042-6144255889-man-o.jpg',
	title: 'Man Of Steel',
	description: 'Action',
	price: 2.0
	}),
	new Product({
	imagePath: 'https://cdn.pastemagazine.com/www/articles/nyc_comedy_square.jpg',
	title: 'Live Mic Comedy',
	description: 'Comedy',
	price: 5.0
	})
];

var done = 0;
for (var i = 0; i < products.length; i++) {
	products[i].save(function(err, result) {
		done++;
		if (done === products.length) {
			exit();
		}
	});
}

function exit() {
	mongoose.disconnect();
}