var questions = require("../config/questions.json");

var selectQuestions = function (howMany, callback){
	var questionsSelected = {};

	getQuestionArray(howMany, function(chosenQuestions){
		for (var i = 0; i < chosenQuestions.length; i++) {
			questionsSelected[i] = questions.questions[chosenQuestions[i]];
		};
		callback(questionsSelected);
	});
}

function countQuestions(){
	return Object.keys(questions.questions).length;
}

function getQuestionArray(howMany, callback){
	var numberOfQuestions = countQuestions();
	var chosenQuestions = [];

	for (var i = 0; i < numberOfQuestions; i++) {
		chosenQuestions.push(i);
	};

	shuffle(chosenQuestions);

	if(howMany >= numberOfQuestions){
		var slicedArray = chosenQuestions;
	}
	else{
		var slicedArray = chosenQuestions.slice(0, howMany - 1);
	}

	callback(slicedArray);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports.selectQuestions = selectQuestions;