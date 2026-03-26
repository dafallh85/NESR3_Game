const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 640;

// اللاعب
let eagle = {x:50, y:300, width:50, height:50, dy:0};

// العملات
let nes3Count = 0;
let daf1Count = 0;

// الخلفيات
let bgImages = [];
let currentBG = 0;
bgImages[0] = new Image(); bgImages[0].src = "assets/bg_forest.png";
bgImages[1] = new Image(); bgImages[1].src = "assets/bg_mountains.png";
bgImages[2] = new Image(); bgImages[2].src = "assets/bg_sea.png";

// النسر
let eagleImg = new Image();
eagleImg.src = "assets/eagle.png";

// العملات
let nes3Img = new Image(); nes3Img.src = "assets/nes3.png";
let daf1Img = new Image(); daf1Img.src = "assets/daf1.png";
let coins = [];

// العقبات
let obstacles = [];
let frame = 0;

// التحكم
document.addEventListener("keydown", e => { if(e.code==="Space") eagle.dy=-10; });
document.addEventListener("click", e => { eagle.dy=-10; });

// شحن العملات (محاكاة)
function chargeNES3(){ nes3Count += 10; document.getElementById("nes3-count").innerText = nes3Count; }
function chargeDAF1(){ daf1Count += 10; document.getElementById("daf1-count").innerText = daf1Count; }

// إنشاء عملات وعقبات
function spawnItems(){
  if(frame % 150 === 0){
    coins.push({x:canvas.width, y:Math.random()*500+50, type:"nes3"});
  }
  if(frame % 250 === 0){
    coins.push({x:canvas.width, y:Math.random()*500+50, type:"daf1"});
  }
  if(frame % 200 === 0){
    obstacles.push({x:canvas.width, y:canvas.height-100, width:50, height:100});
  }
}

// رسم اللعبة
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // خلفية
  ctx.drawImage(bgImages[currentBG],0,0,canvas.width,canvas.height);

  // النسر
  eagle.dy += 0.5; // جاذبية
  eagle.y += eagle.dy;
  ctx.drawImage(eagleImg, eagle.x, eagle.y, eagle.width, eagle.height);

  // جمع العملات
  for(let i=coins.length-1; i>=0; i--){
    coins[i].x -= 2;
    let img = coins[i].type==="nes3"? nes3Img : daf1Img;
    ctx.drawImage(img, coins[i].x, coins[i].y, 30,30);
    // اصطدام
    if(eagle.x<coins[i].x+30 && eagle.x+eagle.width>coins[i].x &&
       eagle.y<coins[i].y+30 && eagle.y+eagle.height>coins[i].y){
         if(coins[i].type==="nes3"){ nes3Count++; document.getElementById("nes3-count").innerText=nes3Count; }
         else{ daf1Count++; document.getElementById("daf1-count").innerText=daf1Count; }
         coins.splice(i,1);
    }
    if(coins[i] && coins[i].x < -30) coins.splice(i,1);
  }

  // العقبات
  for(let i=obstacles.length-1;i>=0;i--){
    obstacles[i].x -= 3;
    ctx.fillStyle="green";
    ctx.fillRect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
    // اصطدام
    if(eagle.x<obstacles[i].x+obstacles[i].width && eagle.x+eagle.width>obstacles[i].x &&
       eagle.y<obstacles[i].y+obstacles[i].height && eagle.y+eagle.height>obstacles[i].y){
         resetGame();
    }
    if(obstacles[i].x < -50) obstacles.splice(i,1);
  }

  // الأرض والسماء
  if(eagle.y + eagle.height > canvas.height || eagle.y < 0) resetGame();

  // تغيير الخلفية
  if(frame % 1000 === 0){ currentBG = (currentBG+1)%bgImages.length; }

  frame++;
  spawnItems();
  requestAnimationFrame(draw);
}

function resetGame(){
  eagle.y=300; eagle.dy=0;
  coins=[]; obstacles=[]; frame=0;
}

draw();
