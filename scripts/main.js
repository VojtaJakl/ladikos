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
    nav.style.transform = currentScroll > lastScrollTop && currentScroll > 100 ? "translateY(-100%)" : "translateY(0)";
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  
const slogans = [
  "Tvůj styl. Naše vášeň.",
  "Není to jen o vlasech.",
  "Vždy o krok napřed."
];

const sloganEl = document.getElementById('dynamic-slogan');
let currentIndex = 0;
let charIndex = 0;
const typingSpeed = 100;  
const erasingSpeed = 70;  
const pauseAfterTyping = 2000;  

if (sloganEl && !window.sloganTypingStarted) {
  window.sloganTypingStarted = true;

  // zajistí čistý start
  sloganEl.textContent = '';
  sloganEl.style.transition = 'opacity 0.3s';
  sloganEl.style.opacity = 1;

  function typeSlogan() {
    if (charIndex < slogans[currentIndex].length) {
      sloganEl.textContent += slogans[currentIndex][charIndex];
      charIndex++;
      setTimeout(typeSlogan, typingSpeed);
    } else {
      setTimeout(eraseSlogan, pauseAfterTyping);
    }
  }

  function eraseSlogan() {
    if (charIndex > 0) {
      charIndex--;
      sloganEl.textContent = slogans[currentIndex].substring(0, charIndex);
      setTimeout(eraseSlogan, erasingSpeed);
    } else {
      
      sloganEl.style.opacity = 0;
      setTimeout(() => {
        
        currentIndex = (currentIndex + 1) % slogans.length;
        charIndex = 0;
        sloganEl.textContent = '';
        sloganEl.style.opacity = 1; 
        typeSlogan();
      }, 300); 
    }
  }

  // START
  typeSlogan();
}


  
  const galleryImages = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  let galleryIndex = 0;

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
      galleryIndex = i;
      showImage(galleryIndex);
      lightbox.classList.remove('hidden');
    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
  });

  lightboxPrev.addEventListener('click', () => {
    galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(galleryIndex);
  });

  lightboxNext.addEventListener('click', () => {
    galleryIndex = (galleryIndex + 1) % galleryImages.length;
    showImage(galleryIndex);
  });

  lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox){
      lightbox.classList.add('hidden');
      lightboxImg.src = '';
    }
  });

  document.addEventListener('keydown', (e) => {
    if(lightbox.classList.contains('hidden')) return;
    if(e.key==='Escape') lightboxClose.click();
    if(e.key==='ArrowLeft') lightboxPrev.click();
    if(e.key==='ArrowRight') lightboxNext.click();
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

    if(day >= 1 && day <=5){
      if((hour>9 && hour<19) || (hour===9 && minute>=0) || (hour===19 && minute===0)){
        text='Otevřeno'; color='#00ff88';
      } else { text='Zavřeno'; color='#ff4444'; }
    } else if(day===6){ text='Po dohodě'; color='#ffaa00'; }
    else { text='Zavřeno'; color='#ff4444'; }

    if(statusEl) statusEl.textContent = text;
    if(statusEl) statusEl.style.color = color;
    if(iconEl) iconEl.style.color = color;
  }

  checkOpenStatus();
  setInterval(checkOpenStatus, 60000);

 

  
  const modal = document.getElementById('hairGuideModal');
  const openBtn = document.getElementById('openGuide');
  const closeBtn = modal ? modal.querySelector('.close') : null;
  const PHONE_NUMBER = '+420731270724';

  if(modal && openBtn && closeBtn){
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

    buttons.forEach(btn=>{
      btn.addEventListener('click',()=>{
        const a = btn.dataset.answer;
        if(!a) return;
        if(currentStep===1) answers.oblicej=a;
        if(currentStep===2) answers.vousy=a;
        if(currentStep===3) answers.styl=a;
        goToStep(currentStep+1);
      });
    });

    function goToStep(step){
      steps.forEach(s=>s.classList.remove('active'));
      const next = modal.querySelector(`.step[data-step="${step}"]`);
      if(!next) return;
      next.classList.add('active');
      updateProgress(step);
      if(step===4) showResult();
      currentStep=step;
    }

    function updateProgress(step){
      const bars = modal.querySelectorAll('.progress span');
      bars.forEach((bar,i)=>bar.classList.toggle('active', i<step-1));
    }

    function showResult(){
      let service = null;
      if(answers.vousy==='plne') service=services.combo;
      if(answers.vousy==='kratke') service=services.combo;
      if(answers.vousy==='zadne'){
        if(answers.styl==='street') service=services.skinfade;
        if(answers.styl==='classic'||answers.styl==='clean') service=services.classic;
      }
      if(answers.vousy==='plne' && answers.styl==='classic') service=services.full;
      if(!service) service=services.classic;

      const isMobile = window.innerWidth<768;
      if(isMobile){
        resultText.innerHTML=`
          <strong><i data-lucide="scissors" class="icon"></i> ${service.name}</strong><br>
          <span style="font-size:14px;color:#888">${service.desc}</span><br><br>
          <a href="tel:${PHONE_NUMBER}" class="cta">
            <i data-lucide="phone" class="icon"></i> Objednat
          </a>
        `;
      } else {
        resultText.innerHTML=`
          <strong><i data-lucide="scissors" class="icon"></i> ${service.name}</strong><br>
          <span style="font-size:14px;color:#888">${service.desc}</span><br><br>
          <span style="font-size:16px;color:#5ac8fa;font-weight:bold;">
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

    openBtn.addEventListener('click', ()=>{
      modal.style.display='block';
      resetGuide();
    });

    closeBtn.addEventListener('click', ()=>{
      modal.style.display='none';
    });

    window.addEventListener('click', e=>{
      if(e.target===modal) modal.style.display='none';
    });
  }

});










