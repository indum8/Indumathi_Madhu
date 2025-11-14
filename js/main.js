// Modal logic for PDF viewer
document.addEventListener('DOMContentLoaded', function () {
  const resumeLink = document.getElementById('resume-link');
  const resumeNavLink = document.getElementById('resume-link-nav');
  const modal = document.getElementById('pdf-modal');
  const iframe = modal.querySelector('.pdf-iframe');
  const closeBtn = modal.querySelector('.pdf-modal-close');
  const backdrop = modal.querySelector('[data-close]');
  const downloadBtn = document.getElementById('pdf-download');

  function openModalFrom(href) {
    // open modal and set iframe + download href
    const spinner = modal.querySelector('.pdf-spinner');
    if (spinner) spinner.removeAttribute('hidden');
    iframe.src = href;
    if (downloadBtn) downloadBtn.setAttribute('href', href);
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function openModal(e) {
    e.preventDefault();
    const href = resumeLink.getAttribute('href');
    openModalFrom(href);
  }

  function openModalFromNav(e) {
    e.preventDefault();
    const href = resumeNavLink.getAttribute('href');
    openModalFrom(href);
  }

  function closeModal() {
    iframe.src = '';
    const spinner = modal.querySelector('.pdf-spinner');
    if (spinner) spinner.setAttribute('hidden', '');
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    resumeLink.focus();
  }

  resumeLink && resumeLink.addEventListener('click', openModal);
  resumeNavLink && resumeNavLink.addEventListener('click', openModalFromNav);
  closeBtn && closeBtn.addEventListener('click', closeModal);
  backdrop && backdrop.addEventListener('click', closeModal);

  // Hide spinner when iframe finishes loading or errors
  iframe.addEventListener('load', function () {
    const spinner = modal.querySelector('.pdf-spinner');
    if (spinner) spinner.setAttribute('hidden', '');
  });
  iframe.addEventListener('error', function () {
    const spinner = modal.querySelector('.pdf-spinner');
    if (spinner) spinner.setAttribute('hidden', '');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
});

// Contact form fallback: opens mail client when no form action is provided
document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    // If form has an action (e.g., Formspree) let the browser handle it
    const action = contactForm.getAttribute('action') || '';
    if (action.trim() !== '') return;

    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('name').value || '');
    const from = encodeURIComponent(document.getElementById('email').value || '');
    const message = encodeURIComponent(document.getElementById('message').value || '');
    const subject = encodeURIComponent('Website contact from ' + (name || from));
    const body = encodeURIComponent('Name: ' + decodeURIComponent(name) + '\nEmail: ' + decodeURIComponent(from) + '\n\n' + decodeURIComponent(message));
    // open mail client
    const mailto = 'mailto:indumathi.madhu@gwu.edu?subject=' + subject + '&body=' + body;
    window.location.href = mailto;
  });
});

// Play/pause Visual Odometry thumbnail on hover/focus/touch
document.addEventListener('DOMContentLoaded', function () {
  const voVideos = document.querySelectorAll('.project-card.project-vo .project-thumb-video');
  voVideos.forEach(video => {
    // Ensure video is paused by default
    try { video.pause(); video.currentTime = 0; } catch (e) {}

    const playVideo = () => { video.play().catch(()=>{}); };
    const stopVideo = () => { try { video.pause(); video.currentTime = 0; } catch (e) {} };

    const parentLink = video.closest('.project-link');

    if (parentLink) {
      // use pointer events for better cross-device reliability
      parentLink.addEventListener('pointerenter', (e) => { console.log('VO hover enter'); playVideo(); });
      parentLink.addEventListener('pointerleave', (e) => { console.log('VO hover leave'); stopVideo(); });
      parentLink.addEventListener('focusin', (e) => { playVideo(); });
      parentLink.addEventListener('focusout', (e) => { stopVideo(); });
    } else {
      video.addEventListener('pointerenter', playVideo);
      video.addEventListener('pointerleave', stopVideo);
    }

    // Touch devices: toggle playback on first tap
    let tapped = false;
    video.addEventListener('touchstart', (e) => {
      // Prevent multiple quick touches from bubbling
      if (!tapped) { playVideo(); tapped = true; }
      else { stopVideo(); tapped = false; }
    }, { passive: true });
  });
});

// Interactive scan glow: highlight project cards & timeline items under cursor
document.addEventListener('DOMContentLoaded', () => {
  const scanItems = document.querySelectorAll('.project-card, .timeline-item');
  if (!scanItems.length) return;

  scanItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('active-scan');
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('active-scan');
    });
    // Keyboard accessibility: apply on focus for focusable descendants
    item.addEventListener('focusin', () => {
      item.classList.add('active-scan');
    });
    item.addEventListener('focusout', () => {
      item.classList.remove('active-scan');
    });
  });
});

// Skills tabs interaction
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.skills-tab');
  const panels = document.querySelectorAll('[data-skill-panel]');
  if (!tabs.length) return;

  function activate(domain){
    tabs.forEach(t => {
      const isMatch = t.getAttribute('data-skill-tab') === domain;
      t.classList.toggle('is-active', isMatch);
      t.setAttribute('aria-selected', isMatch ? 'true' : 'false');
    });
    panels.forEach(p => {
      const match = p.getAttribute('data-skill-panel') === domain;
      if (match){ p.removeAttribute('hidden'); p.setAttribute('aria-hidden','false'); }
      else { p.setAttribute('hidden',''); p.setAttribute('aria-hidden','true'); }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      activate(tab.getAttribute('data-skill-tab'));
    });
    tab.addEventListener('keydown', (e) => {
      // simple arrow navigation among tabs
      if (!['ArrowRight','ArrowLeft'].includes(e.key)) return;
      e.preventDefault();
      const order = Array.from(tabs);
      const idx = order.indexOf(tab);
      const nextIdx = e.key === 'ArrowRight' ? (idx + 1) % order.length : (idx - 1 + order.length) % order.length;
      order[nextIdx].focus();
    });
  });

  // initial activation
  activate('programming');
});
