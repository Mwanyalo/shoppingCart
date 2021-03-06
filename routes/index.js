var express = require('express');
var router = express.Router();
var Cart = require('../models/cart')

var Product = require('../models/product');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res, next){
	Product.find(function(err, docs) {
			var productChunks = [];
			var chunkSize = 3;
			for (var i = 0; i < docs.length; i += chunkSize) {
			productChunks.push(docs.slice(i, i + chunkSize));
		}
		res.render('index', { title: 'MaxHD Movies', products: productChunks});// show the index file
});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else{
		//req.flash('error_msg', 'You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/add-to-cart/:id', function(req, res, next){
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	
	Product.findById(productId, function(err, product) {
		if (err) {
			return res.redirect('/');
		}
		cart.add(product, product.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/');
	});
});

router.get('/shopping-cart', function(req, res, next){
		if(!req.session.cart) {
			return res.render('shopping-cart', {products: null});
		}
		 var cart = new Cart(req.session.cart);
		 res.render('shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', function(req, res, next){
	if(!req.session.cart) {
			return res.redirect('/views/shopping-cart');
		}
		var cart = new Cart(req.session.cart);
		res.render('checkout', {total: cart.totalPrice});
});

module.exports = router;
  