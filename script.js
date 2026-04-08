document.addEventListener('DOMContentLoaded', () => {

  // ─── Boot Sequence ─────────────────────────────────
  const bootSequence = document.getElementById('boot-sequence');
  const mainContent = document.getElementById('main-content');

  setTimeout(() => {
    bootSequence.style.opacity = '0';
    setTimeout(() => {
      bootSequence.style.display = 'none';
      mainContent.style.opacity = '1';
    }, 800);
  }, 4200);

  // ─── Scroll Reveal ─────────────────────────────────
  const sections = document.querySelectorAll('.section');

  const revealSection = (entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.08,
  });

  sections.forEach(sec => sectionObserver.observe(sec));

  // ─── Hamburger Menu ────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navCenter = document.getElementById('nav-center');
  if (hamburger && navCenter) {
    hamburger.addEventListener('click', () => navCenter.classList.toggle('open'));
    navCenter.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => navCenter.classList.remove('open'))
    );
  }

  // ─── Matrix Code Rain (Enhanced) ──────────────────
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  let w, h, columns, drops;

  function initMatrix() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const fontSize = 15;
    columns = Math.floor(w / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * -50);
  }

  initMatrix();

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%#&_(),.;:?!|{}[]^~<>@';
  const fontSize = 15;

  function drawMatrix() {
    // Semi-transparent black for trail
    ctx.fillStyle = 'rgba(10, 10, 10, 0.045)';
    ctx.fillRect(0, 0, w, h);

    ctx.font = `${fontSize}px "Share Tech Mono", monospace`;

    for (let i = 0; i < columns; i++) {
      const char = chars.charAt(Math.floor(Math.random() * chars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Lead character glow — bright white
      if (Math.random() > 0.92) {
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 12;
      } else {
        // Random brightness variation for depth
        const alpha = 0.4 + Math.random() * 0.6;
        ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
        ctx.shadowBlur = 0;
      }

      ctx.fillText(char, x, y);

      if (y > h && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    ctx.shadowBlur = 0;
  }

  setInterval(drawMatrix, 40);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(initMatrix, 200);
  });

  // ─── Smooth scroll for nav links ──────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ─── Countdown & Registration Logic ────────────────
  const targetDate = new Date('2026-04-09T00:00:00+05:30').getTime();
  const regBtn = document.getElementById('reg-btn');
  const countdownTimer = document.getElementById('countdown-timer');
  const countdownWrapper = document.getElementById('countdown-wrapper');
  const regNotice = document.getElementById('reg-notice');

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (countdownTimer) countdownTimer.innerHTML = "00:00:00:00";
      if (countdownWrapper) countdownWrapper.classList.add('closing-timer');
      if (regNotice) regNotice.style.display = 'block';
      if (regBtn && regBtn.tagName === 'BUTTON') {
        const a = document.createElement('a');
        a.href = "https://forms.gle/7DtX3Qm3tre1MLmU6";
        a.target = "_blank";
        a.className = "register-btn";
        a.id = "reg-btn";
        a.innerHTML = '<span class="unlock-icon">&#128275;</span><span id="reg-text">REGISTER NOW</span>';
        regBtn.replaceWith(a);
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (countdownTimer) {
      countdownTimer.innerHTML = 
        String(days).padStart(2, '0') + ":" + 
        String(hours).padStart(2, '0') + ":" + 
        String(minutes).padStart(2, '0') + ":" + 
        String(seconds).padStart(2, '0');
    }
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ─── Lightbox Modal Logic ──────────────────────────
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const galleryImages = document.querySelectorAll('.img-wrapper img');

  if (lightboxModal && lightboxImg && galleryImages.length > 0) {
    galleryImages.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        lightboxModal.classList.add('show');
        lightboxImg.src = e.target.src;
      });
    });

    const closeModal = () => {
      lightboxModal.classList.remove('show');
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeModal);
    }
    
    // Close on background click
    lightboxModal.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) {
        closeModal();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('show')) {
        closeModal();
      }
    });
  }

  // ─── FAQ Accordion Logic ───────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if(question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close all other items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

});
