 var obstacle, obstacleImage, obstacleGroup;
  var banana, bananaImage, bananaGroup;
  var monkey, monkey_running;
  var backgroundy, backgroundImage;
  var score= 0;
  var ground;

function preload(){
  //loading image for background  
    backgroundImage= loadImage("jungle.jpg");
  
  //loading animation for monkey
  monkey_running= loadAnimation ("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  //loading images for banana and obstacles
    bananaImage= loadImage("banana.png");
    obstacleImage= loadImage("stone.png");
}

function setup() {
  //creating canvas  
    createCanvas(400,400);
  
  //creating background sprite
    backgroundy= createSprite (200,200);
    backgroundy.addImage ("backgroundimage", backgroundImage);
    backgroundy.velocityX= -2;
    
  //creating monkey sprite
    monkey= createSprite (50,340,10,10);
    monkey.addAnimation ("monkeyrunning", monkey_running);
    monkey.scale= 0.1;
  
  //creating ground sprite
    ground= createSprite (0,390,800,10);
    ground.visible= false;
  
  //creating groups for banana and obstacles
    bananaGroup= new Group ();
    obstacleGroup= new Group ();
}

function draw() {
  //assigning background color
    background("white");
  
  //to know the position of monkey to make more changes
    console.log(monkey.y);
  
  //reseting background
    if (backgroundy.x<150) {
      backgroundy.x= 200
    }   
  
  //making the monkey jump  
    if (keyDown ("space")&& monkey.y>=355) {
      monkey.velocityY= -20;  
    }    
    
  //adding gravity to monkey
    monkey.velocityY= monkey.velocityY + 0.8;
  
  //preventing the monkey from falling off the ground
    monkey.collide (ground);
  
  //scoring system and changing size of the monkey
    if (bananaGroup.isTouching(monkey)) {
      score= score+2;
      bananaGroup.destroyEach();
    }
  
    switch (score) {
      case 10: monkey.scale= 0.15;
      break;
      case 20: monkey.scale= 0.20;
      break;
      case 30: monkey.scale= 0.25;
      break;
      case 40: monkey.scale= 0.30;
      break;
      case 50: monkey.scale= 0.35;
      break;
      default: break;
    }
  
    if (obstacleGroup.isTouching(monkey)) {
      score= 0;
      obstacleGroup.destroyEach();
      monkey.scale= 0.1;
    }
  
   
  //calling user-defined functions
    spawnBananas();
    spawnObstacles();
  
  //drawing sprites
    drawSprites();
  
  //displaying score
    stroke ("white");
    textSize (15);
    text ("Score: "+score,190,70);
  stroke("black");
  textSize(20);
  fill("black");
  SurvivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+SurvivalTime,100,50);
}

//function for bananas
function spawnBananas () {
  if (frameCount%80===0) {
    banana= createSprite (360,120,10,10);  
    banana.addImage ("bananaimage", bananaImage);
    banana.scale= 0.1;
    banana.velocityX= -3;
    
    //adding lifetime to bananas
      banana.lifetime= 150;
    
    //adding banana to banana group
      bananaGroup.add(banana);
  }
}

//function for obstacles
function spawnObstacles () {
  if (frameCount%300===0) {
    obstacle= createSprite (270,370,10,10);
    obstacle.addImage ("obstacleimage", obstacleImage);
    obstacle.scale= 0.1;
    obstacle.velocityX= -4;
    
    //adding obstacle to obstacle group
      obstacleGroup.add(obstacle);
  }
}
