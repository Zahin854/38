var PLAY = 1;
var END = 0;
var gameState = PLAY;

var mouse,mouseImage,mouse_collided
var ground, invisibleGround;

var cheeseGroup, cheeseImage;
var obstaclesGroup, obstacle;
var Restart,RestartImage;
var score;
 var tries=0
var backgroundImage

function preload(){
 mouseImage=loadImage("mouse.jpg")
  mouse_collided=loadImage("dizzy.jpg")
  backgroundImage=loadImage("Background.jpg")

  
  cheeseImage = loadImage("cheese2.png");
  
  obstacleImage = loadImage("obstacle.jpg");
  RestartImage=loadImage("restart.png");
}

function setup() {
  createCanvas(displayWidth - 20, displayHeight-30);
  
  mouse = createSprite(50,displayHeight-50,20,50);
  mouse.addImage("mouse",mouseImage)
  mouse.scale = 0.2;
  
  ground = createSprite(400,displayHeight-50,displayWidth*5 ,20);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  
  
  obstaclesGroup = createGroup();
  cheeseGroup = createGroup();
  Restart=createSprite(300,130,20,20);
  Restart.addImage("restart",RestartImage)
  Restart.scale=0.5
  
  mouse.setCollider("circle",0,0,40);

  score = 0
}

function draw() {
  background(backgroundImage);
  text("Score: "+ score, 500,350);
  text("Turns used: "+ tries, 500,360);
  //console.log("this is ",gameState)
  camera.position.x = mouse.position.x + displayWidth / 4
  camera.position.y = 300
 
  if(gameState === PLAY){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(mouse.collide(cheeseGroup))
{
  score=score+5
  cheeseGroup.destroyEach();
  obstaclesGroup.destroyEach();
  ground.velocityX = 0;
}
if(tries>=3){
  ground.velocityX = 0;
     obstaclesGroup.setLifetimeEach(-1)
     cheeseGroup.setLifetimeEach(-1)
     obstaclesGroup.setVelocityXEach(0);
     cheeseGroup.setVelocityXEach(0);
     mouse.velocityY=0
     mouse.y=400
     fill("black")
     text("Sorry, there are",265,100)
     text("No More retries avaliable",250,160)
}
    if(keyDown("space")&& mouse.y >=320) {
        mouse.velocityY = -18;
    }
    if (mouse.y >=570) {
      glitch()
  }
  //if(){
//glitch()
 // }
    mouse.velocityY = mouse.velocityY + 0.8
    spawnCheese();
  
    spawnObstacles();
    Restart.visible=false
    
    if(obstaclesGroup.isTouching(mouse)){
        gameState = END;
        tries++
        mouse.changeImage("collided" , mouse_collided);
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
     obstaclesGroup.setLifetimeEach(-1)
     cheeseGroup.setLifetimeEach(-1)
     obstaclesGroup.setVelocityXEach(0);
     cheeseGroup.setVelocityXEach(0);
     // mouse.changeImage("collided" , mouse_collided);
     mouse.velocityY=0
     mouse.y=400
    Restart.visible=true
     fill("black")
     text("Game Over",265,100)
     text("Click To Restart Game",250,160)
     if(mousePressedOver(Restart)){
       gameState=PLAY
      // mouse.x=mouse.x+100
       Restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cheeseGroup.destroyEach();
  
  score = 0;
  
     }
   }
 mouse.collide(ground);
  drawSprites();
}

function spawnObstacles(){
 if (random(0,1) > 0.995){
   var obstacle = createSprite(camera.position.x + displayWidth, displayHeight - 50 - 15, 30, 30);
   obstacle.addImage(obstacleImage)
   obstacle.velocityX = -6;      
    obstacle.scale = 0.05;
    obstacle.lifetime = 1000;
    obstaclesGroup.add(obstacle);
 }
}

function spawnCheese() {
   if (random(0,1) > 0.995) {
     cheese = createSprite(camera.position.x + displayWidth, displayHeight - 50 - 15, 30, 30);
    cheese.y = Math.round(random(390,440));
    cheese.addImage(cheeseImage);
    cheese.scale = 0.05;
    cheese.velocityX = -3;
    cheese.lifetime =1000;
   cheeseGroup.add(cheese);
    }
}
function glitch(){
  ground.velocityX = 0;
  obstaclesGroup.setLifetimeEach(-1)
  cheeseGroup.setLifetimeEach(-1)
  //obstaclesGroup.setVelocityXEach(0);
  //cheeseGroup.setVelocityXEach(0);
  // mouse.changeImage("collided" , mouse_collided);
  mouse.velocityY=0
  mouse.y=400
 Restart.visible=true
  fill("black")
  text("Sorry, There appers to be a glitch",265,100)
  text("Click To Continue Game",250,160)
  if(mousePressedOver(Restart)){
    gameState=PLAY
   // mouse.x=mouse.x+100
    Restart.visible = false;

obstaclesGroup.destroyEach();
cheeseGroup.destroyEach();

}}