var express = require('express');
var router = express.Router();
var config = require('../config/settings.json');
var questions = require('../lib/questions.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: config.quiz_name
  });
});

router.get('/getquestions', function(req, res, next){
	questions.selectQuestions(config.questions_to_serve, function(questionsSelected){
		res.json(questionsSelected);
	});
});

module.exports = router;
