const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// "Hayır" düğmesinin pozisyonunu rastgele değiştiren fonksiyon
const moveNoButton = () => {
  // questionContainer'ın güncel boyutlarını ve konumunu al
  const containerRect = questionContainer.getBoundingClientRect();
  // noBtn'in güncel boyutlarını al
  const noBtnRect = noBtn.getBoundingClientRect();

  // Butonun hareket edebileceği maksimum X ve Y koordinatlarını hesapla
  // Bu hesaplama, butonun container içinde kalmasını garanti eder.
  // containerRect.width ve containerRect.height, container'ın iç genişliğini verir.
  // noBtnRect.width ve noBtnRect.height, butonun kendi genişliğini verir.
  // Böylece butonun sol üst köşesi için maksimum konumları buluruz.
  const maxX = containerRect.width - noBtnRect.width;
  const maxY = containerRect.height - noBtnRect.height;

  // Yeni rastgele konumlar (0 ile maxX/maxY arasında)
  // Math.max(0, ...) kullanarak konumların negatif olmamasını sağlıyoruz
  // ve böylece butonun sol veya üst kenardan dışarı çıkmasını engelliyoruz.
  const newX = Math.max(0, Math.random() * maxX);
  const newY = Math.max(0, Math.random() * maxY);

  // Butonun pozisyonunu güncelliyoruz
  // CSS'te `position: relative` olan `.question-container` içinde
  // `position: absolute` ile buton konumlandırılır.
  noBtn.style.position = 'absolute';
  // Butonun sol üst köşesini doğrudan bu yeni X ve Y konumlarına ayarla
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
  
  // NOT: Eğer `transform: translate` kullanmayı tercih ederseniz,
  // butonun başlangıç pozisyonunu dikkate almanız gerekir.
  // Ancak `left` ve `top` doğrudan CSS kurallarına çevrildiği için
  // genellikle daha basit ve öngörülebilir bir davranış sağlar.
  // noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
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

// Sayfa yüklendiğinde "Hayır" butonunun başlangıç pozisyonunu ayarlayalım
// ve 'absolute' olarak işaretleyelim ki sonradan hareket edebilsin.
// Bu, butonun sayfa ilk yüklendiğinde de doğru konumlanmasını sağlar.
// noBtn.style.position = 'absolute'; // Bu satırın `moveNoButton` içinde olması daha iyi
// noBtn.style.left = `${(questionContainer.offsetWidth - noBtn.offsetWidth) / 2}px`; // Ortala
// noBtn.style.top = `${(questionContainer.offsetHeight - noBtn.offsetHeight) / 2}px`; // Ortala
