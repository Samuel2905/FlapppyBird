// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);
var score=0;
var labelScore;
var player;
var pipes = [];
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
game.load.image("playerImg", "../assets/flappy.png");
game.load.audio("score", "../assets/point.ogg");
game.load.image("pipeBlock","../assets/pipe2-body.png");
game.load.image("pipeEnd","../assets/pipe2-end.png");
}

/*
 * Initialises the gam  e. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor("#0086b3");
    game.add.text(40, 360, "Welcome to flappy bird", {font: "30px Arial ", fill: "#009900"});
    player = game.add.sprite(300, 200, "playerImg");
    player.width=player.width*0.8;
    player.height=player.height*0.8;
  /*  game.add.sprite(10, 270, "playerImg");
    game.input.onDown.add(clickHandler);
    game.input
    .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    .onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    .onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    .onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP)
    .onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    .onDown.add(moveDown);*/
    labelScore = game.add.text(20, 20, "0");
    generatePipe();
    game.physics.startSystem(Phaser.Physics.NINJA);
    game.physics.arcade.enable(player);
    //player.body.velocity.x = 100;
    player.body.velocity.y = -100;
    player.body.gravity.y = 600;
    game.input.keyboard
.addKey(Phaser.Keyboard.SPACEBAR)
.onDown
.add(playerJump);
var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(
pipeInterval,
generatePipe
);
game.input.keyboard
.addKey(Phaser.Keyboard.P)
.onDown
.add(pause);
game.input.keyboard
.addKey(Phaser.Keyboard.O)
.onDown
.add(unpause);
player.anchor.setTo(0.5, 0.5);
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
  game.physics.arcade.overlap(
  player,
  pipes,
  gameOver);
  if (player.y>360 || player.y<-4){
    gameOver();
  }
  player.rotation = Math.atan(player.body.velocity.y / 200);
}
/*function clickHandler(event) {
  game.add.sprite(event.x, event.y, "playerImg");
}*/
function spaceHandler() {
  game.sound.play("score");
}
function changeScore() {
  score++;
  labelScore.setText(score.toString());
}
/*function moveRight() {
player.x +=5;
}
function moveLeft() {
player.x -= 5;
}
function moveUp() {
player.y -=5;
}
function moveDown() {
player.y += 5;
}*/
function generatePipe() {
  var gapStart = game.rnd.integerInRange(1, 5);
  changeScore();
  for (var count=0; count<8; count++) {
    if(count != gapStart && count != gapStart + 1) {
      addPipeBlock(750, count*50);
    }
    if(count==gapStart) {
      var tEnd=game.add.sprite(748,count*50,"pipeEnd");
      pipes.push(tEnd);
      game.physics.arcade.enable(tEnd);
      tEnd.body.velocity.x = -200;
      var bEnd=game.add.sprite(748,count*50+88,"pipeEnd");
      pipes.push(bEnd);
      game.physics.arcade.enable(bEnd);
      bEnd.body.velocity.x = -200;
    }
      }
  //for (var count=2; count<10; count+=2) {
//  game.add.sprite(count * 50, 200, "pipeBlock");
  //}
}
function addPipeBlock(x, y) {
var block = game.add.sprite(x,y,"pipeBlock");
pipes.push(block);
game.physics.arcade.enable(block);
block.body.velocity.x = -200;
}
function playerJump() {
player.body.velocity.y = -200;
}
function gameOver(){
  registerScore(score);
  //game.destroy();
  // location.reload();
  game.state.restart();
  score=0;
}
function pause() {
  game.paused=true;
}
function unpause() {
  game.paused=false;
}
