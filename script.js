const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// Bu bayrak, 'Hayır' butonunun zaten mutlak konumlandırılıp konumlandırılmadığını kontrol eder
let isNoButtonAbsolute = false;

// "Hayır" düğmesinin pozisyonunu rastgele değiştiren fonksiyon
const moveNoButton = () => {
  // Buton ilk kez hareket ettirildiğinde, CSS sınıfını ekleyelim
  if (!isNoButtonAbsolute) {
    noBtn.classList.add('is-absolute-positioned');
    isNoButtonAbsolute = true;
    // Butonun yeni absolute pozisyonuna geçişi için kısa bir gecikme ver
    // (opsiyonel ama daha akıcı bir başlangıç sağlayabilir)
    setTimeout(() => {
      moveNoButtonLogic(); // Gecikmeden sonra asıl hareket mantığını çalıştır
    }, 50); 
  } else {
    moveNoButtonLogic(); // Zaten absolute ise direkt hareket ettir
  }
};

const moveNoButtonLogic = () => {
  // questionContainer'ın güncel boyutlarını ve konumunu al
  const containerRect = questionContainer.getBoundingClientRect();
  // noBtn'in güncel boyutlarını al
  const noBtnRect = noBtn.getBoundingClientRect();

  // Konteynerın içindeki güvenli hareket alanını belirleyelim.
  // Biraz boşluk bırakarak düğmenin kenarlara yapışmasını engelleriz.
  const padding = 20; 

  const maxX = containerRect.width - noBtnRect.width - padding * 2;
  const maxY = containerRect.height - noBtnRect.height - padding * 2;

  // Yeni rastgele konumlar (padding kadar içeriden başlar)
  // Math.max(0, ...) ve Math.min(max, ...) ile butonun her zaman sınırlar içinde kalmasını garanti ediyoruz.
  const newX = Math.min(Math.max(0, Math.random() * maxX), maxX);
  const newY = Math.min(Math.max(0, Math.random() * maxY), maxY);

  // Butonun pozisyonunu güncelliyoruz
  // CSS'te `position: absolute` olan `.question-container` içinde
  // `transform: translate()` ile buton konumlandırılır.
  // translateX ve translateY, padding kadar içeriden başlar.
  noBtn.style.transform = `translate(${newX + padding}px, ${newY + padding}px)`;
};


// "Hayır" düğmesine fare üzerine gelince ve dokununca kaçma özelliği
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

// "Evet" düğmesi işlevi
yesBtn.addEventListener("click", () => {
  // Soru konteynırını gizle
  questionContainer.style.display = "none";

  // Sonuç konteynırını göster
  resultContainer.style.display = "flex";

  // gifResult varsa ve 'play' metodu destekliyorsa oynat
  if (gifResult && typeof gifResult.play === 'function') {
    gifResult.play();
  }
});

// Sayfa yüklendiğinde ve ekran boyutu değiştiğinde (mobil klavye açılması gibi)
// butonun pozisyonunu yeniden ayarlamak için bir olay dinleyicisi ekleyebiliriz.
// Bu, butonun her zaman doğru sınırlar içinde kalmasına yardımcı olur.
window.addEventListener('resize', () => {
    // Sadece questionContainer görünürken butonu hareket ettir
    if (questionContainer.style.display !== 'none') {
        moveNoButton();
    }
});

// Sayfa yüklendiğinde butonun başlangıç pozisyonunu da ayarlayalım
// Bu, sayfa ilk açıldığında butonun rastgele bir yerde başlamasını sağlar.
document.addEventListener('DOMContentLoaded', () => {
    // İlk yüklendiğinde hemen absolute yapalım ve rastgele konuma gitsin
    noBtn.classList.add('is-absolute-positioned');
    isNoButtonAbsolute = true;
    moveNoButtonLogic();
});
