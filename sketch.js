var PLAY = 1;
var END = 0;
var gameState = PLAY;
var horse, horse_running, horse_collided;
var ground, invisibleGround, groundImage;
var rockGroup, rockImage, rock;
var hayGroup,hay,hayimage; 
var score;
//var gameOverImg,restartImg;

function preload(){
  horse_running = loadAnimation("2.png","3.png");
  horse_collided = loadAnimation("standig.png"); 
  groundImage = loadImage("road.jpg");
  hayimage = loadImage("hay cut.png");
  rock = loadImage("rock.jpg");
}function setup() {
  createCanvas(600, 200);

  var message = "This is a message";
 console.log(message)
  
  horse = createSprite(50,160,20,50);
  horse.addAnimation("running", horse_running);
  horse.addAnimation("collided", horse_collided);
  

  horse.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //gameOver = createSprite(300,100);
  //gameOver.addImage(gameOverImg);
  
 // restart = createSprite(300,140);
  //restart.addImage(restartImg);
  
 
  //gameOver.scale = 0.5;
  //restart.scale = 0.5;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  rockGroup = createGroup();
 hayGroup = createGroup();

  
  horse.setCollider("rectangle",0,0,trex.width,trex.height);
  //trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){  

    //gameOver.visible = false;
    //.visible = false;
    
    ground.velocityX = -(4 + 3* score/250)
    //scoring
    score = score + Math.round(frameCount/60);
 
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& horse.y >= 100) {
        horse.velocityY = -12;
    }
    
    //add gravity
    horse.velocityY = horse.velocityY + 0.8;
  
    //spawn the clouds
    spawnrocks();
  
    //spawn obstacles on the ground
    spawnhay();
    
    if(rockGroup.isTouching(horse)){
        //trex.velocityY = -12;

        gameState = END;      
  }   }
  
   else if (gameState === END) {
      ///gameOver.visible = true;
      //restart.visible = true;
     //change the trex animation
      horse.changeAnimation("collided", horse_collided);
      ground.velocityX = 0;
      horse.velocityY = 0  
      //set lifetime of the game objects so that they are never destroyed
    rockGroup.setLifetimeEach(-1);
    hayGroup.setLifetimeEach(-1);
     
   rockGroup.setVelocityXEach(0);
     hayGroup.setVelocityXEach(0);    
   }
   //stop trex from falling down
  horse.collide(invisibleGround);
  if(mousePressedOver(restart)) {
      reset();
  }
  drawSprites();
}
function reset(){ 
}
function spawnrocks(){
 if (frameCount % 60 === 0){
   var rocky = createSprite(600,165,10,40);
   rocky.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: rocky.addImage(rock);
break;
default:break
   
    //assign scale and lifetime to the obstacle           
  rock.scale = 0.5;
    rock.lifetime = 300;
   
   //add each obstacle to the group
    rockGroup.add(rock);
 }
}
function spawnhay() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var hays = createSprite(600,120,40,10);
    hays.y = Math.round(random(80,120));
    hays.addImage(hayimage);
    hays.scale = 0.5;
    hays.velocityX = -3;
    
     //assign lifetime to the variable
    hays.lifetime = 200;
    
    //adjust the depth
    hays.depth = horse.depth;
    horse.depth = horse.depth + 1;
    
    //add each cloud to the group
    hayGroup.add(hay);
  }
}
function reset(){
  gameState = PLAY;
//  restart.visible = false;
  //gameOver.visible = false;
  
  hayGroup.destroyEach();
  rockGroup.destroyEach();
  score = 0;
}
}