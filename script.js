//Credits:
//Button sample by Mellau via freesound.org
//Card press sample by NenadSimic via freesound.org
//Card snap sample by alparbalazs via freesound.org
//Background music sample by joshuaempyre via freesound.org
//Win jingle music sample by sonically_sound via freesound.org

let cards = [];
let font;
let buttonPress, cardPress, cardSnap, gameMusic, winJingle;
let SSH, diffie, TCP3way, AlgNegotiation, Protocol, StartIcon, lockedComputer, lockedout, Chip;
let SSHImg, diffieImg, TCP3wayImg, AlgNegotiationImg, ProtocolImg, StartIconImg, lockedComputerImg, lockedoutImg;
let center1, center2, center3, center4;
let screen = 0;
let widthConstraint, heightConstraint;
let alphaValue = 0;
let fadeSpeed = 5;
let confirm = false;
let cancel = false;
let cardPressed = false;
let playOnce = true;
audio = true;

//start = 0
//instructions = 1
//game = 2
//restart = 3
//lose = 4

function setCardsoffScreen() { //moves images based on which screen is displayed
  TCP3way.pos = { x: -100, y: -100 };
  diffie.pos = { x: -100, y: -100 };
  AlgNegotiation.pos = { x: -100, y: -100 };
  Protocol.pos = { x: -100, y: -100 };
  SSH.pos = { x: -300, y: -300 };
  if (screen === 0) {
    StartIcon.scale = .0006 * width;
    StartIcon.pos = { x: width * .5, y: height * .5 };
  }
  else {
    StartIcon.pos = { x: -100000, y: -200 };
  }if (screen === 3) {
    lockedComputer.pos = { x: width * .5, y: height * .5 };
  }
  else {
    lockedComputer.pos = { x: -100000, y: -200 };
  }
  if (screen === 4) {
    lockedout.pos = { x: width * .5, y: height * .5};
  }
  else {
    lockedout.pos = { x: -100000, y: -200 };
  }
}

function mousePressed() {

  if (screen === 0) { //on the start screen
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      showInstructionScreen();
      screen = 1;
    }
  }
  else if (screen === 1 || screen === 3 || screen === 4) {// if on the instructions/restart/lose screen
    //press begin button or restart button pressed
    if (mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height - 120 && mouseY < height - 80) {
      buttonPress.play();
      if (screen == 3) {
        winJingle.stop();
        gameMusic.loop();
      }
      screen = 2;
      diffie.position = createVector(width * .2, height - 70);
      TCP3way.position = createVector(width * .3716, height - 70);
      AlgNegotiation.position = createVector(width * .56332, height - 70);
      Protocol.position = createVector(width * .775, height - 70);
      SSH.pos = { x: width * .3, y: height / 2 - 10 };
      StartIcon.pos = { x: width / 2, y: 160 + 95 };
    }
  }
  else if (screen === 2 && confirm && !cancel) { //checks if user wins or loses from submit prompt
    if (mouseX > width / 2 + 20 && mouseX < width / 2 + 140 && mouseY > height - 80 && mouseY < height - 40) {
      buttonPress.play();
      if (
        dist(diffie.x, diffie.y, center4.x, center4.y) < 1 &&
        dist(TCP3way.x, TCP3way.y, center1.x, center1.y) < 1 &&
        dist(AlgNegotiation.x, AlgNegotiation.y, center3.x, center3.y) < 1 &&
        dist(Protocol.x, Protocol.y, center2.x, center2.y) < 1
      ) {
        console.log("you win!");
        showScreenWin();
        screen = 3;
        confirm = false;
      }
      else {
        console.log("you lose!");
        showScreenLose();
        screen = 4;
        confirm = false;
      }
    }
    else if (mouseX > width / 2 - 120 && mouseX < width / 2 && mouseY > height - 80 && mouseY < height - 40) { //cancel button
      buttonPress.play();
      confirm = false;
      cancel = true;
    }
  }

  //If on the game screen
  if (screen === 2) {
    cardPressed = true;
    // Check if the "Learn More" button is clicked
    if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 55 && mouseY < height - 20) 
    {
      buttonPress.play();
      // Display a link to a website for further learning
      window.open('https://dumpthecode.pro/articles/overview-of-the-ssh-handshake-process_32');
    }
  }
}


function handleDragging(card) {
  if (card.mouse.dragging()) { //The card is constrained within the game window
    if (cardPressed) {
      cardPress.play();
      cardPressed = false;
    }
    cancel = false;
    confirm = false;
    widthConstraint = constrain(mouseX + card.mouse.x, card.width / 2, width - card.width / 2);
    heightConstraint = constrain(mouseY + card.mouse.y, card.height / 2, height - card.height / 2);
    card.position = createVector(widthConstraint, heightConstraint);
    card.rotationLock = true;
  } else {
    card.vel.x = 0;
    card.vel.y = 0;
    card.rotationLock = true;
  }
}

