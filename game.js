// إعداد Web3
let web3;
let userAccount;
const NES3_ADDRESS = "0x9b4b566ca7d64acb51174187b0fb430f2aa2962b";
const DAF1_ADDRESS = "0x28227c3bb846f716cff8c7b4328dfc28fd3d3819";

// محفظة داخل اللعبة
let gameWallet = { NES3: 0, DAF1: 0 };

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
    // يمكن إضافة ربط حقيقي لاحقاً مع Smart Contract
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

// لعبة Canvas سيارات
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let car = { x: 370, y: 500, width: 60, height: 100, color: "#0f0" };
let speed = 5;
let obstacles = [];

function createObstacle() {
    const width = Math.random() * 100 + 50;
    const x = Math.random() * (canvas.width - width);
    obstacles.push({ x, y: -100, width, height: 20, color: "#f00" });
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = car.color;
    ctx.fillRect(car.x, car.y, car.width, car.height);
    obstacles.forEach(ob => {
        ctx.fillStyle = ob.color;
        ctx.fillRect(ob.x, ob.y, ob.width, ob.height);
        ob.y += speed;
        if (ob.y > canvas.height) { 
            gameWallet.NES3 += 1; 
            gameWallet.DAF1 += 1; 
            ob.y = -100;
            ob.x = Math.random() * (canvas.width - ob.width);
        }
        if (car.x < ob.x + ob.width && car.x + car.width > ob.x &&
            car.y < ob.y + ob.height && car.y + car.height > ob.y) {
                alert("لقد اصطدمت! اللعب مستمر، العملات محفوظة في محفظة اللعبة");
                car.x = 370; car.y = 500;
        }
    });
    requestAnimationFrame(draw);
}

document.addEventListener('keydown', (e) => {
    if (e.key === "ArrowLeft") car.x -= 20;
    if (e.key === "ArrowRight") car.x += 20;
});

setInterval(createObstacle, 2000);
draw();
