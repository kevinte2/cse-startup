var ballImg;
var leftPaddlesImg;

var leftPaddleX;
var leftPaddleY;
var rightPaddleX;
var rightPaddleY;
var ballX;
var ballY;

var bounceCount;
var ballXDirection;
var ballYDirection;

var ballXSpeed;
var ballYSpeed;

var angle;

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
}

function draw() {
  background(255);
  
  // Load images
  image(ballImg, ballX, ballY);
  image(leftPaddlesImg, leftPaddleX, leftPaddleY);
  image(rightPaddlesImg, rightPaddleX, rightPaddleY);
  
  // Paddles controlled by mouse
  leftPaddleY = mouseY - 95;
  rightPaddleY = mouseY - 95;
  
  paddleBoundary();
  moveBall();
  displayBounces();
  collision();
  
  angle = random(-PI/4, PI/4);
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
  if (ballX < 500 && ballX > 0) {
    ballX += ballXSpeed * ballXDirection;
  } else {
    text("Game Over!", 50, 150, 50);
    noLoop();
  }
  if (ballY <= 450 && ballY > 10) {
    ballY += ballYSpeed * ballYDirection;
  }
  if (ballY >= 450 || ballY < 10) {
    ballYDirection = -1 * ballYDirection;
  }
  //Boundaries
  if (ballY > 450) {
    ballY = 449;
  }
  if (ballY < 10) {
    ballY = 11;
  }
}

function collision() {
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