

const ad = "Kubra Nimet Akmansoy";

console.log(ad);

let sayi = 10;
sayi = 20;

console.log(sayi);

const metin = "JavaScript ogreniyorum";
const yas = 23;
const ogreniyorum = true;
const tamamlandi = false;

console.log(typeof metin);
console.log(typeof yas);
console.log(typeof ogreniyorum);
console.log(typeof tamamlandi);

console.log(10 + 5);
console.log("merhaba " + "canım");
console.log(`merhaba tatlim ben ${ad} hosgeldin orkidem`);

console.log(metin.length);

const boslukluMetin = "      HTML calis                           ";
console.log(boslukluMetin.trimStart());
console.log(boslukluMetin.trimEnd());
console.log(boslukluMetin.trim());

console.log(10 === 10); // true
console.log(10 === 5);  // false

console.log(10 !== 5);  // true
console.log(10 !== 10); // false

console.log(10 > 5 && 20 > 10); // true
console.log(10 > 5 && 20 < 10); // false


if (sayi > 10) {
    console.log("Sayı 10'dan büyük.");
} else {
    console.log("Sayı 10'dan büyük değil.");
}


const gorevMetni = "";

if (gorevMetni.trim() === "") {
    console.log("Görev metni boş.");
} else {
    console.log("Görev metni dolu.");
}


const uzunMetin = "HTML çalış";

if (uzunMetin.length > 200) {
    console.log("Metin 200 karakterden uzun.");
} else {
    console.log("Metin uzunluğu uygun.");
}



function selamVer() {
    console.log("Merhaba!");
}

selamVer();


function kisiyeSelamVer(isim) {
    console.log(`Merhaba, ${isim}!`);
}

kisiyeSelamVer("Kübra");
kisiyeSelamVer("Nimet");


function tanitimOlustur(isim) {
    return `Benim adım ${isim}.`;
}

const tanitim = tanitimOlustur("Kübra");
console.log(tanitim);


function topla(a, b) {
    return a + b;
}

console.log(topla(10, 5)); // 15


function metinTemizle(metin) {
    return metin.trim();
}

console.log(metinTemizle("   HTML çalış   "));


function gorevBosMu(metin) {
    return metin.trim() === "";
}

console.log(gorevBosMu("   "));       
console.log(gorevBosMu("HTML çalış")); 


function gorevKontrolEt(metin) {
    if (gorevBosMu(metin)) {
        return "Görev boş olamaz.";
    }

    return "Görev uygun.";
}

console.log(gorevKontrolEt(""));


const ikiKatiniAl = (sayi) => {
    return sayi * 2;
};

console.log(ikiKatiniAl(5)); 


const konular = ["HTML", "CSS", "JavaScript"];


console.log(konular[0]); 


console.log(konular[konular.length - 1]); 


console.log(konular.length);

konular.push("Siber Güvenlik");
console.log(konular);


konular[0] = "Full Stack";
console.log(konular);


for (const konu of konular) {
    console.log(konu);
}

konular.forEach((konu) => {
    console.log(konu);
});



const konuMesajlari = konular.map((konu) => {
    return `${konu} öğreniyorum.`;
});

console.log(konuMesajlari);

const uzunKonular = konular.filter((konu) => {
    return konu.length > 5;
});

console.log(uzunKonular);

const bulunanKonu = konular.find((konu) => {
    return konu === "CSS";
});

console.log(bulunanKonu);

const gorev00 = {};
const gorev = {
    id: "gorev-1",
    metin: "HTML çalış",
    tamamlandi: false
}; 


console.log(gorev.metin);


gorev.tamamlandi = true;
console.log(gorev.tamamlandi);


const gorevler = [
    gorev,
    {
        id: "gorev-2",
        metin: "CSS çalış",
        tamamlandi: false
    },
    {
        id: "gorev-3",
        metin: "JavaScript çalış",
        tamamlandi: false
    }
];


const aktifGorevler = gorevler.filter((gorev) => {
    return gorev.tamamlandi === false;
});

console.log(aktifGorevler);


const tamamlananGorevler = gorevler.filter((gorev) => {
    return gorev.tamamlandi === true;
});

console.log(tamamlananGorevler);


const bulunanGorev = gorevler.find((gorev) => {
    return gorev.id === "gorev-2";
});

console.log(bulunanGorev);


const gorevMetinleri = gorevler.map((gorev) => {
    return gorev.metin;
});

console.log(gorevMetinleri);

const gorevlerJSON = JSON.stringify(gorevler);
console.log(gorevlerJSON);

const geriDonusenGorevler = JSON.parse(gorevlerJSON);
console.log(geriDonusenGorevler);

try {
    const bozukJSON = '{"metin": "HTML çalış"';
    const sonuc = JSON.parse(bozukJSON);
    console.log(sonuc);
} catch (hata) {
    console.log("JSON okunamadı:", hata.message);
}

console.log(Array.isArray(geriDonusenGorevler)); // true
console.log(Array.isArray(metin));              // false

