// ===== ДАТА СВАДЬБЫ =====
const weddingDate = new Date("2026-07-24T00:00:00");

function updateTimer() {
  const now = new Date();
  const diff = weddingDate - now;
  if (diff <= 0) return;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  document.getElementById("months").textContent = months;
  document.getElementById("days").textContent = days % 30;
  document.getElementById("hours").textContent = hours % 24;
  document.getElementById("minutes").textContent = minutes % 60;
  document.getElementById("seconds").textContent = seconds % 60;
}

updateTimer();
setInterval(updateTimer, 1000);

// ===== АНИМАЦИЯ ПРИ СКРОЛЛЕ =====
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

// ===== МУЗЫКА =====
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

music.volume = 0.25;
let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    musicBtn.textContent = "❚❚ Музыка";
  } else {
    music.pause();
    musicBtn.textContent = "♪ Музыка";
  }
  isPlaying = !isPlaying;
});

// ===== ПРОГРЕСС ПРОКРУТКИ =====
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-progress").style.width = progress + "%";
});

// ===== ПАСХАЛКА АВГУСТА =====
const august = document.getElementById("august-name");

if (august) {
  const tooltip = document.createElement("div");
  tooltip.className = "august-tooltip";
  tooltip.textContent = "Я всё равно буду просить 🥺";
  august.appendChild(tooltip);

  august.addEventListener("click", () => {
    tooltip.classList.add("show");
    setTimeout(() => tooltip.classList.remove("show"), 2500);
  });
}
let musicStarted = false;

function tryAutoPlay() {
  if (musicStarted) return;

  music.play().then(() => {
    musicStarted = true;
    isPlaying = true;
    musicBtn.textContent = "❚❚ Музыка";
  }).catch(() => {});
}

window.addEventListener("scroll", tryAutoPlay, { once: true });
window.addEventListener("touchstart", tryAutoPlay, { once: true });
/* ===== ГАЛЕРЕЯ-СЛАЙДЕР ===== */

const galleryImages = [
  "images/gallery/1.jpg",
  "images/gallery/2.jpg",
  "images/gallery/3.jpg",
  "images/gallery/4.jpg",
  "images/gallery/5.jpg",
  "images/gallery/6.jpg"
];
const galleryCaptions = [
  "Здесь мы были знакомы всего лишь месяц.<br>-Тогда я понял, что бежать мне некуда.<br>-Тогда я поняла, что он от меня никуда не убежит.",
  "Это была наша первая годовщина.<br>Все-таки нужно было бежать...",
  "На этой фотографии мы вместе уже чуть больше года.<br>К нашей команде присоединился новый игрок.<br>И каждый последующий важный момент нашей жизни он проживал вместе с нами.",
  "Наша вторая годовщина.<br>Мы уже не представляли жизнь друг без друга",
  "День нашей третьей годовщины.<br>Тим меня сфоткал перед самым прекрасным вечером нашей жизни.<br>Он думал, что я ничего не знаю.<br>Но я догадывалась.",
  "Оказывается, догадывалась...<br>Она сказала: \"Да\""
];
let currentSlide = 0;

const sliderImg = document.querySelector(".slider-image img");
const captionEl = document.querySelector(".gallery-caption");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const indicatorEl = document.querySelector(".gallery-indicator");

function updateIndicator() {
  indicatorEl.textContent = `${currentSlide + 1} / ${galleryImages.length}`;
}

function updateSlide(index) {
  captionEl.classList.add("is-fading");
  sliderImg.style.opacity = 0;
  captionEl.style.opacity = 0;

  setTimeout(() => {
    sliderImg.src = galleryImages[index];
    captionEl.innerHTML = galleryCaptions[index];

    sliderImg.style.opacity = 1;
    captionEl.style.opacity = 1;
    requestAnimationFrame(() => {
      captionEl.classList.remove("is-fading");
    });

    updateIndicator();
  }, 200);
}

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
  updateSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % galleryImages.length;
  updateSlide(currentSlide);
});
/* ===== SWIPE ДЛЯ ГАЛЕРЕИ ===== */

let startX = 0;
let isSwiping = false;

const slider = document.querySelector(".gallery-slider");

slider.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  isSwiping = true;
});

slider.addEventListener("touchmove", (e) => {
  if (!isSwiping) return;

  const diffX = e.touches[0].clientX - startX;

  // свайп влево
  if (diffX < -60) {
    nextBtn.click();
    isSwiping = false;
  }

  // свайп вправо
  if (diffX > 60) {
    prevBtn.click();
    isSwiping = false;
  }
});

slider.addEventListener("touchend", () => {
  isSwiping = false;
});

// Инициализация галереи
captionEl.innerHTML = galleryCaptions[0];
captionEl.style.opacity = 1;
updateIndicator();
