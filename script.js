const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// "Hayır" düğmesinin pozisyonunu rastgele değiştiren fonksiyon
const moveNoButton = () => {
  // questionContainer'ın güncel boyutlarını ve konumunu al
  // getBoundingClientRect() en güvenilir yöntemdir.
  const containerRect = questionContainer.getBoundingClientRect();
  // noBtn'in güncel boyutlarını al
  const noBtnRect = noBtn.getBoundingClientRect();

  // Butonun hareket edebileceği maksimum X ve Y koordinatlarını hesapla.
  // Bu hesaplama, butonun container içinde kalmasını garanti eder.
  // Butonun sağ ve alt kenarının container'ın sağ ve alt kenarına değmesini sağlar.
  const maxX = containerRect.width - noBtnRect.width;
  const maxY = containerRect.height - noBtnRect.height;

  // Yeni rastgele konumlar (0 ile maxX/maxY arasında)
  // Math.max(0, ...) kullanarak konumların negatif olmamasını sağlıyoruz,
  // böylece butonun sol veya üst kenardan dışarı çıkmasını engelliyoruz.
  const newX = Math.max(0, Math.random() * maxX);
  const newY = Math.max(0, Math.random() * maxY);

  // Butonun pozisyonunu güncelliyoruz
  // CSS'te `position: relative` olan `.question-container` içinde
  // `position: absolute` ile buton konumlandırılır.
  noBtn.style.position = 'absolute';
  
  // transform: translate() kullanarak butonun konumunu değiştiriyoruz.
  // Bu, tarayıcı tarafından daha optimize edilmiş bir hareket sağlar.
  noBtn.style.transform = `translate(${newX}px, ${newY}px)`;

  // Gerekirse, butonun z-index'ini de ayarlayabiliriz
  // noBtn.style.zIndex = '10';
};

// "Hayır" düğmesine fare üzerine gelince ve dokununca kaçma özelliği
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton); // Mobil cihazlar için dokunma olayı

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
window.addEventListener('resize', moveNoButton);

// Sayfa yüklendiğinde butonun başlangıç pozisyonunu da ayarlayalım
// Bu, sayfa ilk açıldığında butonun rastgele bir yerde başlamasını sağlar.
document.addEventListener('DOMContentLoaded', moveNoButton);
