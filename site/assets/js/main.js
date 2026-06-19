/**
 * ShopStyle E-commerce - Main JavaScript
 * Handles animations, form submissions, and interactive features
 */

(function() {
  'use strict';

  // WhatsApp Configuration
  const WHATSAPP_NUMBER = '5551991213724';

  // =========================================
  // Initialize AOS (Animate On Scroll)
  // =========================================
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
      once: true,
      offset: 100,
      delay: 0
    });
  }

  // =========================================
  // Mobile Menu Toggle
  // =========================================
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
      navToggle.classList.toggle('active');
      nav.classList.toggle('active');
      document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    const navLinks = nav.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('active') && 
          !nav.contains(e.target) && 
          !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        nav.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================
  // Header Scroll Effect
  // =========================================
  const header = document.getElementById('header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // =========================================
  // Smooth Scroll for Anchor Links
  // =========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#' || href === '#!') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================================
  // Counter Animation (Hero Stats)
  // =========================================
  function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString('pt-BR');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString('pt-BR');
      }
    }, 16);
  }

  // Intersection Observer for counter animation
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-counter'));
        if (target) {
          animateCounter(element, target);
          counterObserver.unobserve(element);
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(counter => {
    counterObserver.observe(counter);
  });

  // =========================================
  // Countdown Timer (Promo Banner)
  // =========================================
  function startCountdown() {
    // Set countdown end time (24 hours from now)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        hoursEl.textContent = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      hoursEl.textContent = String(hours).padStart(2, '0');
      minutesEl.textContent = String(minutes).padStart(2, '0');
      secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  startCountdown();

  // =========================================
  // FAQ Accordion
  // =========================================
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    
    if (question) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // =========================================
  // Product "Buy" Button Click Handler
  // =========================================
  const productButtons = document.querySelectorAll('.product-card button[data-product]');

  productButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productName = this.getAttribute('data-product');
      
      // Pre-fill the contact form
      const productInput = document.getElementById('product');
      if (productInput) {
        productInput.value = productName;
        
        // Scroll to contact form
        const contactSection = document.getElementById('contato');
        if (contactSection) {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition = contactSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Focus on the first input
          setTimeout(() => {
            const nameInput = document.getElementById('name');
            if (nameInput) nameInput.focus();
          }, 500);
        }
      }
    });
  });

  // =========================================
  // Contact Form Submission
  // =========================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const cep = document.getElementById('cep').value.trim();
      const product = document.getElementById('product').value.trim();
      const size = document.getElementById('size').value;
      const quantity = document.getElementById('quantity').value;
      const message = document.getElementById('message').value.trim();

      // Validate required fields
      if (!name || !phone || !product) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      // Build WhatsApp message
      let whatsappMessage = `*Novo Pedido - ShopStyle*\n\n`;
      whatsappMessage += `👤 *Nome:* ${name}\n`;
      whatsappMessage += `📱 *Telefone:* ${phone}\n`;
      
      if (cep) {
        whatsappMessage += `📍 *CEP:* ${cep}\n`;
      }
      
      whatsappMessage += `\n🛍️ *Produto:* ${product}\n`;
      
      if (size) {
        whatsappMessage += `📏 *Tamanho:* ${size}\n`;
      }
      
      whatsappMessage += `🔢 *Quantidade:* ${quantity}\n`;
      
      if (message) {
        whatsappMessage += `\n💬 *Observações:*\n${message}\n`;
      }

      whatsappMessage += `\n_Enviado através do site ShopStyle_`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);
      
      // Build WhatsApp URL
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank');

      // Show success feedback
      showSuccessMessage('Redirecionando para o WhatsApp...');

      // Reset form after a short delay
      setTimeout(() => {
        contactForm.reset();
      }, 1000);
    });
  }

  // =========================================
  // WhatsApp Float Button
  // =========================================
  const whatsappFloat = document.getElementById('whatsappFloat');

  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function(e) {
      e.preventDefault();
      
      const message = encodeURIComponent('Olá! Vim do site ShopStyle e gostaria de saber mais sobre os produtos.');
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      
      window.open(whatsappURL, '_blank');
    });
  }

  // =========================================
  // Success Message Helper
  // =========================================
  function showSuccessMessage(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.75rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      font-weight: 600;
      animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // =========================================
  // Phone Number Mask
  // =========================================
  const phoneInput = document.getElementById('phone');
  
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 11) {
        value = value.slice(0, 11);
      }
      
      if (value.length <= 10) {
        // (00) 0000-0000
        value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      } else {
        // (00) 00000-0000
        value = value.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
      }
      
      e.target.value = value;
    });
  }

  // =========================================
  // CEP Mask
  // =========================================
  const cepInput = document.getElementById('cep');
  
  if (cepInput) {
    cepInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      if (value.length > 8) {
        value = value.slice(0, 8);
      }
      
      // 00000-000
      value = value.replace(/^(\d{5})(\d{0,3}).*/, '$1-$2');
      
      e.target.value = value;
    });
  }

  // =========================================
  // Wishlist Button Interaction
  // =========================================
  const wishlistButtons = document.querySelectorAll('.product-card__wishlist');

  wishlistButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const svg = this.querySelector('svg');
      const currentFill = svg.getAttribute('fill') || 'none';
      
      if (currentFill === 'none') {
        svg.setAttribute('fill', 'currentColor');
        showSuccessMessage('Adicionado aos favoritos!');
      } else {
        svg.setAttribute('fill', 'none');
        showSuccessMessage('Removido dos favoritos!');
      }
    });
  });

  // =========================================
  // Active Navigation Link Highlighting
  // =========================================
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const headerHeight = header ? header.offsetHeight : 0;
      
      if (window.scrollY >= (sectionTop - headerHeight - 100)) {
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

  // =========================================
  // Loading State Handler
  // =========================================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger AOS refresh after load
    if (typeof AOS !== 'undefined') {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  });

  // =========================================
  // Form Validation Feedback
  // =========================================
  const formInputs = contactForm ? contactForm.querySelectorAll('input[required], textarea[required], select[required]') : [];

  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        this.style.borderColor = '#ef4444';
      } else {
        this.style.borderColor = '#10b981';
      }
    });

    input.addEventListener('input', function() {
      if (this.style.borderColor === 'rgb(239, 68, 68)' && this.value.trim() !== '') {
        this.style.borderColor = '';
      }
    });
  });

  // =========================================
  // Console Message
  // =========================================
  console.log('%c🛍️ ShopStyle E-commerce', 'color: #6366f1; font-size: 20px; font-weight: bold;');
  console.log('%cDemo desenvolvido por Tiago O. de Farias', 'color: #ec4899; font-size: 14px;');
  console.log('%c🌐 https://tofariasti.github.io/', 'color: #10b981; font-size: 12px;');

})();
