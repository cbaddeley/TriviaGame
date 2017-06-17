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
    if (timer.time < 0) {
      timer.stop;
    } else if (timer.time === 1) {
      $("#timeRemaining").text("Time Remaining: " + timer.time + " Second");
    } else {
    $("#timeRemaining").text("Time Remaining: " + timer.time + " Seconds");
      };
  },
};

$("#startButton").click(function() {
  $("#startScreen").css("display", "none");
  $("#questions").css("visibility", "visible");
});

var pickedQuestion = Math.floor(Math.random() * questionArray.length);
var pickedQuestionButton = Math.floor

$("#buttonAnswerOne").html(katmai.name);
$("#questionImage").html("<img src='" + everglades.img + "'>");
$("#questionText").text(katmai.question);



