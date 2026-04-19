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
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

// ===== МУЗЫКА =====
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

music.volume = 0.25;
let isPlaying = false;
let musicStarted = false;

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

// ===== ПРОГРЕСС ПРОКРУТКИ =====
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  document.getElementById("scroll-progress").style.width = `${progress}%`;
});

// ===== ПАСХАЛКА АВГУСТА =====
const august = document.getElementById("august-name");

if (august) {
  const tooltip = document.createElement("div");
  tooltip.className = "august-tooltip";
  tooltip.textContent = "Я всё равно буду просить";
  august.appendChild(tooltip);

  august.addEventListener("click", () => {
    tooltip.classList.add("show");
    setTimeout(() => tooltip.classList.remove("show"), 2500);
  });
}

// ===== ГАЛЕРЕЯ-СЛАЙДЕР =====
const gallerySlides = [
  {
    image: "images/gallery/1.jpg",
    meta: "Осень 2022 • Первый месяц вместе",
    caption:
      "Здесь мы были знакомы всего лишь месяц. Тогда мы оба уже поняли: эта история надолго."
  },
  {
    image: "images/gallery/2.jpg",
    meta: "Осень 2023 • Первая годовщина",
    caption:
      "Наша первая годовщина. И тот самый момент, когда стало окончательно ясно: друг без друга уже никак."
  },
  {
    image: "images/gallery/3.jpg",
    meta: "2024 • Нас стало больше",
    caption:
      "К нашей команде присоединился новый важный герой. С этого момента каждый большой эпизод жизни мы проживаем уже втроем."
  },
  {
    image: "images/gallery/4.jpg",
    meta: "Осень 2024 • Вторая годовщина",
    caption:
      "Вторая годовщина. Спокойное, теплое счастье и ощущение дома, которое мы нашли друг в друге."
  },
  {
    image: "images/gallery/5.jpg",
    meta: "2025 • Вечер, который всё изменил",
    caption:
      "Тим сделал этот кадр перед самым важным вечером нашей жизни. Он думал, что я ничего не знаю. Но сердце уже догадывалось."
  },
  {
    image: "images/gallery/6.jpg",
    meta: "2025 • Она сказала «Да»",
    caption:
      "Оказалось, не зря догадывалось. Так началась новая глава нашей истории."
  }
];

let currentSlide = 0;
let autoSlideTimer = null;

const sliderImg = document.querySelector(".slider-image img");
const captionEl = document.querySelector(".gallery-caption");
const metaEl = document.querySelector(".gallery-meta");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const indicatorEl = document.querySelector(".gallery-indicator");
const slider = document.querySelector(".gallery-slider");

function renderSlide(index) {
  const slide = gallerySlides[index];

  sliderImg.src = slide.image;
  metaEl.textContent = slide.meta;
  captionEl.textContent = slide.caption;
  indicatorEl.textContent = `${index + 1} / ${gallerySlides.length}`;
}

function updateSlide(index) {
  sliderImg.style.opacity = 0;
  captionEl.style.opacity = 0;
  metaEl.style.opacity = 0;

  setTimeout(() => {
    renderSlide(index);

    sliderImg.style.opacity = 1;
    captionEl.style.opacity = 1;
    metaEl.style.opacity = 1;
  }, 200);
}

function showNextSlide() {
  currentSlide = (currentSlide + 1) % gallerySlides.length;
  updateSlide(currentSlide);
}

function showPrevSlide() {
  currentSlide = (currentSlide - 1 + gallerySlides.length) % gallerySlides.length;
  updateSlide(currentSlide);
}

function stopAutoSlide() {
  if (autoSlideTimer) {
    clearInterval(autoSlideTimer);
    autoSlideTimer = null;
  }
}

prevBtn.addEventListener("click", () => {
  stopAutoSlide();
  showPrevSlide();
});

nextBtn.addEventListener("click", () => {
  stopAutoSlide();
  showNextSlide();
});

let startX = 0;
let isSwiping = false;

slider.addEventListener("touchstart", (e) => {
  stopAutoSlide();
  startX = e.touches[0].clientX;
  isSwiping = true;
});

slider.addEventListener("touchmove", (e) => {
  if (!isSwiping) return;

  const diffX = e.touches[0].clientX - startX;

  if (diffX < -60) {
    showNextSlide();
    isSwiping = false;
  }

  if (diffX > 60) {
    showPrevSlide();
    isSwiping = false;
  }
});

slider.addEventListener("touchend", () => {
  isSwiping = false;
});

renderSlide(currentSlide);
