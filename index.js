/**
 * 嘉義市115學年度「美學教師工作坊」網站 - 前端邏輯控制
 * Interactive Script for Aesthetic Teacher Workshop Web Portal
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAgendaTabs();
  initHistoryTabs();
  initCounters();
});

/* 1. 導覽列滾動與行動版選單 Navigation Logic */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // 滾動變化 Navbar scrolled effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // 視窗目前區域高亮 Active Nav Link on Scroll
    let currentSection = '';
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 行戰版選單開關 Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // 點擊連結關閉選單 Close menu on click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* 2. 課程場次頁籤切換 Agenda Tab Switcher */
function initAgendaTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // 移除所有 active
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // 啟動點擊的 active
      btn.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}

/* 3. 精彩照片燈箱 Modal Lightbox */
function initGalleryLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  if (!modal || !modalImg) return;

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || '研習精彩花絮照片';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // 關閉 Modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* 4. 成效評鑑數據計數動畫 Number Counter Animation */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const runCounter = () => {
    const metricsSection = document.getElementById('evaluation');
    if (!metricsSection) return;

    const sectionPos = metricsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const isPercent = counter.getAttribute('data-unit') === '%';
        const decimals = counter.getAttribute('data-decimals') || 0;
        
        let start = 0;
        const duration = 1500;
        const steps = 60;
        const stepTime = duration / steps;
        const increment = target / steps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= target) {
            start = target;
            clearInterval(timer);
          }
          counter.textContent = start.toFixed(decimals) + (isPercent ? '%' : '');
        }, stepTime);
      });
    }
  };

  window.addEventListener('scroll', runCounter);
  runCounter();
}

/* 5. 講義與資源下載下載下載提示 (Simulated Resource Downloader) */
function downloadResource(filename, title) {
  alert(`【下載通知】\n您正在下載：「${title}」\n系統即將為您開啟檔案連線！`);
}


/* 4. 歷年演進切換 History Timeline Stepper Switcher */
function initHistoryTabs() {
  const steps = document.querySelectorAll('.stepper-step');
  const tabContents = document.querySelectorAll('.history-tab-content');

  steps.forEach(step => {
    step.addEventListener('click', () => {
      const targetId = step.getAttribute('data-history-tab');

      // 移除所有 active
      steps.forEach(s => s.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      // 啟用目前點擊的 step 與 content
      step.classList.add('active');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
}
