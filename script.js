// ========== MOBILE NAVIGATION ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ========== LANGUAGE TOGGLE ==========
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('language') || 'en';

// Set initial language
if (langToggle) {
    updateLanguage(currentLang);
    
    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'id' : 'en';
        localStorage.setItem('language', currentLang);
        updateLanguage(currentLang);
    });
}

function updateLanguage(lang) {
    // Update flag
    const flag = document.querySelector('.flag');
    if (flag) {
        flag.textContent = lang === 'en' ? '🇮🇩' : '🇬🇧';
    }
    
    // Update all translatable elements
    document.querySelectorAll('[data-en]').forEach(element => {
        const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-id');
        
        // Check if element is an input/button or regular text
        if (element.tagName === 'INPUT' || element.tagName === 'BUTTON') {
            element.value = text;
        } else if (element.innerHTML.includes('<span')) {
            // For elements with inner HTML like heart icon
            const spanContent = element.querySelector('span') ? element.querySelector('span').outerHTML : '';
            element.innerHTML = text.replace('♥', spanContent);
        } else {
            element.textContent = text;
        }
    });
}

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const themes = ['default', 'light-theme', 'blue-theme', 'green-theme'];
let currentThemeIndex = parseInt(localStorage.getItem('themeIndex')) || 0;

// Apply saved theme on load
document.body.className = themes[currentThemeIndex] === 'default' ? '' : themes[currentThemeIndex];

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        // Remove current theme
        document.body.classList.remove(...themes);
        
        // Move to next theme
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        localStorage.setItem('themeIndex', currentThemeIndex);
        
        // Apply new theme
        if (themes[currentThemeIndex] !== 'default') {
            document.body.classList.add(themes[currentThemeIndex]);
        }
        
        // Visual feedback
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

// ========== ANIMATED COUNTER ==========
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// ========== INTERSECTION OBSERVER FOR STATS ==========
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(num => {
                if (num.textContent === '0') {
                    animateCounter(num);
                }
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// ========== SMOOTH SCROLL ==========
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

// ========== NAVBAR SCROLL EFFECT ==========
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// ========== PROJECT CARD ANIMATION ==========
const projectCards = document.querySelectorAll('.project-card-new');
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});

// ========== CERTIFICATE CARD HOVER ==========
const certCards = document.querySelectorAll('.cert-card-new');
certCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// ========== FADE IN ON SCROLL ==========
const fadeElements = document.querySelectorAll('.project-card-new, .cert-card-new, .stat-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(el => fadeObserver.observe(el));

// ========== TYPING EFFECT (HOME PAGE ONLY) ==========
const typingText = document.querySelector('.subtitle');
if (typingText && window.location.pathname.includes('index')) {
    const originalText = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);

// ========== CONSOLE EASTER EGG ==========
console.log('%c🚀 Portfolio by Tores Fernando', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c💜 Supported by Angelica Xu', 'color: #8b5cf6; font-size: 16px;');
console.log('%cInterested in working together? Let\'s connect!', 'color: #94a3b8; font-size: 14px;');
}