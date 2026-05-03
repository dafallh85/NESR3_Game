function enterGame(){
  document.getElementById("welcome").style.display="none";
  document.getElementById("home").style.display="block";
}

function goGame(){
  window.location.href="game.html";
}

function goWallet(){
  window.location.href="wallet.html";
}

/* أصوات */
let moveSound = new Audio('assets/move.mp3');
let coinSound = new Audio('assets/coin.mp3');
let crashSound = new Audio('assets/crash.mp3');

/* اللعبة */
let carX = 150;
let score=0, coins=0, level=1, speed=5;

let enemies=[], coinList=[];

document.addEventListener("keydown",(e)=>{
  let car=document.getElementById("car");
  if(!car) return;

  moveSound.play();

  if(e.key==="ArrowLeft") carX-=20;
  if(e.key==="ArrowRight") carX+=20;

  car.style.left=carX+"px";
});

function spawnEnemy(){
  let e=document.createElement("div");
  e.className="enemy";
  e.style.left=Math.random()*340+"px";
  e.style.top="0px";
  game.appendChild(e);
  enemies.push(e);
}

function spawnCoin(){
  let c=document.createElement("div");
  c.className="coin";
  c.style.left=Math.random()*340+"px";
  c.style.top="0px";
  game.appendChild(c);
  coinList.push(c);
}

function update(){
  speed = 5 + Math.floor(score/20);
  level = Math.floor(score/20)+1;

  enemies.forEach((e,i)=>{
    let top=parseInt(e.style.top)||0;
    e.style.top=top+speed+"px";

    if(top>500 && Math.abs(e.offsetLeft-carX)<50){
      crashSound.play();
      alert("Game Over");
      location.reload();
    }

    if(top>600){
      e.remove();
      enemies.splice(i,1);
      score++;
    }
  });

  coinList.forEach((c,i)=>{
    let top=parseInt(c.style.top)||0;
    c.style.top=top+speed+"px";

    if(top>500 && Math.abs(c.offsetLeft-carX)<50){
      coinSound.play();
      coins++;
      c.remove();
      coinList.splice(i,1);
    }

    if(top>600){
      c.remove();
      coinList.splice(i,1);
    }
  });

  document.getElementById("score").innerText=score;
  document.getElementById("coins").innerText=coins;
  document.getElementById("level").innerText=level;
}

let game=document.getElementById("game");

setInterval(update,30);
setInterval(spawnEnemy,1000);
setInterval(spawnCoin,1500);
