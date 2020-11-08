var play = 1;
var end = 0;
var gameState="play";

var tower , towerImage ;
var door , doorImage , doorsGroup ; 
var climber , climberImage , climbersGroup;
var ghost , ghostImage , ghostJumpingImage;
var invisibleBlockGroup , invisibleBlock;

function preload(){
  towerImage=loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage=loadImage("ghost-standing.png");
  ghostJumpingImage=loadImage("ghost-jumping.png");
  
  
}




function setup (){
  createCanvas(600,600);
  
  tower=createSprite(200,200,20,20);
  tower.addImage(towerImage);
  tower.scale=0.5;
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
}




function draw(){
   background(0);
  
 
  if(gameState==="play"){
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-10;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  
  
  
  if(climbersGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
    
  spawnDoors();
  
  drawSprites();
  }
    
  if(gameState==="end"){
    textSize(20);
    fill("red");
    text("GAME OVER",230,250)
  }
  
}


function spawnDoors(){
  if(frameCount%240===0){
   var door=createSprite(200,-50);
    door.addImage(doorImage);
    door.x=Math.round(random(120,400));
    door.scale=0.5;
    door.velocityY=1;
    door.lifetime=800;
    
    doorsGroup.add(door);
     ghost.Depth=door.Depth;
     ghost.Depth=ghost.Depth+1;
    
    var climber = createSprite(200,10);
    climber.addImage("climber",climberImage);
    climber.scale=0.5;
    climber.x=door.x
    climber.velocityY=1;
    climber.lifetime=800;
    
    climbersGroup.add(climber);
    
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width=climber.width;
    invisibleBlock.debug=true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}