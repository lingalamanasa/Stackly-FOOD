/* ============================================
   STACKLY AGSEC - Food Security Theme
   Complete JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---- Mobile Menu Toggle ----
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');

  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }

  // ---- Sticky Navbar ----
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
    // Trigger on load too
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    }
  }

  // ---- Hero Image Slider ----
  const slides = document.querySelectorAll('.slider .slide');
  if (slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    function nextSlide() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % totalSlides;
      slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);
  }

  // ---- Typing Effect ----
  const typingElement = document.getElementById('typingText');
  if (typingElement) {
    const phrases = [
      'IoT Crop Diagnostics & Safety',
      'Resilient Grain Silo Telemetry',
      'Secure Cold-Chain Logistics Monitoring',
      'Sourcing Traceability Verified'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before next phrase
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // ---- Scroll Animations (IntersectionObserver) ----
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale'
  );

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    animatedElements.forEach(el => observer.observe(el));
  }

  // ---- Animated Counters ----
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (counters.length > 0) {
    let countersStarted = false;

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            startCounters();
            counterObserver.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach(counter => counterObserver.observe(counter));

    function startCounters() {
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);

          counter.textContent = current.toLocaleString() + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString() + suffix;
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }
  }

  // ---- Active Nav Link Highlight ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinksAll = document.querySelectorAll('.nav-links li a:not(.btn-nav)');

  navLinksAll.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html') || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
    // Handle hash links on home page
    if (href && href.startsWith('#') && (currentPage === 'index.html' || currentPage === '')) {
      link.classList.remove('active');
      if (href === '#home') {
        link.classList.add('active');
      }
    }
  });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = targetElement.offsetTop - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Password Visibility Toggle ----
  const togglePasswordBtns = document.querySelectorAll('.toggle-password');
  togglePasswordBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });

  // ---- Toast Notification ----
  function showToast(message, type = 'success') {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
      <span class="toast-message">${message}</span>
    `;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = type === 'success' ? '#10b981' : '#ef4444';
    toast.style.color = '#0f172a';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.zIndex = '9999';
    toast.style.fontWeight = '600';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.3)';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.style.opacity = '1', 10);

    // Auto remove
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // ---- Form Validation Helpers ----
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[\+]?[0-9\s\-\(\)]{7,15}$/.test(phone);
  }

  function showError(group, message) {
    group.classList.add('error');
    const errorEl = group.querySelector('.error-message');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }

  function clearError(group) {
    group.classList.remove('error');
    const errorEl = group.querySelector('.error-message');
    if (errorEl) {
      errorEl.style.display = 'none';
    }
  }

  // Clear errors on input
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('input', () => {
      clearError(input.closest('.form-group'));
    });
  });

  // ---- Contact Form Validation ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = contactForm.querySelector('#contact-name');
      const email = contactForm.querySelector('#contact-email');
      const phone = contactForm.querySelector('#contact-phone');
      const subject = contactForm.querySelector('#contact-subject');
      const message = contactForm.querySelector('#contact-message');

      // Name
      if (name && name.value.trim().length < 2) {
        showError(name.closest('.form-group'), 'Please enter your full name');
        isValid = false;
      }

      // Email
      if (email && !validateEmail(email.value.trim())) {
        showError(email.closest('.form-group'), 'Please enter a valid email address');
        isValid = false;
      }

      // Phone
      if (phone && phone.value.trim() && !validatePhone(phone.value.trim())) {
        showError(phone.closest('.form-group'), 'Please enter a valid phone number');
        isValid = false;
      }

      // Subject
      if (subject && subject.value.trim().length < 3) {
        showError(subject.closest('.form-group'), 'Please enter a location/city');
        isValid = false;
      }

      // Message
      if (message && message.value.trim().length < 10) {
        showError(message.closest('.form-group'), 'Message must be at least 10 characters');
        isValid = false;
      }

      if (isValid) {
        showToast('Your diagnostic request has been sent successfully!', 'success');
        contactForm.reset();
      }
    });
  }

  // ---- Login Form Validation ----
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const email = loginForm.querySelector('#login-email');
      const password = loginForm.querySelector('#login-password');
      const roleSelect = loginForm.querySelector('#login-role');

      if (email && !validateEmail(email.value.trim())) {
        showError(email.closest('.form-group'), 'Please enter a valid email address');
        isValid = false;
      }

      if (password && password.value.length < 6) {
        showError(password.closest('.form-group'), 'Password must be at least 6 characters');
        isValid = false;
      }

      if (roleSelect && !roleSelect.value) {
        showError(roleSelect.closest('.form-group'), 'Please select your role');
        isValid = false;
      }

      if (isValid) {
        const selectedRole = roleSelect.value;
        const enteredEmail = email.value.trim().toLowerCase();
        const storedEmail = localStorage.getItem('registeredEmail');
        
        // Extract default username from email
        let displayName = enteredEmail.split('@')[0];
        displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        
        // If matches registered email, use registered name
        if (storedEmail && enteredEmail === storedEmail) {
          const registeredName = localStorage.getItem('registeredName');
          if (registeredName) {
            displayName = registeredName;
          }
        }
        
        localStorage.setItem('currentUser', displayName);

        showToast(`Login successful! Redirecting to ${selectedRole} dashboard...`, 'success');
        setTimeout(() => {
          if (selectedRole === 'admin') {
            window.location.href = 'admin-dashboard.html';
          } else if (selectedRole === 'chef') {
            window.location.href = 'chef-dashboard.html';
          } else {
            window.location.href = 'customer-dashboard.html';
          }
        }, 1500);
      }
    });
  }

  // ---- Register Form Validation ----
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = registerForm.querySelector('#register-name');
      const email = registerForm.querySelector('#register-email');
      const password = registerForm.querySelector('#register-password');
      const confirmPassword = registerForm.querySelector('#register-confirm-password');
      const terms = registerForm.querySelector('#terms-checkbox');

      if (name && name.value.trim().length < 2) {
        showError(name.closest('.form-group'), 'Please enter your full name');
        isValid = false;
      }

      if (email && !validateEmail(email.value.trim())) {
        showError(email.closest('.form-group'), 'Please enter a valid email address');
        isValid = false;
      }

      if (password && password.value.length < 6) {
        showError(password.closest('.form-group'), 'Password must be at least 6 characters');
        isValid = false;
      }

      if (confirmPassword && confirmPassword.value !== password.value) {
        showError(confirmPassword.closest('.form-group'), 'Passwords do not match');
        isValid = false;
      }

      if (terms && !terms.checked) {
        showToast('Please accept the Terms & Conditions', 'error');
        isValid = false;
      }

      if (isValid) {
        // Save user registration data
        localStorage.setItem('registeredName', name.value.trim());
        localStorage.setItem('registeredEmail', email.value.trim().toLowerCase());

        showToast('Account created successfully! Redirecting to login...', 'success');
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1500);
      }
    });
  }

  // ---- Newsletter Form ----
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && validateEmail(emailInput.value.trim())) {
        showToast('Subscribed successfully! Welcome to Stackly AgSec.', 'success');
        emailInput.value = '';
      } else {
        showToast('Please enter a valid email address.', 'error');
      }
    });
  });

  // ---- Inject Logged-In Username into Dashboards ----
  const usernameSpan = document.getElementById('dashboard-username');
  if (usernameSpan) {
    const user = localStorage.getItem('currentUser');
    if (user) {
      usernameSpan.textContent = user;
    }
  }

  // ---- Log Out Handler ----
  document.querySelectorAll('a').forEach(link => {
    if (link.textContent.includes('Log Out')) {
      link.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
      });
    }
  });
});
