// main.js - menu toggle, contact form validation, and toast notifications
// Small, dependency-free script meant for demo static site.

document.addEventListener('DOMContentLoaded', () => {
  // Update year fields
  const yearEls = document.querySelectorAll('#year, #year-about, #year-projects, #year-blog, #year-contact');
  yearEls.forEach(el => el && (el.textContent = new Date().getFullYear()));

  // Mobile menu toggles
  const menuBtns = document.querySelectorAll('.menu-toggle');
  const nav = document.getElementById('site-nav');

  menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!nav) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      // Toggle display for small screens
      if (getComputedStyle(nav).display === 'none' || nav.style.display === '') {
        nav.style.display = 'block';
      } else {
        nav.style.display = '';
      }
    });
  });

  // Contact form client-side validation (allows native submit to Formsubmit)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      // Simple validation: ensure required fields are non-empty and email is valid
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      if (!name || !email || !message) return; // let the browser handle malformed forms

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        e.preventDefault();
        showToast('Please fill in all required fields.');
        name.focus();
        return false;
      }

      const mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!mailPattern.test(email.value.trim())) {
        e.preventDefault();
        showToast('Please enter a valid email address.');
        email.focus();
        return false;
      }

      // Passed validation — show a small toast and allow the native POST to proceed
      showToast('Sending message...');
      // let the form submit (do not call preventDefault)
      return true;
    });
  }

  // If the page was redirected after a successful Formsubmit POST, show a confirmation
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('sent') === '1') {
      showToast('Message sent — thank you!');
      // Remove the query from the URL to keep it clean (optional)
      if (window.history && window.history.replaceState) {
        const clean = window.location.pathname;
        window.history.replaceState({}, document.title, clean);
      }
    }
  } catch (err) {
    // ignore in non-browser contexts
  }

  // Toast utility
  function showToast(text, timeout = 3000) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      toast.setAttribute('role', 'status');
      document.body.appendChild(toast);
    }
    toast.textContent = text;
    toast.hidden = false;
    toast.style.opacity = '1';
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.hidden = true;
    }, timeout);
  }
});