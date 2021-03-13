
var userClickedPattern=[];
var buttonColours = ["red", "blue", "green", "yellow"];
var level =0;
var gamePattern = [];

function nextSequence() {
  userClickedPattern = []
  level++
  $("h1").text("level" + " " + level)
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  //Add a class and then remove it after 100ms for clicking animation
  $("#"+ currentColor).click(function(){
 $("#"+ currentColor).addClass("pressed");
 setTimeout(function() {
    $("#"+ currentColor).removeClass("pressed")
 }, 100);
});
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      $("body").addClass("game-over");
      setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);

    playSound("wrong")

    $("h1").text("Game Over, Press Enter")
    
    }

}

//Detecs when the ENTER is pressed, Trigger the nextSeuqunce function and change the h1 to "level"
function startOver() {

  $(document).on('keypress',function(e) {
      if(e.which == 13) {
          $("h1").text("level" + " " + level);
          level=0;
          userClickedPattern=[];
          gamePattern = [];

          nextSequence();
      }
  });
}

 $(".btn").click(function() {
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor)
    animatePress(userChosenColor)

    checkAnswer(userClickedPattern.length-1)
  });

$("h1").text("Press Enter!!!!!");
startOver()