function snapToCenter(card) {
  // Snap into position and check if there is not already a card in the center position
  if (!mouseIsPressed) {
    let snapped = false;
    switch (true) {
      case dist(card.x, card.y, center1.x, center1.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center1.x, center1.y) < 40):
        if (card.x != center1.x && card.y != center1.y) {
          cardSnap.play();
        }
        card.position = center1;
        snapped = true;
        break;
      case dist(card.x, card.y, center2.x, center2.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center2.x, center2.y) < 40):
        if (card.x != center2.x && card.y != center2.y) {
          cardSnap.play();
        }
        card.position = center2;
        snapped = true;
        break;
      case dist(card.x, card.y, center3.x, center3.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center3.x, center3.y) < 40):
        if (card.x != center3.x && card.y != center3.y) {
          cardSnap.play();
        }
        card.position = center3;
        snapped = true;
        break;
      case dist(card.x, card.y, center4.x, center4.y) < 40 && !cards.some(c => c != card && dist(c.x, c.y, center4.x, center4.y) < 40):
        if (card.x != center4.x && card.y != center4.y) {
          cardSnap.play();
        }
        card.position = center4;
        snapped = true;
        break;
      default:
        break;
    }

    if (!snapped) {
      // Return the card to its original position
      card.position = card.originalPosition;
    }
  }
}

function checkIfConfirm() { //submit screen appears if all 4 cards have been snapped to a position
  let numSnapped = 0;
  for (let card of cards) {
    if (
      dist(card.x, card.y, center1.x, center1.y) < 1 ||
      dist(card.x, card.y, center2.x, center2.y) < 1 ||
      dist(card.x, card.y, center3.x, center3.y) < 1 ||
      dist(card.x, card.y, center4.x, center4.y) < 1 
    ) {
        numSnapped++;
    }
  }
  if (numSnapped == 4) {
    confirm = true;
  }
}

