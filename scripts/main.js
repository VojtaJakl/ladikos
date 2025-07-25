document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  const nav = document.querySelector("nav");

  let lastScrollTop = 0;

  
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    navList.classList.toggle("open");
  });

  
  document.querySelectorAll(".nav-list a").forEach(link => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      navList.classList.remove("open");
    });
  });

  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    
    if (navList.classList.contains("open")) return;

    if (currentScroll > lastScrollTop && currentScroll > 100) {
      
      nav.style.transform = "translateY(-100%)";
    } else {
      
      nav.style.transform = "translateY(0)";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});

const slogans = [
  "Tvůj styl. Naše vášeň.",
  "Není to jen o vlasech.",
  "Vždy o krok napřed."
];

const sloganEl = document.getElementById('dynamic-slogan');
let currentIndex = 0;
let charIndex = 0;
let typingSpeed = 100;  
let erasingSpeed = 50;  
let pauseAfterTyping = 2000;  

function typeSlogan() {
  if (charIndex < slogans[currentIndex].length) {
    sloganEl.textContent += slogans[currentIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeSlogan, typingSpeed);
  } else {
    setTimeout(eraseSlogan, pauseAfterTyping);
  }
}

function eraseSlogan() {
  if (charIndex > 0) {
    sloganEl.textContent = slogans[currentIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseSlogan, erasingSpeed);
  } else {
   //
    sloganEl.classList.add('fade-out');
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % slogans.length;
      sloganEl.classList.remove('fade-out');
      setTimeout(typeSlogan, 300); 
    }, 500); 
  }
}


document.addEventListener('DOMContentLoaded', () => {
  sloganEl.textContent = ''; 
  typeSlogan();
});

document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentIndex = 0;

  function showImage(index) {
    const img = galleryImages[index];
    if (!img) return;
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = img.dataset.full || img.src;
      lightboxImg.alt = img.alt;
      lightboxImg.style.opacity = 1;
    }, 150);
  }

  galleryImages.forEach((img, i) => {
    img.addEventListener('click', () => {
      currentIndex = i;
      showImage(currentIndex);
      lightbox.classList.remove('hidden');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
  });

  lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentIndex);
  });

  lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    showImage(currentIndex);
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
      lightboxImg.src = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') lightboxClose.click();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });
});

function checkOpenStatus() {
  const statusEl = document.getElementById('open-status');
  const iconEl = document.querySelector('.is-open-row i');
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  let text = '';
  let color = '';

  if (day >= 1 && day <= 5) {
    if ((hour > 9 && hour < 19) || (hour === 9 && minute >= 0) || (hour === 19 && minute === 0)) {
      text = 'Otevřeno';
      color = '#00ff88';
    } else {
      text = 'Zavřeno';
      color = '#ff4444';
    }
  } else if (day === 6) {
    text = 'Po dohodě';
    color = '#ffaa00';
  } else {
    text = 'Zavřeno';
    color = '#ff4444';
  }

  statusEl.textContent = text;
  statusEl.style.color = color;
  if (iconEl) iconEl.style.color = color;
}

checkOpenStatus();
setInterval(checkOpenStatus, 60000);
