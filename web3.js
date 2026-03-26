// ===== Web3 Setup =====
let web3;
let userAccount = null;

// عناوين التوكن
const NES3_ADDRESS = "0x9b4b566ca7d64acb51174187b0fb430f2aa2962b";
const DAF1_ADDRESS = "0x28227c3bb846f716cff8c7b4328dfc28fd3d3819";

// ABI مبسط
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner","type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance","type": "uint256"}],
    "type": "function"
  }
];

// ===== ربط المحفظة =====
async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      userAccount = accounts[0];

      document.getElementById("status").innerText =
        "متصل: " + userAccount;

      getBalances();

    } catch (error) {
      alert("فشل الاتصال بالمحفظة");
    }
  } else {
    alert("ثبت MetaMask أولاً");
  }
}

// ===== قراءة الرصيد =====
async function getBalances() {
  if (!userAccount) return;

  const nes3 = new web3.eth.Contract(ERC20_ABI, NES3_ADDRESS);
  const daf1 = new web3.eth.Contract(ERC20_ABI, DAF1_ADDRESS);

  try {
    let nes3Balance = await nes3.methods.balanceOf(userAccount).call();
    let daf1Balance = await daf1.methods.balanceOf(userAccount).call();

    document.getElementById("status").innerText =
      `NES3: ${nes3Balance} | DAF1: ${daf1Balance}`;

  } catch (e) {
    console.log(e);
  }
}

// ===== الإيداع =====
function depositTokens() {
  alert("أرسل العملات إلى:\n0x28227c3bb846f716cff8c7b4328dfc28fd3d3819");
}

// ===== السحب =====
function withdrawFromGame() {
  alert("السحب الفعلي قريب 🔥");
}

// ===== الشراء =====
function buyTokens() {
  alert("الشراء بالريال السعودي عبر App Store قريب 🚀");
}
