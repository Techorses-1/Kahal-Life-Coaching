// ================= MOBILE NAVBAR MENU TOGGLE =================
document.addEventListener('DOMContentLoaded', function() {
  
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
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

  // ================= SET ACTIVE CLASS FOR NAVBAR =================
  function setActiveNavLink() {
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop();
    
    if (currentPage === '' || currentPage === '/') {
      currentPage = 'index.html';
    }
    
    const desktopLinks = document.querySelectorAll('.navbar-links .nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-menu .mobile-nav-link');
    
    desktopLinks.forEach(link => link.classList.remove('active'));
    mobileLinks.forEach(link => link.classList.remove('active'));
    
    desktopLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      
      let hrefPage = href.split('/').pop();
      if (hrefPage === '' || hrefPage === '/') hrefPage = 'index.html';
      
      if (hrefPage === currentPage) {
        link.classList.add('active');
      }
    });
    
    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      
      let hrefPage = href.split('/').pop();
      if (hrefPage === '' || hrefPage === '/') hrefPage = 'index.html';
      
      if (hrefPage === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // ================= SET ACTIVE CLASS FOR FOOTER LINKS =================
  function setActiveFooterLink() {
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop();
    
    if (currentPage === '' || currentPage === '/') {
      currentPage = 'index.html';
    }
    
    const footerLinks = document.querySelectorAll('.footer-links .footer-nav-link');
    
    footerLinks.forEach(link => link.classList.remove('active'));
    
    footerLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      
      let hrefPage = href.split('/').pop();
      if (hrefPage === '' || hrefPage === '/') hrefPage = 'index.html';
      
      if (hrefPage === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // Run both functions
  setActiveNavLink();
  setActiveFooterLink();

}); // End of DOMContentLoaded