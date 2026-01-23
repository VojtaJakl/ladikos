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

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.textContent = '❄';

    
    const size = Math.random() * 20 + 10; 
    snowflake.style.fontSize = size + 'px';

    
    snowflake.style.left = Math.random() * window.innerWidth + 'px';

    
    const duration = Math.random() * 5 + 3;
    snowflake.style.animationDuration = duration + 's';

    document.body.appendChild(snowflake);

    
    setTimeout(() => {
        snowflake.remove();
    }, duration * 1000);
}


setInterval(createSnowflake, 150);

document.addEventListener('DOMContentLoaded', () => {

  const modal = document.getElementById('hairGuideModal');
  const openBtn = document.getElementById('openGuide');
  const closeBtn = modal ? modal.querySelector('.close') : null;

  if (!modal || !openBtn || !closeBtn) return;

  const PHONE_NUMBER = '+420731270724'; 

  openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    resetGuide();
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  const answers = { oblicej:null, vousy:null, styl:null };
  const steps = modal.querySelectorAll('.step');
  const buttons = modal.querySelectorAll('.step button');
  const resultText = document.getElementById('result-text');
  let currentStep = 1;

  const services = {
    classic: { name:'Klasický střih (šukar bala)', desc:'Čistý klasický střih se vším všudy' },
    skinfade: { name:'Skin fade', desc:'Střih od nuly, moderní a výrazný' },
    combo: { name:'Pánské combo (baro frajeris)', desc:'Vlasy + vousy, komplet servis' },
    full: { name:'Lacio Full service (super frajeris)', desc:'Kompletní péče bez kompromisů' },
    beard: { name:'Úprava vousů', desc:'Samostatná úprava vousů' }
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const a = btn.dataset.answer;
      if (!a) return;

      if (currentStep === 1) answers.oblicej = a;
      if (currentStep === 2) answers.vousy = a;
      if (currentStep === 3) answers.styl = a;

      goToStep(currentStep + 1);
    });
  });

  function goToStep(step) {
    steps.forEach(s=>s.classList.remove('active'));
    const next = modal.querySelector(`.step[data-step="${step}"]`);
    if (!next) return;
    next.classList.add('active');
    updateProgress(step);

    if(step===4) showResult();
    currentStep = step;
  }

  function updateProgress(step){
    const bars = modal.querySelectorAll('.progress span');
    bars.forEach((bar,i)=>bar.classList.toggle('active', i<step-1));
  }

  function showResult(){
    let service = null;

    if (answers.vousy==='plne') service=services.combo;
    if (answers.vousy==='kratke') service=services.combo;
    if (answers.vousy==='zadne'){
      if (answers.styl==='street') service=services.skinfade;
      if (answers.styl==='classic'||answers.styl==='clean') service=services.classic;
    }
    if (answers.vousy==='plne' && answers.styl==='classic') service=services.full;
    if (!service) service=services.classic;

    const isMobile = window.innerWidth<768;

    if(isMobile){
      resultText.innerHTML = `
        <strong><i data-lucide="scissors" class="icon"></i> ${service.name}</strong><br>
        <span style="font-size:14px;color:#888">${service.desc}</span><br><br>
        <a href="tel:${PHONE_NUMBER}" class="cta">
          <i data-lucide="phone" class="icon"></i> Objednat
        </a>
      `;
    } else {
      resultText.innerHTML = `
        <strong><i data-lucide="scissors" class="icon"></i> ${service.name}</strong><br>
        <span style="font-size:14px;color:#888">${service.desc}</span><br><br>
        <span style="font-size:16px;color:#c9a45c;font-weight:bold;">
          Tel: ${PHONE_NUMBER}
        </span>
      `;
    }

    if(typeof lucide!=='undefined') lucide.replace();
  }

  function resetGuide(){
    currentStep=1;
    Object.keys(answers).forEach(k=>answers[k]=null);
    steps.forEach(s=>s.classList.remove('active'));
    modal.querySelector('.step[data-step="1"]').classList.add('active');
    updateProgress(1);
    resultText.innerHTML='';
  }

});


