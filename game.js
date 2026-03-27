// =========================
// GAME NESR3 - Main JS
// =========================

// محفظة اللاعب
let wallet = {
  nes3: 0,
  daf1: 0,
  lastLogin: 0
};

// تحميل المحفظة من LocalStorage إذا موجودة
if (localStorage.getItem("wallet")) {
  wallet = JSON.parse(localStorage.getItem("wallet"));
}
updateWalletUI();

// =========================
// تحديث الرصيد في الصفحة
// =========================
function updateWalletUI() {
  const nes = document.getElementById("nes3");
  const daf = document.getElementById("daf1");
  if (nes) nes.innerText = wallet.nes3;
  if (daf) daf.innerText = wallet.daf1;
}

// =========================
// المكافأة اليومية (DAF1 فقط)
// =========================
const dailyBtn = document.getElementById("dailyBonus");
if (dailyBtn) {
  dailyBtn.addEventListener("click", () => {
    const now = Date.now();
    if (now - wallet.lastLogin >= 24 * 60 * 60 * 1000) { // 24 ساعة
      wallet.daf1 += 3; // المكافأة ثابتة 3 DAF1
      wallet.lastLogin = now;
      localStorage.setItem("wallet", JSON.stringify(wallet));
      document.getElementById("message").innerText = "You claimed 3 DAF1!";
      updateWalletUI();
    } else {
      const remaining = 24 * 60 * 60 * 1000 - (now - wallet.lastLogin);
      const hours = Math.floor(remaining / 1000 / 60 / 60);
      const mins = Math.floor((remaining / 1000 / 60) % 60);
      document.getElementById("message").innerText = `Next bonus in ${hours}h ${mins}m`;
    }
  });
}

// =========================
// نظام السحب (حد أدنى 10 عملة)
// =========================
function withdraw(currency, amount) {
  if (currency === 'nes3' && wallet.nes3 >= 10) {
    wallet.nes3 -= amount;
    alert(`Withdrawn ${amount} NES3!`);
  } else if (currency === 'daf1' && wallet.daf1 >= 10) {
    wallet.daf1 -= amount;
    alert(`Withdrawn ${amount} DAF1!`);
  } else {
    alert("Minimum 10 NES3 or 10 DAF1 required to withdraw.");
  }
  updateWalletUI();
}

// =========================
// تحميل الصور من مجلد assets
// =========================
let carImg = new Image();
carImg.src = "assets/car.png";

let eagleImg = new Image();
eagleImg.src = "assets/eagle.png";

let forestImg = new Image();
forestImg.src = "assets/forest.png";

let airplaneImg = new Image();
airplaneImg.src = "assets/airplane.png";

let backgroundImg = new Image();
backgroundImg.src = "assets/background.png";

// =========================
// مثال بسيط للعبة السيارات
// =========================
function startCarGame() {
  const canvas = document.getElementById("carGame");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let x = 50;
  let y = canvas.height - 100;
  const speed = 5;

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(carImg, x, y, 80, 50);

    requestAnimationFrame(gameLoop);
  }
  gameLoop();

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") x += speed;
    if (e.key === "ArrowLeft") x -= speed;
  });
}

// =========================
// مثال بسيط للعبة النسر
// =========================
function startEagleGame() {
  const canvas = document.getElementById("eagleGame");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let x = 50;
  let y = 50;
  const speed = 4;

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(eagleImg, x, y, 80, 50);

    requestAnimationFrame(gameLoop);
  }
  gameLoop();

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") y -= speed;
    if (e.key === "ArrowDown") y += speed;
    if (e.key === "ArrowRight") x += speed;
    if (e.key === "ArrowLeft") x -= speed;
  });
}

// =========================
// مثال بسيط للعبة الغابات
// =========================
function startForestGame() {
  const canvas = document.getElementById("forestGame");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let x = 50;
  let y = canvas.height - 100;
  const speed = 4;

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(forestImg, x, y, 80, 50);

    requestAnimationFrame(gameLoop);
  }
  gameLoop();

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") x += speed;
    if (e.key === "ArrowLeft") x -= speed;
    if (e.key === "ArrowUp") y -= speed;
    if (e.key === "ArrowDown") y += speed;
  });
}

// =========================
// مثال بسيط للعبة الطيارات
// =========================
function startAirplaneGame() {
  const canvas = document.getElementById("airplaneGame");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let x = 50;
  let y = 50;
  const speed = 5;

  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(airplaneImg, x, y, 80, 50);

    requestAnimationFrame(gameLoop);
  }
  gameLoop();

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") y -= speed;
    if (e.key === "ArrowDown") y += speed;
    if (e.key === "ArrowRight") x += speed;
    if (e.key === "ArrowLeft") x -= speed;
  });
}

// =========================
// بدء الألعاب عند تحميل الصفحة
// =========================
document.addEventListener("DOMContentLoaded", () => {
  startCarGame();
  startEagleGame();
  startForestGame();
  startAirplaneGame();
});
