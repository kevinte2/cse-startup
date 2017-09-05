var monster_img;
var cookie_img;
var points;
var monster_x, monster_y;
var cookie_x, cookie_y;
var cookiesMissed;
var pie_img;
var cake_img;
var pieX;
var pieY;
var cakeX;
var cakeY;
var item;
var button;
var speed;
var gameOver;
var soundPlayed;

function preload() {
  monster_img = loadImage("assets/cookie_monster.png");
  cookie_img = loadImage("assets/cookie.png");
  pie_img = loadImage("assets/pie.png");
  cake_img = loadImage("assets/cake.png");
  soundFormats('mp3');
  gameOver = loadSound("assets/gameover");
}

function setup() {
  createCanvas(720, 400);
  monster_x = 0;
  monster_y = 0;
  cookie_x = 725;
  cookie_y = random(350);
  pieX = 725;
  pieY = random(350);
  cakeX = 725;
  cakeY = random(350);
  points = 0;
  cookiesMissed = 0;
  item = random(5);
  speed = 3;
  removeElements();
  soundPlayed = false;
}

function draw() {
  background(200);
  displayPoints();

  image(cookie_img, cookie_x, cookie_y);
  image(pie_img, pieX, pieY);
  image(cake_img, cakeX, cakeY);

  monster_x = mouseX - 50;
  monster_y = mouseY - 50;
  image(monster_img, monster_x, monster_y);

  if (item >= 0 && item < 1) {
    moveCake();
  } else if (item >= 1 && item < 2) {
    movePie();
  } else if (item >= 2 && item < 5) {
    moveCookie();
  } 

  checkForChomp();

  if (cookiesMissed > 2) {
    endGame();
  }
}

function displayPoints() {
  fill(160);
  textSize(150);
  text(points, 10, 370);
  fill(255, 0, 0);
  text(cookiesMissed, 10, 120);
}

function moveCookie() {
  if (cookie_x < 0) {
    cookie_x = 725;
    cookie_y = random(350);
    cookiesMissed++;
    item = random(5);
  } else
    cookie_x -= speed;
}

function movePie() {
  if (pieX < 0) {
    pieX = 725;
    pieY = random(350);
    item = random(5);
  } else {
    pieX -= speed;
  }
}

function moveCake() {
  if (cakeX < 0) {
    cakeX = 725;
    cakeY = random(350);
    item = random(5);
  } else
    cakeX -= speed;
}

function endGame() {
  button = createButton('Start Over');
  button.position(320, 300);
  
  if(soundPlayed == false) {
    gameOver.setVolume(0.1);
    gameOver.play();
    soundPlayed = true;
  }

  fill(0, 0, 0);
  textSize(125);
  text("Game Over", 15, height / 2 + 45);
  pieX = 725;
  cakeX = 725;
  cookieX = 725;
  
  item = 10;

  button.mousePressed(setup);
}

function moveMonster() {
  /*if (keyIsDown(UP_ARROW) && monster_y > 0)
    monster_y -= 3;
  if (keyIsDown(DOWN_ARROW) && monster_y < height - 150)
    monster_y += 3;
  if (keyIsDown(LEFT_ARROW) && monster_x > 0)
    monster_x -= 3;
  if (keyIsDown(RIGHT_ARROW) && monster_x < width - 300)
    monster_x += 3; */
  if(mouseX < 0) {
    monster_x = 0;
  }
  if(mouseX > 720) {
    monster_x = 720;
  }
    
}

function checkForChomp() {
  var d1 = dist(cookie_x, cookie_y, mouseX, mouseY);
  var d2 = dist(pieX, pieY, mouseX, mouseY);
  var d3 = dist(cakeX, cakeY, mouseX, mouseY);

  if (d1 < 100) {
    points += 1;
    speed += .5;
    cookie_x = 725;
    cookie_y = random(350);
    item = random(5);
  }
  if (d2 < 100) {
    cookiesMissed += 1;
    pieX = 725;
    pieY = random(350);
    item = random(5);
  }
  if (d3 < 100) {
    cookiesMissed += 1;
    cakeX = 725;
    cakeY = random(350);
    item = random(5);
  }
}