// ===== إعداد اللعبة =====
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// اللاعب
let player = {
  x: 350,
  y: 400,
  width: 60,
  height: 100,
  speed: 7
};

// سيارات أخرى
let enemies = [];
let police = [];

// محفظة اللعبة
let gameWallet = { NES3: 0, DAF1: 0 };

// ===== إنشاء سيارات =====
function spawnEnemy() {
  let x = Math.random() * (canvas.width - 60);
  enemies.push({ x: x, y: -100, width: 60, height: 100, speed: 4 });
}

// 🚓 شرطة
function spawnPolice() {
  let x = Math.random() * (canvas.width - 60);
  police.push({ x: x, y: -200, width: 60, height: 100, speed: 6 });
}

// ===== الرسم =====
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // اللاعب
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // سيارات عادية
  enemies.forEach((car, index) => {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(car.x, car.y, car.width, car.height);
    car.y += car.speed;

    // ربح
    if (car.y > canvas.height) {
      gameWallet.NES3 += 1;
      gameWallet.DAF1 += 1;
      enemies.splice(index, 1);
    }

    // تصادم
    if (collision(player, car)) {
      alert("💥 اصطدمت! الشرطة راح تلحقك!");
      spawnPolice();
      enemies.splice(index, 1);
    }
  });

  // 🚓 الشرطة
  police.forEach((p, index) => {
    ctx.fillStyle = "#00ccff";
    ctx.fillRect(p.x, p.y, p.width, p.height);
    p.y += p.speed;

    if (collision(player, p)) {
      alert("🚓 تم القبض عليك!");
      gameWallet.NES3 = 0;
      gameWallet.DAF1 = 0;
      police = [];
    }

    if (p.y > canvas.height) {
      police.splice(index, 1);
    }
  });

  // عرض العملات
  ctx.fillStyle = "#ffffff";
  ctx.fillText("NES3: " + gameWallet.NES3, 10, 20);
  ctx.fillText("DAF1: " + gameWallet.DAF1, 10, 40);

  requestAnimationFrame(draw);
}

// ===== التصادم =====
function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

// ===== التحكم =====
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
});

// ===== تشغيل =====
setInterval(spawnEnemy, 1500);
setInterval(spawnPolice, 7000);
draw();
