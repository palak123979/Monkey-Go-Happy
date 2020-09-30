var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running , monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var ground, groundImg
var bananaImg
var foodGroup, obstacleGroup
var gameover, gameoverImg
var survivalTime = 0;
var score= 0 ;

function preload(){
    
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_collided = loadAnimation("monkey0.png");
  monkeyEnd = loadImage("sprite_0.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("obstacle.png");
  gameoverImg = loadImage("gameovr.png");
  
}

function setup() {
  createCanvas(400,330);
  
  monkey = createSprite(50,320,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(50,325,1000,10);
  ground.velocityX = -2;
  ground.x = ground.width /2;
  
  gameover = createSprite(200,170,10,10);
  gameover.addImage(gameoverImg);
  //gameover.scale = 0.8;
  gameover.visible = false;

  foodGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background("lightBlue");
  
  stroke("white");
  textSize(16);
  fill("white");
  text("Score: "+score,280,50);
  
  //Play
  if (gameState===PLAY){
  stroke("black"); 
  textSize(16);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,80,50);
    
    
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  spawnBananas();
  spawnObstacles();
    
     if ( foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();   
       score = score+10;
  }
     if ( monkey.isTouching(obstacleGroup)) {
       gameState=END;
     }
  }
  
  else 
    
    if (gameState===END){
    gameover.visible = true;
    ground.velocityX = 0;
    monkey.visible = false;
    obstacleGroup.destroyEach();
    foodGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
  }
  drawSprites();
    
}

function spawnBananas() {
  
  if (frameCount % 120 === 0) {
    banana = createSprite(390,330,10,10);
    banana.y = Math.round(random(150,250));
    banana.addImage(bananaImg);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime=400;
    foodGroup.add(banana);
  }
 
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
   obstacles = createSprite(400,305,10,10);
   obstacles.addImage(obstacleImg);
   obstacles.x = Math.round(random(300,390));
   obstacles.velocityX = -3;
   obstacles.scale = 0.1;
   obstacles.lifetime=400;
   obstacleGroup.add(obstacles);
   
  }
}



