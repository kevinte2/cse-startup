var ballImg;
var leftPaddlesImg;

var leftPaddleX;
var leftPaddleY;
var rightPaddleX;
var rightPaddleY;
var ballX;
var ballY;

var bounceCount;
var highScore = 0;

var ballXDirection;
var ballYDirection;
var ballXSpeed;
var ballYSpeed;
var angle;

var restartButton;
var controlToggle = 1; // 1 is mouse, 2 is keyboard
var keyboardToggle;
var mouseToggle;
var gameOn;
var buttonShow;

function preload() {
  ballImg = loadImage("assets/ball.png");
  leftPaddlesImg = loadImage("assets/paddles.png");
  rightPaddlesImg = loadImage("assets/paddles.png");
}

function setup() {
  createCanvas(500, 500);
  
  // Starting position of objects
  ballX = 250;
  ballY = 250;
  leftPaddleX = 0;
  leftPaddleY = 250;
  rightPaddleX = 500-20;
  rightPaddleY = 250;
  
  ballXSpeed = 6;
  ballYSpeed = 5;
  bounceCount = 0;
  
  ballXDirection = 1;
  ballYDirection = -1;
  
  removeElements();
  gameOn = 1; // 1 is on, 0 is off
}

function draw() {
  background(255);
  
  imageLoad();
  controls();
  paddleBoundary();
  moveBall();
  displayBounces();
  displayToggle()
  collision();
  displayHighScore();
} 

function imageLoad() {
  image(ballImg, ballX, ballY);
  image(leftPaddlesImg, leftPaddleX, leftPaddleY);
  image(rightPaddlesImg, rightPaddleX, rightPaddleY);
}

function controls() {
  if (gameOn == 1 && controlToggle == 1) {
    leftPaddleY = mouseY - 95;
    rightPaddleY = mouseY - 95;
  }
  
  if (gameOn == 1 && controlToggle == 2) {
    if(keyIsDown(UP_ARROW)) {
      leftPaddleY -= 20;
      rightPaddleY -= 20;
    }
    if(keyIsDown(DOWN_ARROW)) {
      leftPaddleY += 20;
      rightPaddleY += 20;
    }
  }
}

function paddleBoundary() {
  if (leftPaddleY < 0) {
    leftPaddleY = 0;
  }
  if (leftPaddleY > 300) {
    leftPaddleY = 300;
  }
  if (rightPaddleY < 0) {
    rightPaddleY = 0;
  }
  if (rightPaddleY > 300) {
    rightPaddleY = 300;
  }
}

function displayBounces() {
  fill(160);
  textSize(150);
  text(bounceCount, 10, 470);
}

function moveBall() {
  if (gameOn == 1 && ballX < 500 && ballX > 0) {
    ballX += ballXSpeed * ballXDirection;
  } else {
    textSize(150);
    text("Game Over!", 50, 150, 50);
    gameOn = 0;
    restart();
  }
  if (gameOn == 1 && ballY <= 450 && ballY > 10) {
    ballY += ballYSpeed * ballYDirection;
  }
  if (ballY >= 450 || ballY < 10) {
    ballYDirection = -1 * ballYDirection;
  }
  //Ball boundaries
  if (ballY > 450) {
    ballY = 449;
  }
  if (ballY < 10) {
    ballY = 11;
  }
}

function collision() {
  angle = random(-PI/4, PI/4);
  if (ballX < leftPaddleX+15 && ballY >= leftPaddleY-110+95 && ballY <= leftPaddleY+110+95) {
    ballXSpeed += 0.5 * cos(angle);
    bounceCount += 1;
    ballXDirection = -1 * ballXDirection;
    ballYDirection = -1 * ballYDirection;
    ballY += random(-15, 15);
  }
  if (ballX > rightPaddleX-60 && ballY >= rightPaddleY-110+95 && ballY <= rightPaddleY+110+95) {
    ballYSpeed += 3 * sin(angle);
    bounceCount += 1;
    ballXDirection = -1 * ballXDirection;
    ballYDirection = -1 * ballYDirection * random(-1, 1);
    ballY += random(-15, 15);
  }
}

function restart() {
  restartButton = createButton('Start Over');
  restartButton.position(200, 350);
  restartButton.mousePressed(setup);
  restartButton.mousePressed(turnGameOn);
  
  keyboardToggle = createButton('Switch to keyboard?');
  keyboardToggle.position(100, 400);
  keyboardToggle.mousePressed(switchKeyboard);
  
  mouseToggle = createButton('Switch to mouse?');
  mouseToggle.position(250, 400);
  mouseToggle.mousePressed(switchMouse);
}

function displayToggle() {
  if (controlToggle == 1) {
    textSize(20);
    text('Mouse', 200, 450);
  } else {
    textSize(20);
    text('Keyboard', 200, 450);
  }
}

function turnGameOn() {
  gameOn = 1;
}

function switchMouse() {
  controlToggle = 1;
}

function switchKeyboard() {
  controlToggle = 2;
}

function displayHighScore() {
  if (bounceCount > highScore) {
    highScore = bounceCount;
  }
  textSize(20);
  text('Highscore = ' + highScore, 370, 420);
}