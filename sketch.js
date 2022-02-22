const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let bombImg,coinImg,happyImg,sadImg,stoneImg,walkingImg,backgroundImg;
var person,bomb,coin,stone;
var stoneG;
var score = 0;
 var coinS;

var engine,body;


function preload(){
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
  happyImg = loadImage("happy.png");
  sadImg = loadImage("sad.png");
  stoneImg = loadImage("stone.png");
  walkingImg = loadImage("walking.png");
  backgroundImg = loadImage("nature.jpg");
  coinS = loadSound("coin collection.mp3");
}


function setup() {
  createCanvas(1000,500);

  ground = new Ground(500,490,1200,20);
  ground1 = new Ground(10,270,20,500);
  ground2 = new Ground(990,270,20,500);
  

  engine = Engine.create();
  world = engine.world;

 person = createSprite(500,430,20,20);
 person.addImage("walking",walkingImg);
 person.scale = 1.2;
 person.addImage("happy",happyImg);
 person.addImage("sad",sadImg);

stoneG = createGroup();
coinG = createGroup();
bombG = createGroup()





 
 


  
}


function draw() 
{
  background(51);
  Engine.update(engine);
  image(backgroundImg,0,0,1000,500);

  ground.display();
  ground1.display();
  ground2.display();
  ground1.visible = false;

 

if(keyDown(RIGHT_ARROW)){
    person.x = person.x+10
  }
if(keyDown(LEFT_ARROW)){
    person.x = person.x-10;
  }

if(stoneG.isTouching(person)){
    stoneG.destroyEach()
    person.changeImage("sad",sadImg);
    }

if(bombG.isTouching(person)){
      bombG.destroyEach()
      person.changeImage("sad",sadImg);
    }
    
  if(coinG.isTouching(person)){
    coinG.destroyEach()
   person.changeImage("happy",happyImg);
   score = score+10;
   coinS.play();
        }


  
  
  //spawnStones();
  //spawnCoins();

  var rand=Math.round(random(1,2,3))
  if(rand===1){
    spawnCoins();
  }
  else if(rand===2){
    spawnBombs();
  }
  else{
    spawnStones();
  }

  drawSprites(); 
  textSize(45);
  text("Score:"+score,10,50)
}


function spawnStones(){
  if(frameCount%100===0){
  stone = createSprite(100,60,30,30);
  stone.addImage("stone",stoneImg);
  stone.x = Math.round(random(10,900))
  stone.scale=0.2;
  stone.velocityY=5;
  stone.lifetime = 80;
  stoneG.add(stone)

  }
}

function spawnCoins(){
  if(frameCount%100===0){
  coin = createSprite(200,100,40,40);
  coin.addImage("coin",coinImg);
  coin.x = Math.round(random(10,900));
  coin.velocityY = 5;
  coin.scale=0.3;
  coin.lifetime = 80;
  coinG.add(coin);
  }
}

function spawnBombs(){
  if(frameCount%100===0){
    bomb = createSprite(200,100,20,20);
    bomb.addImage("bomb",bombImg);   
  bomb.x = Math.round(random(10,900));
  bomb.velocityY = 5;
  bomb.scale = 0.4;
  bomb.lifetime =80;
  bombG.add(bomb);
  }
}

function gameOver() {
  //sweet alert
  swal(
    {
      title: `Game Over!!!`,
      text: "Well Done Pirates",
      imageUrl:
        "https://www.pngkit.com/png/full/403-4036534_sailing-boat-illustration-vector-cartoon-chart-cartoon-boat.png",
      imageSize: "50x50",
      confirmButtonText: "Reset"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}