function preload() { //load fonts, images and sounds
  font = loadFont('assets/SSH/1/MechaRx20Regular-j9Zy9.otf');
  SSHImg = loadImage('assets/SSH/1/SSH.png');
  diffieImg = loadImage('assets/SSH/1/Diffie.png');
  TCP3wayImg = loadImage('assets/SSH/1/TCP3way.png');
  AlgNegotiationImg = loadImage('assets/SSH/1/AlgNegoation.png');
  ProtocolImg = loadImage('assets/SSH/1/Protocol.png');
  StartIconImg = loadImage('assets/SSH/1/StartIcon.png');
  lockedComputerImg = loadImage('assets/SSH/1/lockedComputer.png');
  lockedoutImg = loadImage('assets/SSH/1/lockedout.png');
  ChipImg = loadImage('assets/SSH/1/Chip.png');
  buttonPress = loadSound('assets/SSH/1/buttonPress.wav');
  cardPress = loadSound('assets/SSH/1/cardPress.wav');
  cardSnap = loadSound('assets/SSH/1/cardSnap.wav');
  gameMusic = loadSound('assets/SSH/1/gameMusic.wav');
  winJingle = loadSound('assets/SSH/1/winJingle.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  center1 = createVector(width * .7, height * .32);
  center2 = createVector(width * .7, height * .44);
  center3 = createVector(width * .7, height * .54);
  center4 = createVector(width * .7, height * .64);

  soundFormats('wav');
  gameMusic.loop();

  SSH = new Sprite(width / 2, height / 2 - 10);
  SSH.addImage(SSHImg);
  SSH.collider = 'k';
  SSH.scale = .0004 * width;

  Chip = new Sprite(width / 2, height * .5);
  Chip.addImage(ChipImg);
  Chip.collider = 'k';

  cards = new Group();
  cards.collider = 'k';

  StartIcon = new Sprite(width * .505, height * .5);
  StartIcon.addImage(StartIconImg);
  StartIcon.collider = 'k';
  StartIconImg.scale = .0006 * width;

  lockedComputer = new Sprite(width / 2, height * .5);
  lockedComputer.addImage(lockedComputerImg);
  lockedComputer.collider = 'k';

  lockedout = new Sprite(width / 2, height * .5);
  lockedout.addImage(lockedoutImg);
  lockedout.collider = 'k';

  diffie = new cards.Sprite(width * .2, height - 70);
  diffie.addImage(diffieImg);
  diffie.scale = 0.000425 * width;
  cards[0] = diffie;
  diffie.originalPosition = createVector(width * .2, height - 70);

  TCP3way = new cards.Sprite(width * .3716, height - 70);
  TCP3way.addImage(TCP3wayImg);
  TCP3way.scale = 0.000425 * width;
  cards[1] = TCP3way;
  TCP3way.originalPosition = createVector(width * .3716, height - 70);

  AlgNegotiation = new cards.Sprite(width * .56332, height - 70);
  AlgNegotiation.addImage(AlgNegotiationImg);
  AlgNegotiation.scale = 0.000425 * width;
  cards[2] = AlgNegotiation;
  AlgNegotiation.originalPosition = createVector(width * .56332, height - 70);

  Protocol = new cards.Sprite(width * .775, height - 70);
  Protocol.addImage(ProtocolImg);
  Protocol.scale = 0.00035 * width;
  cards[3] = Protocol;
  Protocol.originalPosition = createVector(width * .775, height - 70);

  TCP3way.pos = { x: -100, y: -100 };
  diffie.pos = { x: -100, y: -100 };
  AlgNegotiation.pos = { x: -100, y: -100 };
  Protocol.pos = { x: -100, y: -100 };
  SSH.pos = { x: -200, y: -200 };
  StartIcon.pos = { x: -400, y: -400 };
  lockedComputer.pos = { x: -400, y: -400 };
  lockedout.pos = { x: -400, y: -400 };
  Chip.pos = { x: -400, y: -400 };
}


function draw() {
  // Set up the screen
  clear();
  background("white");


  if (screen === 0) {
    showStartScreen();
  }
  else if (screen === 1) {
    showInstructionScreen();
  }
  else if (screen === 2) {
    playOnce = true;
    const c = color(48, 116, 180);
    background(c);

    let imgX = 0;
    let imgY = 0;
    scale(.00016 * width);
    image(ChipImg, imgX, imgY);
    scale(1 / (.00016 * width));

    noStroke();
    strokeWeight(1);
    fill(255);
    rectMode(CENTER);
    rect(width / 2, 60, 1000, 100, 10);
    rectMode(CORNER);
    rect(200, 120, width - 400, height - 270, 10);
    // Define the text content
    // Set text properties
    // Display text content
    textSize(15);
    noStroke();
    fill(0);
    textAlign(CENTER, TOP); // Text alignment
    text("\nThis diagram shows the SSH handshake between a client and server via a direct connection. Based on the diagram, drag and drop the steps of the process to the correct order.", width / 2 - 500, 20, 1000, 360);

    // Learn More Button Border
    stroke(255);
    strokeWeight(2);
    fill(255);
    // Learn More Button
    noStroke();
    fill(255);
    rect(width - 150 + 1, height - 54, 138, 38, 10);
    fill(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text("Learn More", width - 80, height - 35);  // Learn More Button Text

    stroke(c);
    strokeWeight(3);
    fill(255);
    rectMode(CENTER);
    rect(center1.x, center1.y, width * .115, height * .085);
    rect(center2.x, center2.y, width * .115, height * .085);
    rect(center3.x, center3.y, width * .115, height * .085);
    rect(center4.x, center4.y, width * .115, height * .085);
    rectMode(CORNER);

    strokeWeight(5);
    stroke(0);
    line(center1.x * .65, center1.y, center1.x * .85, center1.y);
    line(center1.x * .825, center1.y - 20, center1.x * .85, center1.y);
    line(center1.x * .825, center1.y + 20, center1.x * .85, center1.y);

    line(center2.x * .65, center2.y, center2.x * .85, center2.y);
    line(center2.x * .825, center2.y - 20, center2.x * .85, center2.y);
    line(center2.x * .825, center2.y + 20, center2.x * .85, center2.y);

    line(center3.x * .65, center3.y, center3.x * .85, center3.y);
    line(center3.x * .825, center3.y - 20, center3.x * .85, center3.y);
    line(center3.x * .825, center3.y + 20, center3.x * .85, center3.y);

    line(center4.x * .65, center4.y, center4.x * .85, center4.y);
    line(center4.x * .825, center4.y - 20, center4.x * .85, center4.y);
    line(center4.x * .825, center4.y + 20, center4.x * .85, center4.y);

    for (let card of cards) {
      handleDragging(card);
      snapToCenter(card);
    }
  }

  checkIfConfirm();
  //Check if we win!!!
  if (confirm && !cancel) {
    const c = color(0, 179, 115);
    fill(255);
    noStroke();
    rect(width / 2 - 140, height - 130, 300, 110, 10);
    fill(0);
    textSize(20);
    textAlign(LEFT);
    text('Submit Answer?', width / 2 - 95, height - 105);
    fill(c);
    rect(width / 2 + 20, height - 80, 120, 40, 10);
    fill(255);
    textSize(17);
    text("Submit", width / 2 + 42, height - 60);
    const r = color(195, 16, 16);
    fill(r);
    rect(width / 2 - 120, height - 80, 120, 40, 10);
    fill(255);
    text("Cancel", width / 2 - 105, height - 60);
  }

  else if (screen === 3) {
    showScreenWin();
  }

  else if (screen === 4) {
    showScreenLose();
  }
}

function windowResized() { //Adjusts size of canvas and screen elements based on screen size 
  resizeCanvas(windowWidth, windowHeight);
  SSH.scale = .0004 * width;
  SSH.pos = { x: width * .3, y: height / 2 - 10 };
  TCP3way.scale = 0.000425 * width;
  TCP3way.originalPosition = createVector(width * .3716, height - 70);
  diffie.scale = 0.000425 * width;
  diffie.originalPosition = createVector(width * .2, height - 70);
  AlgNegotiation.scale = 0.000425 * width;
  AlgNegotiation.originalPosition = createVector(width * .56332, height - 70);
  Protocol.scale = 0.00035 * width;
  Protocol.originalPosition = createVector(width * .775, height - 70);
  center1 = createVector(width * .7, height * .32);
  center2 = createVector(width * .7, height * .44);
  center3 = createVector(width * .7, height * .54);
  center4 = createVector(width * .7, height * .64);
}

function showStartScreen() {
  setCardsoffScreen();
  const c = color(48, 116, 180);
  background(c);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rectMode(CENTER);
  rect(width / 2, height / 8, 700, height / 10, 10);
  rectMode(CORNER);

  // Set text properties
  fill(0); // Black color
  textSize(60); // Font size
  textFont(font);
  textAlign(CENTER, CENTER); // Text alignment
  text("SSH Handshake\n\n", width / 2, height / 4.5);

  // Instructions button
  fill(255);
  noStroke();
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Instructions", width / 2, height - 100);

  fill(255);
  rect(width * .395, height * .25, width * .21, height * .5, 10);
}


function showInstructionScreen() {
  setCardsoffScreen();
  background("white");

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(0);
  rectMode(CENTER);
  rect(width / 2, height / 3.25, 600, height / 10, 10);
  rectMode(CORNER);

  const c = color(48, 116, 180);
  // Set text properties
  fill(c); // Blue color
  textSize(32); // Font size
  textAlign(CENTER, CENTER); // Text alignment
  text("Instructions\n\n", width / 2, height * .36);

  // Begin button
  fill(0);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(255);
  textSize(20);
  text("Begin", width / 2, height - 100);


  textSize(18); // Adjusted font size
  textAlign(CENTER, TOP); // Adjusted text alignment

  // Additional text
  fill(color(0));
  let textX = width / 2 - 280; // X position for the additional text
  let textY = height / 2 - 60; // Starting Y position for the additional text
  let textLeading = 24; // Line spacing
  let textWidth = 575; // Width of the text block
  let additionalText = "Your objective is to correctly place each card into its designated slot. To play, click and hold on a card, then drag it to the slot where you think it belongs. Release the mouse to drop the card into place.\n\nRemember, each card has a specific slot it must occupy. When all cards have been placed, you'll see an option to check your answers. If you're correct, you'll have the option to play again.";

  text(additionalText, textX, textY, textWidth, height - textY); // Display additional text with specified width and height
}

function showScreenWin() {
  if (playOnce) {
    gameMusic.stop();
    winJingle.loop();
  }
  playOnce = false;
  const c = color(0, 179, 115);
  background(c);
  //Move extra icons off screen when win page is up
  setCardsoffScreen();

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .34, height * .1, width * .33, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("You Win!\n\nThanks for playing!", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display win image
  let imgX2 = lockedComputer.width + 14;
  let imgY2 = lockedComputer.height - 55;
  scale(.00095 * width);
  image(lockedComputerImg, imgX2, imgY2);
}

function showScreenLose() {
  setCardsoffScreen();
  const r = color(195, 16, 16);
  background(r);

  let imgX = 0;
  let imgY = 0;
  scale(.00016 * width);
  image(ChipImg, imgX, imgY);
  scale(1 / (.00016 * width));

  fill(255);
  rect(width * .33, height * .33, width * .35, height * .48, 10);

  //Set text properties
  fill(255, alphaValue);
  rect(width * .4, height * .1, width * .2, height * .2, 10);
  fill(0, alphaValue);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Not Quite!\n\nTry again?", width / 2, height * .2);

  //Animate alpha value for fading effect
  alphaValue += fadeSpeed;
  if (alphaValue > 255 || alphaValue < 0) {
    fadeSpeed *= -1; //Reverse the fade direction
  }

  //Restart button
  fill(255);
  rect(width / 2 - 100, height - 120, 200, 40, 10);
  fill(0);
  textSize(20);
  text("Restart", width / 2, height - 100);

  //display lose image
  let imgX2 = lockedout.width + 20;
  let imgY2 = lockedout.height - 20;
  scale(.001 * width);
  image(lockedoutImg, imgX2, imgY2);
}
