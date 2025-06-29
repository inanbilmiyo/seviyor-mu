const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
// const heartLoader = document.querySelector(".cssload-main"); // Bu satırı kaldırdık
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// "Hayır" düğmesinin pozisyonunu rastgele değiştiren fonksiyon
const moveNoButton = () => {
  const containerRect = questionContainer.getBoundingClientRect();
  const noBtnRect = noBtn.getBoundingClientRect();

  const maxX = containerRect.width - noBtnRect.width - 20;
  const maxY = containerRect.height - noBtnRect.height - 20;

  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  // Butonun pozisyonunu güncelliyoruz
  noBtn.style.position = 'absolute';
  noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
};

// "Hayır" düğmesine fare üzerine gelince ve dokununca kaçma özelliği
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton);

// "Evet" düğmesi işlevi
yesBtn.addEventListener("click", () => {
  // Soru konteynırını gizle
  questionContainer.style.display = "none";

  // Kalp yükleyiciyi gösterme adımı kaldırıldı
  // heartLoader.style.display = "block";

  // Doğrudan sonuç konteynırını göster
  // timeout yerine direkt gösteriyoruz, çünkü animasyon yok
  resultContainer.style.display = "flex";

  // gifResult varsa ve 'play' metodu destekliyorsa oynat
  if (gifResult && typeof gifResult.play === 'function') {
    gifResult.play();
  }
});
