// محفظة اللاعب
let wallet = {
  nes3: 0,
  daf1: 0,
  lastLogin: 0
};

// تحميل المحفظة من LocalStorage
if(localStorage.getItem("wallet")){
  wallet = JSON.parse(localStorage.getItem("wallet"));
}
updateWalletUI();

// تحديث الرصيد في الصفحة
function updateWalletUI(){
  const nes = document.getElementById("nes3");
  const daf = document.getElementById("daf1");
  if(nes) nes.innerText = wallet.nes3;
  if(daf) daf.innerText = wallet.daf1;
}

// المكافأة اليومية
const dailyBtn = document.getElementById("dailyBonus");
if(dailyBtn){
  dailyBtn.addEventListener("click", () => {
    const now = Date.now();
    if(now - wallet.lastLogin >= 24*60*60*1000){ // 24 ساعة
      wallet.daf1 += 3; // المكافأة اليومية 3 DAF1
      wallet.lastLogin = now;
      localStorage.setItem("wallet", JSON.stringify(wallet));
      document.getElementById("message").innerText = "You claimed 3 DAF1!";
      updateWalletUI();
    } else {
      const remaining = 24*60*60*1000 - (now - wallet.lastLogin);
      const hours = Math.floor(remaining/1000/60/60);
      const mins = Math.floor((remaining/1000/60)%60);
      document.getElementById("message").innerText = `Next bonus in ${hours}h ${mins}m`;
    }
  });
}

// السحب
function withdraw(currency, amount){
  if(currency === 'nes3' && wallet.nes3 >= 10){
    wallet.nes3 -= amount;
    alert(`Withdrawn ${amount} NES3!`);
  } else if(currency === 'daf1' && wallet.daf1 >= 10){
    wallet.daf1 -= amount;
    alert(`Withdrawn ${amount} DAF1!`);
  } else {
    alert("Minimum 10 NES3 or 10 DAF1 required to withdraw.");
  }
  updateWalletUI();
}
