const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main"); // Kalp animasyonu için
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// "Hayır" düğmesinin pozisyonunu rastgele değiştiren fonksiyon
const moveNoButton = () => {
  // questionContainer'ın boyutlarını alıyoruz
  const containerRect = questionContainer.getBoundingClientRect();
  const noBtnRect = noBtn.getBoundingClientRect();

  // Butonun container içinde kalmasını sağlayacak yeni koordinatlar hesaplıyoruz
  // 20px bir margin bırakarak butonun kenarlara çok yapışmasını engelleriz
  const maxX = containerRect.width - noBtnRect.width - 20;
  const maxY = containerRect.height - noBtnRect.height - 20;

  // Yeni rastgele konumlar
  const newX = Math.random() * maxX;
  const newY = Math.random() * maxY;

  // Butonun pozisyonunu güncelliyoruz
  // 'absolute' pozisyonlandırma ve 'transform' kullanmak daha performanslıdır
  noBtn.style.position = 'absolute'; // Eğer CSS'te yoksa ekleyin
  noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
};

// "Hayır" düğmesine fare üzerine gelince ve dokununca kaçma özelliği
noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", moveNoButton); // Mobil cihazlar için dokunma olayı

// "Evet" düğmesi işlevi
yesBtn.addEventListener("click", () => {
  // Soru konteynırını gizle
  questionContainer.style.display = "none";

  // Kalp yükleyiciyi göster
  heartLoader.style.display = "block"; // 'inherit' yerine 'block' daha yaygın ve net

  // 3 saniye sonra kalp yükleyiciyi gizle ve sonuç konteynırını göster
  const timeoutId = setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "flex"; // Sonuç konteynırını 'flex' olarak göster
    
    // gifResult varsa ve 'play' metodu destekliyorsa oynat
    if (gifResult && typeof gifResult.play === 'function') {
      gifResult.play();
    }
  }, 3000);
});
