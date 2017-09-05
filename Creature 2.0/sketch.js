/* Black: (0, 0, 0), White: (255, 255, 255), Gold (223, 193, 11), Red (255, 0, 0), Sky (9, 253, 255), Horn (223, 193, 11) 
Eye (0, 0, 0) */

var creatureColor1 = 255; // Leg, torso, and arm color R value
var creatureColor2 = 0; // Leg, torso, and arm color G value
var creatureColor3 = 0; // Leg, torso, and arm color B value
var creatureColor4 = 220; // Leg, torso, and arm color transparency

var bellyColor1 = 223; // Belly color R value
var bellyColor2 = 193; // Belly color G value
var bellyColor3 = 11; // Belly color B value

var skyColor1 = 9; // Sky color R value
var skyColor2 = 253; // Sky color G value
var skyColor3 = 255; // Sky color B value

var hornColor1 = 223; // Horn color R value
var hornColor2 = 193; // Horn color G value
var hornColor3 = 11; // Horn color B value

var eyeColor1 = 0;
var eyeColor2 = 0;
var eyeColor3 = 0;

var sleep = false;

function setup() {
  
  createCanvas(500, 500); // Canvas size
  
}

function draw() {
  
  // New background color
  background(skyColor1, skyColor2, skyColor3);
  // Hills
  stroke(0, 0, 0);
  hill(50, 500, 500, 400);
  hill(-50, 500, 250, 300);
  hill(100, 500, 400, 300);
  cloud(400, 50);
  
  // Mouse moves creature
  translate(mouseX-250, mouseY-300);
  
  // Callback
  legs();
  torso();
  belly();
  mouth();
  eyes();
  arms();
  horns();
  
}
  
function legs() {
  
  noStroke(); // No border legs
  fill(creatureColor1, creatureColor2, creatureColor3, creatureColor4); // Legs and torso color
  rect(8*20, 18.5*20, 4*20, 4*20, 20); // Left leg
  rect(13*20, 18.5*20, 4*20, 4*20, 20); // Right leg
  
}

function torso() {
  
  noStroke(); // No border torso
  rect(8*20, 9*20, 9*20, 11*20, 40); // Torso
  
}

function belly() {
  
  fill(bellyColor1, bellyColor2, bellyColor3); // Belly color
  arc(12.5*20, 17*20, 5.5*20, 80, 0, TWO_PI); // Half belly
  
}
  
function mouth() {
  
  stroke(0, 0, 0); // Mouth border
  fill (255, 255, 255); // White mouth (teeth color)
  arc(12.5*20, 13*20, 5*20, 50, 0, PI); // Lower mouth
  
}

function eyes() {
  
  if (sleep == true) {
  
  fill(creatureColor1, creatureColor2, creatureColor3, creatureColor4); // Fill sclera creature color
  ellipse(10.5*20, 11.5*20, 2*20); // Left outer
  ellipse(14.5*20, 11.5*20, 2*20); // Right outer
  noStroke(); // No border pupils
  fill(creatureColor1, creatureColor2, creatureColor3, creatureColor4); // Fill pupils creature color
  ellipse(10.5*20, 11.5*20, 1*20); // Left pupil
  ellipse(14.5*20, 11.5*20, 0.5*20); // Right pupil
  fill(creatureColor1, creatureColor2, creatureColor3, creatureColor4); // Fill eye sparkle creature color
  noStroke(); // No border sparkle
  ellipse(10.5*20-5, 12*20-5-0.5*20, 0.5*20); // Left eye sparkle
  ellipse(14.5*20-3, 12*20-3-0.5*20, 0.25*20); // Right eye sparkle
  fill(255, 0, 0, 120); // Original color
    
  } else {
    
  fill(255, 255, 255); // Fill sclera white
  ellipse(10.5*20, 11.5*20, 2*20); // Left outer
  ellipse(14.5*20, 11.5*20, 2*20); // Right outer
  noStroke(); // No border pupils
  fill(eyeColor1, eyeColor2, eyeColor3, 255); // Fill pupils black
  ellipse(10.5*20, 11.5*20, 1*20); // Left pupil
  ellipse(14.5*20, 11.5*20, 0.5*20); // Right pupil
  fill(255, 255, 255); // Fill eye sparkle white
  noStroke(); // No border sparkle
  ellipse(10.5*20-5, 12*20-5-0.5*20, 0.5*20); // Left eye sparkle
  ellipse(14.5*20-3, 12*20-3-0.5*20, 0.25*20); // Right eye sparkle
  fill(255, 0, 0, 120); // Original color
  
  }
  
}
  
function arms() {  
  
  fill(creatureColor1, creatureColor2, creatureColor3, creatureColor4); // Matching arm color to torso
  rect(3.5*20, 15*20, 5*20, 2*20, 20); // Left
  rect(16.5*20, 15*20, 5*20, 2*20, 20); // Right
  
}
  
function horns() {  
  
  fill(hornColor1, hornColor2, hornColor3); // Horn color
  stroke(138, 119, 7); // Outer horn
  ellipse(7*20, 8*20, 5*20); // Left outer
  ellipse(18*20,8*20, 5*20); // Right outer 
  var white = color(skyColor1, skyColor2, skyColor3) // White inner horn
  fill(white); // No color inner horn
  noStroke(); // No border inner horn
  ellipse(8.1*20, 8.25*20, 3*20); // Left inner
  ellipse(16.9*20, 8.25*20, 3*20); // Right inner
  
}

function cloud(Xcoord, Ycoord) {
  
  noStroke(); // No border cloud
  fill(149, 166, 160, 240); // Cloud color
  ellipse(Xcoord, Ycoord, 250, 150); // Right cloud
  
  fill(149, 166, 160, 240); // Cloud color
  noStroke(); // No border cloud
  for (var i = 0; i < 10; i ++) { // Left cloud
  ellipse(100, 100, 200, 200);
  rotate(PI/5);
  
  fill(149, 166, 160, 240); // Cloud color
  noStroke(); // No border cloud
  for (var j = 0; j < 10; j ++) { // Left cloud
  ellipse(100, 100, 200, 200);
  rotate(PI/5);
  }
  }
}

function mouseClicked() {
  
  if (sleep == false) {
    
  sleep = true;
    
  } else {
    
  sleep = false;
  
  }
}

function keyPressed() {
  
  creatureColor1 = random(256); // Leg, torso, and arm color R value
  creatureColor2 = random(256); // Leg, torso, and arm color G value
  creatureColor3 = random(256); // Leg, torso, and arm color B value

  bellyColor1 = random(256); // Belly color R value
  bellyColor2 = random(256); // Belly color G value
  bellyColor3 = random(256); // Belly color B value
    
  hornColor1 = random(256); // Horn color R value
  hornColor2 = random(256); // Horn color G value
  hornColor3 = random(256); // Horn color B value
  
}

function hill(x,y,w,h) {
  
  fill(color(84, 203, 3));
  arc(x+(w/2), y, w, h, PI, 0, PIE);
  
}