var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");  
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
}

function draw() {
  background(200);
  
  if(gameState === "play")
  {

    // Tower scrolling infinitely
      if(tower.y > 400)
      {
        tower.y = 300
      }

      //calling function spawwDoors
      spawnDoors();

      if(keyDown("space"))
      {
        ghost.velocityY = -2;
      }
      
      //implementing Gravity
      ghost.velocityY += 0.8;

      if(keyDown("left_arrow"))
      {
        ghost.X -= 3;
      }

      if(keyDown("right_arrow"))
      {
        ghost.X += 3;
      }

      if(climbersGroup.isTouching(ghost))
      {
        ghost.velocityY = 0
      }
  }

  if(gameState = "end")
  {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("gameOver",230,250);
  }
  drawSprites();
}

//defineing the function spawnDoors
function spawnDoors()
{
  if(frameCount % 240 == 0)
  {
    var door = createSprite(200,-50);
    door.addImage(doorImg);

    var climber = createSprite(200,10);
    climber.addImage(climberImg);

    door.velocityY = 1;
    door.X = Math.round(random(120,400));

    climber.velocityY = door.velocityY;
    climber.X = door.X;

    ghost.depth = door.depth + 1

    door.lifeTime = 800;
    doorsGroup.add(door);

    climber.lifeTime = door.lifeTime;
    climbersGroup.add(climber);

    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.hieght = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = door.velocityY;
    invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);
  }
}








