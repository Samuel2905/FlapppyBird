var highScores= [];
//var playerName = prompt("What's your name?");
//var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";

jQuery("#credits").on("click", function() {
var message = "Game created by Samuel!";
jQuery("#credits").append(
"<p>" + message + "</p>"
);
});

jQuery("#scoresbtn").on("click", function() {
var message = "The highest scorers are:";
//var first = "Me: 8";
//var second = "Myself: 8";
//var third = "Me again (I'm the best): 8";
jQuery("#content").empty();
jQuery("#content").append(
"<p>" + message + "</p>"
//+ "<ul>" + "<li class=gold>" +
//first + "</li>" + "<li class=silver>" +
//second + "</li>" + "<li class=bronze>" +
//third + "</li>"
+ "<ul>" + highScores + "</ul>"
);
});

jQuery("#creditsbtn").on("click", function() {
var message = "Game created by Samuel";
jQuery("#content").empty();
jQuery("#content").append(
"<p>" + message + "</p>"
);
});

jQuery("#helpbtn").on("click", function() {
var message = "How to play:";
var first = "Press SPACE to flap your wings";
var second = "Avoid the pipes";
var third = "If you crash, just restart";
var fourth = "Have fun!";
jQuery("#content").empty();
jQuery("#content").append(
"<p>" + message + "</p>" + "<ul>" + "<li>" +
first + "</li>" + "<li>" +
second + "</li>" + "<li>" +
third + "</li>" + "<li>" +
fourth + "</li>"  + "</ul>"
);
});

jQuery("#sharing").on("click", function(){
var text =
"I scored " +
score.toString() +
" in Flappy Birdy! Can you do better?";
var escapedText = encodeURIComponent(text);
var url =
"https:twitter.com/share?text=" +
escapedText
jQuery("#sharing").attr("href", url);
});


function registerScore (score) {
  if (score>2) {
  var playerName = prompt("What's your name?");
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
  highScores.push(scoreEntry);
}
}
