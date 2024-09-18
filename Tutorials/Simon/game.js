var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// Empieza el juego 
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Nivel " + level);
    nextSequence();
    started = true;
  }
});

// Registra el color que el usuario elige
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// Verifica el patrón 
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    gameOver();
  }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Nivel " + level);

  var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100); // blinking
  playSound(randomChosenColour);
}

//sonidos de acuerdo al color
function playSound(colour) {
  var audio = new Audio("Sounds/" + colour + ".mp3");
  audio.play();
}

// Anima el botón presionado
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function gameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Fin del juego. Presiona cualquier tecla para reiniciar.");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);

  startOver();
}

// Reinicia el juego
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
