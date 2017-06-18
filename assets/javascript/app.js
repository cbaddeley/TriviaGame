function questionCreation(name, question, img) {
  this.name = name;
  this.question = question;
  this.img = img;
}

var everglades = new questionCreation("Everglades", "This mangrove and tropical rainforest ecosystem and marine estuary is home to 36 protected species, including the Florida panther, American crocodile, and West Indian manatee.", "assets/images/everglades.jpg");
var smoky = new questionCreation("Great Smoky Mountains", "This park, part of the Appalachian Mountains, spans a wide range of elevations, making it home to over 400 vertebrate species, 100 tree species, and 5000 plant species.", "assets/images/smoky.jpg");
var yellowstone = new questionCreation("Yellowstone", "This park has an expansive network of geothermal areas including boiling mud pots, vividly colored hot springs such as Grand Prismatic Spring, and regularly erupting geysers, the best-known being Old Faithful.", "assets/images/yellowstone.jpg");
var voyageurs = new questionCreation("Voyageurs", "This park protecting four lakes near the Canada–US border is a site for canoeing, kayaking, and fishing. The park also preserves a history populated by Ojibwe Native Americans, French fur traders, and gold miners.", "assets/images/voyageurs.jpg");
var sequoia = new questionCreation("Sequoia", "This park protects the Giant Forest, which boasts some of the world's largest trees, the General Sherman being the largest measured tree in the park.", "assets/images/sequoia.jpg");
var pinnacles = new questionCreation("Pinnacles", "Named for the eroded leftovers of a portion of an extinct volcano, the park's massive black and gold monoliths of andesite and rhyolite are a popular destination for rock climbers.", "assets/images/pinnacles.jpeg");
var mesaVerde = new questionCreation("Mesa Verde", "This area constitutes over 4,000 archaeological sites of the Ancestral Puebloan people, who lived here and elsewhere in the Four Corners region for at least 700 years.", "assets/images/mesaVerde.png");
var katmai = new questionCreation("Katmai", "This park on the Alaska Peninsula protects the Valley of Ten Thousand Smokes, an ash flow formed by the 1912 eruption of Novarupta. Over 2,000 grizzly bears come here each year to catch spawning salmon.", "assets/images/katmai.jpeg");
var deathValley = new questionCreation("Death Valley", "This park is the hottest, lowest, and driest place in the United States. Daytime temperatures have topped 130 °F (54 °C) and it is home to Badwater Basin, the lowest elevation in North America.", "assets/images/deathValley.jpg");
var craterLake = new questionCreation("Crater Lake", "This park lies in the caldera of an ancient volcano called Mount Mazama that collapsed 7,700 years ago. It is the deepest lake in the United States and is noted for its vivid blue color and water clarity.", "assets/images/craterLake.jpg");

var questionArray = [everglades, smoky, yellowstone, voyageurs, sequoia, pinnacles,mesaVerde, katmai, deathValley, craterLake];
var playThrough = [];
var pickedQuestionObject;
var correctAnswers = 0;
var wrongAnswers = 0;
var timedOutAnswers = 0;
var intervalId;
var clockRunning = false;
var timer = {

  time: 30,

  reset: function() {
    timer.time = 30;
    $("#timeRemaining").text("Time Remaining: 30 Seconds");
  },

  start: function() {    
        if (!clockRunning) {
        intervalId = setInterval(timer.count, 1000);
        clockRunning = true;
      }      
  },

  stop: function() {
    clearInterval(intervalId);
    clockRunning = false;  
  },

  count: function() {
    timer.time--;
    if (timer.time === 0) {
      $("#timeRemaining").text("Time's up!");
      timer.stop();
      $("#resultText").text("I'm sorry. You ran out of time. The correct answer is: " + pickedQuestionObject.name);
      timedOutAnswers++;
      if (timedOutAnswers + correctAnswers + wrongAnswers === questionArray.length) {
        setTimeout(endGame,3000);
      } else {
          setTimeout(clearResult, 3000);
          setTimeout(questionCreator, 3000);
          setTimeout(timer.reset, 3000);
          setTimeout(timer.start, 3000);
        }
    } else if (timer.time === 1) {
      $("#timeRemaining").text("Time Remaining: " + timer.time + " Second");
    } else {
    $("#timeRemaining").text("Time Remaining: " + timer.time + " Seconds");
      };
  },
};

