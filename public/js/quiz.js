$(function(){
	//Options
	var quizClass = ".quiz-window";

	var questionIndex = {};

	var totalQuestions = 0;
	var currentQuestion = 0;
	var expectedAnswer = "";

	var recordedAnswers = {};

	function setNextQuestion(){
		var numberOfAnswers = Object.keys(questionIndex[currentQuestion].answers).length;

		$(quizClass + " .quiz-question .question-title").html(questionIndex[currentQuestion].title);
		$(quizClass + " .quiz-question .question-fulltext").html(questionIndex[currentQuestion].desc);
		$(quizClass + " .quiz-answers").empty();

		for (i = 0; i < numberOfAnswers; i++){ 
			console.log('ran');
		    $(quizClass + " .quiz-answers").append("<li>" + questionIndex[currentQuestion].answers[i] + "</li>");
		}

		expectedAnswer = questionIndex[currentQuestion].correct_answer
		currentQuestion++;
	}

	// Handle answer submission
	$(".quiz-answers").on("click", "li", function(){
		var answer = $(this).html();

		if(expectedAnswer == answer){
			recordedAnswers[currentQuestion - 1] = {
				"question_number": currentQuestion - 1,
				"recorded_answer": answer,
				"correct_answer": expectedAnswer,
				"correct": "yes"
			};
		}
		else{
			recordedAnswers[currentQuestion - 1] = {
				"question_number": currentQuestion - 1,
				"recorded_answer": answer,
				"correct_answer": expectedAnswer,
				"correct": "no"
			};
		}

		if(currentQuestion >= totalQuestions){
			console.log(recordedAnswers);
			fadeOutQuizWindowSuccess(300, function(){
				showQuizSuccessWindow();
			});
		}
		else{
			fadeOutQuizWindowNextQuestion(300);
			fadeInQuizWindow(300);
		}
		
				
	});

	//UI Functions
	function hideQuizWindow(){
		$(quizClass).hide();
	}

	function fadeInQuizWindow(duration){
		$(quizClass).fadeIn(duration);
	}

	function fadeOutQuizWindowNextQuestion(duration){
		$(quizClass).fadeOut(duration, setNextQuestion);
	}

	function fadeOutQuizWindow(duration){
		$(quizClass).fadeOut(duration, hideQuizWindow);
	}

	function fadeOutQuizWindowSuccess(duration, next){
		$(quizClass).fadeOut(duration, next);
	}

	function showQuizSuccessWindow(){
		var answerCount = Object.keys(recordedAnswers).length;
		var correctAnswerCount = 0;

		for (var i = 0; i < answerCount; i++) {
			if(recordedAnswers[i].correct == "yes"){
				correctAnswerCount++;
			}
		};

		$(".quiz-success-score-display").html("You recieved a score of <b>" + correctAnswerCount + "/" + answerCount);

		//Success
		$(".quiz-success").css("visibility", "visible");
		$(".quiz-success").fadeIn(300);
	}

	function init(){
		$(".quiz-success").hide();
		totalQuestions = Object.keys(questionIndex).length;
		setNextQuestion();
	}

	//RUN ON STARTUP
	$.ajax({
		  url: window.location.href + 'getquestions',
		  dataType: 'json',
		})
		.done(function(data) {
		  questionIndex = data;
		  console.log(questionIndex);
		  init();
		})
		.fail(function() {
		  alert("Ajax failed to fetch data")
	})		
});