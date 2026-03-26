// ===== إعداد اللعبة =====
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// اللاعب
let player = { x: 370, y: 500, width: 60, height: 100, speed: 7 };

// سيارات عادية وشرطة
let enemies = [];
let police = [];

// محفظة اللعبة
let gameWallet = { NES3: 0, DAF1: 0 };

// Web3 و MetaMask
let web3;
let userAccount;
const NES3_ADDRESS = "0x9b4b566ca7d64acb51174187b0fb430f2aa2962b";
const DAF1_ADDRESS = "0x28227c3bb846f716cff8c7b4328dfc28fd3b";

// ===== وظائف المحفظة =====
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            userAccount = accounts[0];
            document.getElementById('status').innerText = `الحالة: متصل بـ ${userAccount}`;
        } catch (err) { console.error(err); alert("فشل الاتصال بالمحفظة"); }
    } else { alert("يرجى تثبيت MetaMask"); }
}

function depositToken(token) {
    alert(`إيداع ${token} قريبًا!`); 
    // يمكن ربط العقد الحقيقي لاحقاً
}

function buyToken(token) {
    alert(`شراء ${token} بالريال السعودي قريبًا!`);
}

function withdrawToken(token) {
    if (!userAccount) { alert("يرجى ربط المحفظة أولاً"); return; }
    const amount = gameWallet[token];
    if (amount <= 0) { alert("لا يوجد رصيد للسحب"); return; }
    alert(`تم سحب ${amount} ${token} إلى محفظتك: ${userAccount}`);
    gameWallet[token] = 0;
}

// الأحداث
document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
document.getElementById('depositBtn').addEventListener('click', () => depositToken("NES3 / DAF1"));
document.getElementById('buyTokenBtn').addEventListener('click', () => buyToken("NES3 / DAF1"));
document.getElementById('withdrawBtn').addEventListener('click', () => {
    withdrawToken("NES3");
    withdrawToken("DAF1");
});

// ===== إنشاء سيارات =====
function spawnEnemy() {
    let x = Math.random() * (canvas.width - 60);
    enemies.push({ x: x, y: -100, width: 60, height: 100, speed: 4 });
}

function spawnPolice() {
    let x = Math.random() * (canvas.width - 60);
    police.push({ x: x, y: -200, width: 60, height: 100, speed: 6 });
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

        if (car.y > canvas.height) {
            gameWallet.NES3 += 1;
            gameWallet.DAF1 += 1;
            enemies.splice(index, 1);
        }

        if (collision(player, car)) {
            alert("💥 اصطدمت! الشرطة ستظهر!");
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
            alert("🚓 تم القبض عليك! العملات في محفظة اللعبة تم مسحها");
            gameWallet.NES3 = 0;
            gameWallet.DAF1 = 0;
            police = [];
        }

        if (p.y > canvas.height) police.splice(index, 1);
    });

    // عرض العملات
    ctx.fillStyle = "#ffffff";
    ctx.font = "16px Arial";
    ctx.fillText("NES3: " + gameWallet.NES3, 10, 20);
    ctx.fillText("DAF1: " + gameWallet.DAF1, 10, 40);

    requestAnimationFrame(draw);
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
