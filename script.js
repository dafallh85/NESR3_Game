let score = 0;
let level = 1;
let currentWorld = "-";

// العملات الرقمية
let nes3 = 0;
let daf1 = 0;
let usdt = 0;
let usdG = 0;

function selectWorld(world) {
    currentWorld = world;
    document.getElementById('currentWorld').innerText = currentWorld;

    // تغيير الصورة حسب العالم
    let img = document.getElementById('worldImage');
    switch(world) {
        case 'الجو':
            img.src = 'assets/sky.png';
            break;
        case 'المدينة':
            img.src = 'assets/city.png';
            break;
        case 'البحار':
            img.src = 'assets/sea.png';
            break;
        case 'الغابات':
            img.src = 'assets/forest.png';
            break;
        case 'المدن':
            img.src = 'assets/metropolis.png';
            break;
        default:
            img.src = 'assets/placeholder.png';
    }
}

function collectPoints() {
    let points = Math.floor(Math.random() * 10) + 1; // نقاط عشوائية
    score += points;
    document.getElementById('score').innerText = score;
    checkLevelUp();
}

function checkLevelUp() {
    if (score >= level * 50) { // كل 50 نقطة مستوى جديد
        level++;
        alert("🎉 تهانينا! ارتقيت إلى المستوى " + level);
        document.getElementById('level').innerText = level;
    }
}

function convertPoints(crypto) {
    if(score <= 0) {
        alert("❌ لا توجد نقاط للتحويل!");
        return;
    }

    let converted = score; // 1 نقطة = 1 وحدة عملة
    switch(crypto) {
        case 'NES3':
            nes3 += converted;
            document.getElementById('nes3').innerText = nes3;
            break;
        case 'DAF1':
            daf1 += converted;
            document.getElementById('daf1').innerText = daf1;
            break;
        case 'USDT':
            usdt += converted;
            document.getElementById('usdt').innerText = usdt;
            break;
        case 'USDG':
            usdG += converted;
            document.getElementById('usdG').innerText = usdG;
            break;
    }

    score = 0; // إعادة تعيين النقاط بعد التحويل
    document.getElementById('score').innerText = score;
    alert("✅ تم تحويل نقاطك إلى " + crypto);
}

function payCrypto(crypto) {
    let amount = parseInt(prompt("كم وحدة من " + crypto + " تريد شحنها؟"));
    if(isNaN(amount) || amount <= 0) {
        alert("❌ أدخل رقم صحيح!");
        return;
    }

    switch(crypto) {
        case 'NES3':
            nes3 += amount;
            document.getElementById('nes3').innerText = nes3;
            break;
        case 'DAF1':
            daf1 += amount;
            document.getElementById('daf1').innerText = daf1;
            break;
        case 'USDT':
            usdt += amount;
            document.getElementById('usdt').innerText = usdt;
            break;
        case 'USDG':
            usdG += amount;
            document.getElementById('usdG').innerText = usdG;
            break;
    }

    alert("✅ تم شحن " + amount + " " + crypto);
}
