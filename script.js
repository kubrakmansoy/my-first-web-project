


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
        const gorevSatiri = document.createElement("li");
        gorevSatiri.classList.add("gorev");
        gorevSatiri.dataset.id = gorev.id;
        
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

            // Değişiklikten önce görevin sırasını öğren.
            const oncekiGorevler = gorunenGorevleriHesapla();
            const oncekiSira = oncekiGorevler.findIndex(
                kayit => kayit.id === ilgiliGorev.id
            );

            ilgiliGorev.tamamlandi = checkbox.checked;

            // Değişiklikten sonra görünür kalan görevleri al.
            const yeniGorevler = gorunenGorevleriHesapla();

            const gorevGorunurMu = yeniGorevler.some(
                kayit => kayit.id === ilgiliGorev.id
            );

            let odaklanacakGorev;

            if (gorevGorunurMu) {
                odaklanacakGorev = ilgiliGorev;
            } else {
                odaklanacakGorev =
                    yeniGorevler[oncekiSira] ??
                    yeniGorevler[oncekiSira - 1];
            }

            gorevleriCiz();

            goreveOdaklan(odaklanacakGorev, 'input[type="checkbox"]');

            durumBildir(
                ilgiliGorev.tamamlandi
                    ? `"${ilgiliGorev.metin}" görevi tamamlandı.`
                    : `"${ilgiliGorev.metin}" görevi yeniden aktifleştirildi.`
            );
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

            // Silmeden önce ekranda görünen görevlerin sırasını al.
            const gorunenGorevler = gorunenGorevleriHesapla();
            const silinenSira = gorunenGorevler.findIndex(
                kayit => kayit.id === silinecekGorev.id
            );

            // Önce sonraki görevi, yoksa önceki görevi seç.
            const odaklanacakGorev =
                gorunenGorevler[silinenSira + 1] ??
                gorunenGorevler[silinenSira - 1];

            const silinenMetin = silinecekGorev.metin;

            gorevler = gorevler.filter(
                kayit => kayit.id !== silinecekGorev.id
            );

            gorevleriCiz();

            goreveOdaklan(odaklanacakGorev, "button");

            durumBildir(`"${silinenMetin}" görevi silindi.`);
        });


        gorevSatiri.append(checkbox);
        gorevSatiri.append(label);
        gorevSatiri.append(silmeDugmesi);
        
        if (gorev.tamamlandi) {
            gorevSatiri.classList.add("tamamlandi");
        }
        gorevListesi.append(li);
    }

    sayaciGuncelle();
    bosMesajiGuncelle();
    filtreGorunumunuGuncelle();

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

    durumBildir(`"${metin}" görevi eklendi.`);
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


function durumBildir(mesaj) {
    if (durumMesaji.textContent !== mesaj) {
        durumMesaji.textContent = mesaj;
    }
}

function goreveOdaklan(gorev, hedefsecici) {
    const satir = gorev
        ? Array.from(gorevListesi.children).find(
            oge => oge.dataset.id === gorev.id
        )
        : null;

    const hedef = satir?.querySelector(hedefsecici);

    if (hedef) {
        hedef.focus();
    } else {
        gorevMetni.focus();
    }
}


for (const dugme of filtreDugmeleri) {
    dugme.addEventListener("click", function () {
        const filtre = dugme.dataset.filtre;
        aktifFiltre = filtre;
        gorevleriCiz();
        dugme.focus();
    });
}

gorevleriCiz();