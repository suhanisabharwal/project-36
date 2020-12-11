var dog,dogImg,dogImg1;
 var database; 
 var foodS,foodStock;
 foodS = 0
 var milkfood;
 var feed;
 var feedtime;

function preload()
{
dogImg = loadImage("images/dogImg.png");
dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 400);
  database = firebase.database();
  milkfood = new Food();
  dog = createSprite(800,200,150,150);
  dog.addImage(dogImg)
  dog.scale = 0.2;
  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock);
  feedtime=database.ref('Feedtime');
  feedtime.on("value", readtime); 
  feed = createButton("feedDog")
  feed.position(700,95)
  feed.mousePressed(feeding);

  
}


function draw() {  

  drawSprites();
  //add styles here
  textSize(30)
  if (foodS !== undefined){
 text("food remaining" +foodS, 170, 200);}
 if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
   dog.addImage(dogImg1); }

   milkfood.display();
}

function readStock(data){ 
  foodS=data.val();
  milkfood.updateFoodStock(foodS)
  console.log(foodS)
 }

 function writeStock(x){ 
   if(x<=0){ x=0; 
  }
  
  else{ 
    x=x-1;
   } 
   database.ref('/').update({ Food:x }) }

 function feeding(){
  dog.addImage(dogImg)
  milkfood.updateFoodStock(milkfood.getFoodStock()-1); 
  database.ref('/').update({ Food:milkfood.getFoodStock(), FeedTime:hour() })

}

function readtime(data){ 
  lastfed=data.val();
  console.log(foodS)
 }
