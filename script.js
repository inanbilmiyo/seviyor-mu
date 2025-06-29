const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

let lastMoveTime = 0;
const moveDelay = 300; // milisaniye cinsinden hareket aralığı
let noClickCount = 0;

// Hayır butonunun pozisyon değiştirme fonksiyonu
function moveNoButton() {
  const now = Date.now();

  if (now - lastMoveTime < moveDelay) return; // çok sık hareket etmeyi engelle
  lastMoveTime = now;

  const maxX = questionContainer.offsetWidth - noBtn.offsetWidth;
  const maxY = questionContainer.offsetHeight - noBtn.offsetHeight;

  const newX = Math.floor(Math.random() * maxX);
  const newY = Math.floor(Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}

// Mobil ve desktop uyumlu event listener
function handleNoButtonMove() {
  noClickCount++;
  moveNoButton();

  // İstersen 3 kere basınca hareketi durdurmak için:
  // if(noClickCount >= 3) {
  //   noBtn.removeEventListener('click', handleNoButtonMove);
  // }
}

noBtn.addEventListener("mouseover", handleNoButtonMove);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // çift tıklama gibi davranışları önlemek için
  handleNoButtonMove();
}, { passive: false });

// Evet butonuna tıklanınca sonuç göster
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "inherit";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";
    gifResult.play();
  }, 3000);
});
