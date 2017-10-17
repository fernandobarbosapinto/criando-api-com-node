var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET all customer */
router.get('/customers', function(req, res, next){
	var db = require('../db');
	var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
	Customer.find({}).lean().exec(function(e,docs){
		res.json(docs);
		res.end();
	});
});

/* GET one customer */
router.get('/customers/:id', function(req, res, next){
	var db = require('../db');
	var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
	Customer.find({ _id: req.params.id }).lean().exec(function(e, docs){
		res.json(docs);
		res.end();
	});
});

/* POST one customer */
router.post('/customers', function(req, res, next){
	var db = require('../db');
	var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
	var newCustomer = new Customer({ name: req.body.name, email: req.body.email });
	newCustomer.save(function(err){
		if(err){
			res.status(500).json({ error: err.message });
			res.end();
			return;
		}
		res.json(newCustomer);
		res.end();
	});
});

/* PUT one customer */
router.put('/customers/:id', function(req, res, next){
	var db = require('../db');
	var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
	Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function(err, doc){
		if(err){
			res.status(500).json({ error: err.message });
			res.end();
			return;
		}
		res.json(req.body);
		res.end();
	});
});

/* DELETE one customer */
router.delete('/customers/:id', function(req, res, next){
	var db = require('../db');
	var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
	Customer.find({ _id: req.params.id }).remove(function(err){
		if(err){
			res.status(500).json({ error: err.message });
			res.end();
			return;
		}
		res.json({ success: true });
		res.end();
	});
});

module.exports = router;