function questionCreator() {
  var picked = false;
  while (!picked) {
    var pickedQuestionCounter = 0;
    var pickedQuestionNumber = Math.floor(Math.random() * questionArray.length);
    pickedQuestionObject = questionArray[pickedQuestionNumber];
    for (i = 0; i <= playThrough.length; i++) {
      if (pickedQuestionObject == playThrough[i]) {
        break;
      } else if (pickedQuestionObject !== playThrough[i]) {
        pickedQuestionCounter++;
      }
    }
    if (pickedQuestionCounter >= playThrough.length) {
      generateButtons(pickedQuestionObject);
      generateImg(pickedQuestionObject);
      generateQuestionText(pickedQuestionObject);
      picked = true;
      playThrough.push(pickedQuestionObject);
    }
    if (playThrough.length == questionArray.length) {
      picked = true;
    }
  }
};

function generateImg(question) {
  $("#questionImage").html("<img src='" + question.img + "'>");
};

function generateQuestionText(text) {
  $("#questionText").text(text.question);
};

function generateButtons(question) {
  var answerButton = Math.floor(Math.random() * 4);
  var buttonPlacement = false;
  var buttonArray = [" ", " ", " ", " "];
  var buttonCounter = 0;
  buttonArray[answerButton] = question.name;
  while(!buttonPlacement) {
    var wrongAnswer = Math.floor(Math.random() * questionArray.length);
    var wrongAnswerName = questionArray[wrongAnswer].name;
    for (i = 0; i < buttonArray.length; i++) {
      if (wrongAnswerName === buttonArray[i] || wrongAnswerName === question.name) {
        break;
      } 
      if (buttonArray[i] === " ") {
        buttonArray[i] = wrongAnswerName;
        buttonCounter++;
        break;
      }
    }
    if (buttonCounter === 3) {
      buttonPlacement = true;
    }    
  }
  for (i = 0; i < buttonArray.length; i++) {
    $("button[ref = '" + i + "']").text(buttonArray[i]);
  }
  $("button[ref = '" + answerButton + "']").attr("answer", true);
};

function clearResult() {
  $("#resultText").empty();
  $("button").prop('disabled', false);
  $("button").each(function() {
    $(this).removeAttr('answer');
  });
}

$("#startButton").click(function() {
  $("#startScreen").css("display", "none");
  $("#questions").css("visibility", "visible");
  timer.start();
  questionCreator();
});

$("button[type = 'option'").click(function() {
  timer.stop();
  $("button").prop('disabled', true);
  if (this.getAttribute("answer")) {
    $("#resultText").text("That's correct!!");
    correctAnswers++;
  } else {
    $("#resultText").text("I'm sorry. The correct answer is: " + pickedQuestionObject.name);
    wrongAnswers++;
  }
  if (timedOutAnswers + correctAnswers + wrongAnswers === questionArray.length) {
        setTimeout(endGame, 3000);
     } else {
        setTimeout(clearResult, 3000);
        setTimeout(questionCreator, 3000);
        setTimeout(timer.reset, 3000);
        setTimeout(timer.start, 3000);
      }
});

function endGame() {
  clearResult();
  timer.reset();
  $("#questions").css("visibility", "hidden");
  $("#endScreen").css("display", "block");
  $("#correctAnswers").append(correctAnswers);
  $("#wrongAnswers").append(wrongAnswers);
  $("#timedOutAnswers").append(timedOutAnswers);
};

$("#endButton").click(function() {
  playThrough = [];
  correctAnswers = 0;
  wrongAnswers = 0;
  timedOutAnswers = 0;
  $("#endScreen").css("display", "none");
  $("#questions").css("visibility", "visible");
  timer.start();
  questionCreator();
})