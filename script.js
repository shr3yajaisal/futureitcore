// ===== Future IT Core - Main Script =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHamburger();
    initCountdown();
    initScrollAnimations();
    initMatrixRain();
    initContactForm();
    initSmoothScroll();
    initActiveNavHighlight();
});

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const announcementBar = document.getElementById('announcement-bar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Hamburger Menu =====
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== Countdown Timer =====
function initCountdown() {
    // Set target date 30 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ===== Scroll Animations (AOS-like) =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    // Also animate sections on scroll
    const sections = document.querySelectorAll('.section-header, .hacking-text, .hacking-image, .contact-info, .contact-form-wrapper');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// ===== Matrix Rain Effect =====
function initMatrixRain() {
    const matrixRain = document.getElementById('matrix-rain');
    if (!matrixRain) return;

    const chars = '01アイウエオカキクケコサシスセソ';
    const columns = Math.floor(window.innerWidth / 20);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            left: ${i * 20}px;
            top: ${Math.random() * -100}%;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #00f5ff;
            writing-mode: vertical-rl;
            animation: matrixFall ${5 + Math.random() * 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            opacity: ${0.1 + Math.random() * 0.3};
        `;

        let text = '';
        for (let j = 0; j < 20; j++) {
            text += chars[Math.floor(Math.random() * chars.length)];
        }
        column.textContent = text;
        matrixRain.appendChild(column);
    }

    // Add matrix fall animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixFall {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;

        // Show success state
        submitBtn.innerHTML = '<span>✓ Registration Submitted!</span>';
        submitBtn.style.background = 'linear-gradient(135deg, #00b894, #00d4aa)';

        // Reset after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            form.reset();
        }, 3000);
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Active Nav Highlight =====
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}
