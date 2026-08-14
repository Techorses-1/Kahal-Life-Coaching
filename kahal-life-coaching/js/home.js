// ================= OPTIMIZED JS FOR ALL PAGES =================

document.addEventListener("DOMContentLoaded", function () {

  // ================= 1. INITIALIZE AOS (Animate On Scroll) =================
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out',
    disable: false
  });

  // ================= 2. TESTIMONIALS SWIPER =================
  const testimonialSwiper = new Swiper(".testimonialsSwiper", {
    loop: true,
    speed: 700,
    grabCursor: true,
    spaceBetween: 18,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    navigation: {
      nextEl: ".custom-next",
      prevEl: ".custom-prev"
    },
    breakpoints: {
      0: { slidesPerView: 1, spaceBetween: 16 },
      768: { slidesPerView: 2, spaceBetween: 18 },
      1025: { slidesPerView: 3, spaceBetween: 22 }
    }
  });

  // ================= 3. MOBILE NAVBAR MENU TOGGLE =================
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      this.classList.toggle('active');

      if (this.classList.contains('active')) {
        mobileMenu.style.display = 'block';
        setTimeout(() => {
          mobileMenu.style.opacity = '1';
          mobileMenu.style.transform = 'translateY(0)';
        }, 10);
      } else {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          mobileMenu.style.display = 'none';
        }, 300);
      }
    });
  }

  // ================= 4. HELPER: GET CURRENT PAGE NAME =================
  function getCurrentPage() {
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop();
    if (currentPage === '' || currentPage === '/') currentPage = 'index.html';
    return currentPage;
  }

  // ================= 5. SET ACTIVE CLASS FOR NAVBAR =================
  function setActiveNavLink() {
    const currentPage = getCurrentPage();
    const desktopLinks = document.querySelectorAll('.navbar-links .nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-menu .mobile-nav-link');

    desktopLinks.forEach(link => link.classList.remove('active'));
    mobileLinks.forEach(link => link.classList.remove('active'));

    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      let hrefPage = href.split('/').pop() || 'index.html';
      if (hrefPage === currentPage) link.classList.add('active');
    });

    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      let hrefPage = href.split('/').pop() || 'index.html';
      if (hrefPage === currentPage) link.classList.add('active');
    });
  }

  // ================= 6. SET ACTIVE CLASS FOR FOOTER =================
  function setActiveFooterLink() {
    const currentPage = getCurrentPage();
    const footerLinks = document.querySelectorAll('.footer-links .footer-nav-link');

    footerLinks.forEach(link => link.classList.remove('active'));

    footerLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      let hrefPage = href.split('/').pop() || 'index.html';
      if (hrefPage === currentPage) link.classList.add('active');
    });
  }

  // ================= 7. RUN ALL FUNCTIONS =================
  setActiveNavLink();
  setActiveFooterLink();

}); // End of DOMContentLoaded