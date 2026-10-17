
// const gorevFormu = document.getElementById("gorev-formu");
// const gorevGirisi = document.getElementById("gorev-metni");
// const gorevListesi = document.getElementById("gorev-listesi");
// const gorevSayaci = document.getElementById("gorev-sayaci");
// const hataMesaji = document.getElementById("gorev-hatasi");
// const bosMesaj = document.getElementById("bos-mesaj");
// const durumMesaji = document.getElementById("durum-mesaji");

// const filtreDugmeleri = document.querySelectorAll(
//     ".gorev-filtreleri button"
// );

// console.log(gorevFormu);
// console.log(gorevGirisi);
// console.log(gorevListesi);
// console.log(filtreDugmeleri);


let gorevler = [];

let aktifFiltre = "tumu";
const MAKSIMUM_GOREV_UZUNLUGU = 200;



const gorevSayaci = document.getElementById("gorev-sayaci");
const bosMesaj = document.getElementById("bos-mesaj");
const durumMesaji = document.getElementById("durum-mesaji");
const gorevHatasi = document.getElementById("gorev-hatasi");
const gorevMetni = document.getElementById("gorev-metni");
const gorevFormu = document.getElementById("gorev-formu");
const gorevListesi = document.getElementById("gorev-listesi");
const filtreDugmeleri = document.querySelectorAll(
    ".gorev-filtreleri button"
);

function gorevleriCiz() {
    gorevListesi.replaceChildren();
    for (const gorev of gorunenGorevleriHesapla()) {
        const li = document.createElement("li");
        li.classList.add("gorev");
        li.dataset.id = gorev.id;
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `gorev-${gorev.id}`;
        checkbox.checked = gorev.tamamlandi;

        checkbox.addEventListener("change", function () {
            const ilgiliGorev = gorevler.find(
                kayit => kayit.id === gorev.id
            );

            if (!ilgiliGorev) {
                return;
            }

            ilgiliGorev.tamamlandi = checkbox.checked;

            durumMesaji.textContent = ilgiliGorev.tamamlandi
                ? `"${ilgiliGorev.metin}" görevi tamamlandı.`
                : `"${ilgiliGorev.metin}" görevi yeniden aktifleştirildi.`;

            gorevleriCiz();

            
        });

        

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = gorev.metin;
        const silmeDugmesi = document.createElement("button");
        silmeDugmesi.type = "button";
        silmeDugmesi.textContent = "Sil";
        silmeDugmesi.setAttribute("aria-label", `${gorev.metin} görevini sil`);

        // Sil düğmesi , görevi diziden siliyor
        silmeDugmesi.addEventListener("click", function () {
            const silinecekGorev = gorevler.find(
                kayit => kayit.id === gorev.id
            );

            if (!silinecekGorev) {
                return;
            }

            const silinenMetin = silinecekGorev.metin;

            gorevler = gorevler.filter(
                kayit => kayit.id !== silinecekGorev.id
            );

            gorevleriCiz();
            durumMesaji.textContent = `"${silinenMetin}" görevi silindi.`;
        });


        li.append(checkbox);
        li.append(label);
        li.append(silmeDugmesi);
        
        if (gorev.tamamlandi) {
            li.classList.add("tamamlandi");
        }
        gorevListesi.append(li);
    }

    sayaciGuncelle();
    bosMesajiGuncelle();

}
gorevFormu.addEventListener("submit", function (event) {
    event.preventDefault();/*javascript ile aynı sayfaya veri gönderilmesini 
    sağlar yani tarayacının başka bir sayfaya veri göndereceğimizi zannedip sayfayı yenilemeyi engeller.*/


    const metin = gorevMetni.value.trim();

    if (metin === "") {
        hataGoster("Lütfen bir görev yaz.");
        return;
    }

    if (metin.length > MAKSIMUM_GOREV_UZUNLUGU) {
        hataGoster(`Görev en fazla ${MAKSIMUM_GOREV_UZUNLUGU} karakter olabilir.`);
        return;
    }

    hataTemizle();

    const yeniGorev = {
        id: gorevKimligiUret(),
        metin: metin,
        tamamlandi : false 
    };

    gorevler.push(yeniGorev);
    aktifFiltre = "tumu";
    gorevleriCiz();
    gorevMetni.value = "";
    gorevMetni.focus();

    durumMesaji.textContent = `"${metin}" görevi eklendi.`;
});

function hataGoster(mesaj) {

    gorevHatasi.textContent = mesaj;
    gorevHatasi.hidden = false;
    gorevMetni.setAttribute("aria-invalid", "true");
    gorevMetni.focus();
}

function hataTemizle() {
    gorevHatasi.textContent = "";
    gorevHatasi.hidden = true;
    gorevMetni.removeAttribute("aria-invalid");

}

function gorevKimligiUret() {
    if (typeof globalThis.crypto?.randomUUID === "function") {
        return globalThis.crypto.randomUUID();
    }

    return `gorev-${Date.now()}-${Math.random().toString(36).slice(2) }`;

}

function sayaciGuncelle() {
    const kalanGorevSayisi = gorevler.filter(
        gorev => gorev.tamamlandi === false
    ).length;

    gorevSayaci.textContent = `${kalanGorevSayisi} görev kaldı`;
}

function bosMesajiGuncelle() {
    const gorunenGorevler = gorunenGorevleriHesapla();
    bosMesaj.hidden = gorunenGorevler.length > 0;

    if (aktifFiltre === "aktif") {
        bosMesaj.textContent = "Tamamlanmamış görevin yok.";
    } else if (aktifFiltre === "tamamlanan") {
        bosMesaj.textContent = "Henüz tamamladığın bir görev yok.";
    }

    else {
        bosMesaj.textContent = "Henüz görev eklemedin.";
    }
}





    function gorunenGorevleriHesapla() {
        if (aktifFiltre === "tumu") {
            return gorevler;
        }

        if (aktifFiltre === "aktif") {
            return gorevler.filter(gorev => gorev.tamamlandi === false);
        }

        if (aktifFiltre === "tamamlanan") {
            return gorevler.filter(gorev => gorev.tamamlandi === true);
        }


        return gorevler;
    }


function filtreGorunumunuGuncelle() {
    for (const dugme of filtreDugmeleri) {
        if (dugme.dataset.filtre === aktifFiltre) {
            dugme.setAttribute("aria-pressed", "true");
        } else {
            dugme.setAttribute("aria-pressed", "false");
        }
    }
}

for (const dugme of filtreDugmeleri) {
    dugme.addEventListener("click", function () {
        const filtre = dugme.dataset.filtre;
        aktifFiltre = filtre;
        gorevleriCiz();
    });
}

gorevleriCiz();