/**
 * Professional Talents — Interactive Scripts
 * Operating Since 2020
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');

  const onScroll = () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 2. Mobile navigation toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // 3. Active navigation highlight on scroll
  const sections = document.querySelectorAll('section[id]');

  const handleActiveNav = () => {
    const scrollY = window.pageYOffset + 100;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleActiveNav, { passive: true });

  // 4. Ensure all external Google Form links open properly in a new tab
  const formLinks = document.querySelectorAll('a[href*="docs.google.com/forms"]');
  formLinks.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // 5. Contact Form On-Page Submission Handler
  const contactForm = document.getElementById('contactUsForm');
  const submitBtn = document.getElementById('contactSubmitBtn');
  const successMsg = document.getElementById('contactSuccessMsg');
  const hiddenIframe = document.getElementById('contact_hidden_iframe');

  if (contactForm && submitBtn && successMsg) {
    let isSubmitting = false;

    contactForm.addEventListener('submit', () => {
      isSubmitting = true;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
        <span>Sending...</span>
      `;
    });

    if (hiddenIframe) {
      hiddenIframe.addEventListener('load', () => {
        if (isSubmitting) {
          isSubmitting = false;
          submitBtn.disabled = false;
          submitBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            <span>Send Message</span>
          `;
          contactForm.reset();
          successMsg.style.display = 'flex';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 8000);
        }
      });
    }
  }
});
