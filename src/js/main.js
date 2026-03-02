/* ========================================
   ANIME.JS V4 - ADVANCED ANIMATIONS
   More Dynamic & Impressive!
   ======================================== */

import { animate, stagger, createTimeline } from 'animejs';

// Utility: Scroll Observer
const observe = (elements, callback, threshold = 0.15) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                callback(entry.target);
            }
        });
    }, { threshold });
    elements.forEach(el => observer.observe(el));
};

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================================
// ENHANCED ANIMATIONS
// ========================================

// Navigation with slide & fade
const animNav = () => {
    animate('.nav', {
        opacity: [0, 1],
        y: [-40, 0],
        duration: 1200,
        delay: 300,
        ease: 'out(4)'
    });
};

// Hero - Spectacular entrance
const animHero = () => {
    const tl = createTimeline({
        ease: 'out(4)'
    });
    
    // Label dengan scale
    animate('.hero-label', {
        opacity: [0, 1],
        scale: [0.8, 1],
        y: [20, 0],
        duration: 800,
        delay: 200
    });
    
    // Title Line 1 - slide from bottom dengan overshoot
    setTimeout(() => {
        animate('.line-1', {
            opacity: [0, 1],
            y: ['120%', '0%'],
            duration: 1400,
            ease: 'out(5)'
        });
    }, 400);
    
    // Title Line 2 - slide dengan delay
    setTimeout(() => {
        animate('.line-2', {
            opacity: [0, 1],
            y: ['120%', '0%'],
            duration: 1400,
            ease: 'out(5)'
        });
    }, 600);
    
    // Subtitle words - wave effect
    setTimeout(() => {
        const words = document.querySelectorAll('.hero-subtitle .word');
        words.forEach((word, i) => {
            animate(word, {
                opacity: [0, 1],
                y: [40, 0],
                rotate: [5, 0],
                duration: 1000,
                delay: i * 80,
                ease: 'out(3)'
            });
        });
    }, 1000);
    
    // Description - fade slide tanpa blur
    setTimeout(() => {
        const desc = document.querySelector('.hero-description');
        if (desc) {
            animate(desc, {
                opacity: [0, 1],
                y: [30, 0],
                duration: 1000,
                ease: 'out(3)'
            });
        }
    }, 1400);
    
    // CTA Buttons - bounce in
    setTimeout(() => {
        animate('.hero-cta .btn', {
            opacity: [0, 1],
            scale: [0.8, 1.05, 1],
            y: [40, -5, 0],
            duration: 1200,
            delay: stagger(120),
            ease: 'out(4)'
        });
    }, 1600);
    
    // Stats - count up dengan scale pulse
    setTimeout(() => {
        animate('.hero-stats', {
            opacity: [0, 1],
            y: [30, 0],
            duration: 1000
        });
        
        // Animated counter
        document.querySelectorAll('.stat-number').forEach(el => {
            const target = parseFloat(el.dataset.target);
            let current = 0;
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            const stepTime = duration / steps;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = target < 10 ? current.toFixed(2) : Math.round(current);
            }, stepTime);
            
            // Pulse animation
            animate(el, {
                scale: [1, 1.1, 1],
                duration: 800,
                delay: 400,
                ease: 'inOut(3)'
            });
        });
    }, 1800);
    
    // Scroll indicator - floating
    setTimeout(() => {
        animate('.scroll-indicator', {
            opacity: [0, 1],
            y: [30, 0],
            duration: 1000
        });
    }, 2200);
};

// Gradient Orbs - organic movement
const animOrbs = () => {
    animate('.orb-1', {
        x: [
            { value: 60, duration: 4000 },
            { value: -40, duration: 5000 },
            { value: 30, duration: 4000 },
            { value: 0, duration: 3000 }
        ],
        y: [
            { value: 40, duration: 5000 },
            { value: -60, duration: 4000 },
            { value: 20, duration: 4000 },
            { value: 0, duration: 3000 }
        ],
        rotate: [
            { value: 180, duration: 8000 },
            { value: 360, duration: 8000 }
        ],
        loop: true,
        ease: 'inOut(2)'
    });
    
    animate('.orb-2', {
        x: [
            { value: -50, duration: 5000 },
            { value: 70, duration: 4000 },
            { value: -30, duration: 4000 },
            { value: 0, duration: 3000 }
        ],
        y: [
            { value: -40, duration: 4000 },
            { value: 50, duration: 5000 },
            { value: -20, duration: 4000 },
            { value: 0, duration: 3000 }
        ],
        rotate: [
            { value: -180, duration: 8000 },
            { value: 0, duration: 8000 }
        ],
        loop: true,
        ease: 'inOut(2)'
    });
};

// Section Header - split reveal
const animHeader = (section) => {
    const num = section.querySelector('.section-number');
    const title = section.querySelector('.section-title');
    
    if (num) {
        animate(num, {
            opacity: [0, 1],
            x: [-60, 0],
            rotate: [-10, 0],
            duration: 1000,
            ease: 'out(4)'
        });
    }
    
    if (title) {
        // Letter-by-letter reveal
        const text = title.textContent;
        title.innerHTML = text.split('').map(char => 
            `<span style="display:inline-block;opacity:0">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        setTimeout(() => {
            animate(title.querySelectorAll('span'), {
                opacity: [0, 1],
                y: [30, 0],
                rotate: [10, 0],
                duration: 600,
                delay: stagger(30),
                ease: 'out(3)'
            });
        }, 300);
    }
};

// About - cascade reveal
const animAbout = (section) => {
    animHeader(section);
    
    setTimeout(() => {
        animate(section.querySelector('.about-intro'), {
            opacity: [0, 1],
            y: [50, 0],
            scale: [0.95, 1],
            duration: 1200,
            ease: 'out(4)'
        });
    }, 600);
    
    setTimeout(() => {
        animate(section.querySelectorAll('.about-detail'), {
            opacity: [0, 1],
            x: [-40, 0],
            duration: 1000,
            delay: stagger(200),
            ease: 'out(3)'
        });
    }, 900);
    
    setTimeout(() => {
        animate(section.querySelectorAll('.highlight-item'), {
            opacity: [0, 1],
            scale: [0.7, 1.05, 1],
            rotate: [-5, 2, 0],
            duration: 1000,
            delay: stagger(150),
            ease: 'out(4)'
        });
    }, 1200);
    
    setTimeout(() => {
        const img = section.querySelector('.image-frame');
        if (img) {
            animate(img, {
                opacity: [0, 1],
                scale: [0.8, 1],
                rotate: [-3, 0],
                duration: 1400,
                ease: 'out(4)'
            });
        }
    }, 1000);
};

// Skills - progress bars dengan easing
const animSkills = (section) => {
    animHeader(section);
    
    setTimeout(() => {
        animate(section.querySelectorAll('.skill-category'), {
            opacity: [0, 1],
            y: [60, 0],
            duration: 1200,
            delay: stagger(250),
            ease: 'out(4)'
        });
    }, 600);
    
    setTimeout(() => {
        section.querySelectorAll('.skill-category').forEach((cat, catIdx) => {
            setTimeout(() => {
                const items = cat.querySelectorAll('.skill-item');
                
                animate(items, {
                    opacity: [0, 1],
                    x: [-50, 0],
                    duration: 800,
                    delay: stagger(100),
                    ease: 'out(3)',
                    complete: () => {
                        // Animated progress bars
                        items.forEach((item, idx) => {
                            const bar = item.querySelector('.skill-progress');
                            if (bar) {
                                const targetWidth = bar.dataset.progress + '%';
                                setTimeout(() => {
                                    animate(bar, {
                                        width: [0, targetWidth],
                                        duration: 1500,
                                        ease: 'out(4)'
                                    });
                                    
                                    // Glow effect
                                    animate(bar, {
                                        boxShadow: [
                                            '0 0 0 rgba(20, 241, 149, 0)',
                                            '0 0 20px rgba(20, 241, 149, 0.6)',
                                            '0 0 0 rgba(20, 241, 149, 0)'
                                        ],
                                        duration: 1000,
                                        delay: 500
                                    });
                                }, idx * 80);
                            }
                        });
                    }
                });
            }, catIdx * 400);
        });
    }, 1000);
};

// Experience - timeline draw
const animExp = (section) => {
    animHeader(section);
    
    setTimeout(() => {
        const line = section.querySelector('.timeline-line');
        if (line) {
            line.style.height = '0';
            animate(line, {
                height: ['0%', '100%'],
                opacity: [0, 1],
                duration: 2000,
                ease: 'out(3)'
            });
        }
    }, 600);
    
    setTimeout(() => {
        animate(section.querySelectorAll('.timeline-item'), {
            opacity: [0, 1],
            x: [-80, 0],
            duration: 1000,
            delay: stagger(300),
            ease: 'out(4)'
        });
    }, 1000);
    
    setTimeout(() => {
        animate(section.querySelectorAll('.timeline-dot'), {
            scale: [0, 1.5, 1],
            opacity: [0, 1],
            rotate: [0, 360],
            duration: 1200,
            delay: stagger(300),
            ease: 'out(4)'
        });
    }, 1400);
};

// Projects - card flip
const animProjects = (section) => {
    animHeader(section);
    
    setTimeout(() => {
        const cards = section.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
            card.style.transformStyle = 'preserve-3d';
            card.style.perspective = '1000px';
            
            animate(card, {
                opacity: [0, 1],
                rotateY: [90, 0],
                scale: [0.8, 1],
                y: [60, 0],
                duration: 1200,
                delay: i * 120,
                ease: 'out(4)'
            });
        });
    }, 600);
};

// Education - bounce cards
const animEducation = (section) => {
    animHeader(section);
    
    setTimeout(() => {
        animate(section.querySelectorAll('.education-card'), {
            opacity: [0, 1],
            y: [80, 0],
            scale: [0.8, 1.05, 1],
            rotate: [-5, 2, 0],
            duration: 1200,
            delay: stagger(200),
            ease: 'out(4)'
        });
    }, 600);
    
    setTimeout(() => {
        animate(section.querySelectorAll('.education-icon'), {
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            scale: [1, 1.2, 1],
            duration: 1500,
            delay: stagger(250),
            loop: 3,
            ease: 'inOut(3)'
        });
    }, 1400);
};

// Contact - wave reveal
const animContact = (section) => {
    animHeader(section);
    
    setTimeout(() => {
        animate(section.querySelector('.contact-intro'), {
            opacity: [0, 1],
            y: [40, 0],
            duration: 1000
        });
    }, 600);
    
    setTimeout(() => {
        animate(section.querySelectorAll('.contact-method'), {
            opacity: [0, 1],
            x: [-60, 0],
            scale: [0.9, 1],
            duration: 800,
            delay: stagger(150),
            ease: 'out(3)'
        });
    }, 900);
    
    setTimeout(() => {
        const cta = section.querySelector('.cta-box');
        if (cta) {
            animate(cta, {
                opacity: [0, 1],
                scale: [0.85, 1.05, 1],
                y: [50, -10, 0],
                duration: 1400,
                ease: 'out(4)'
            });
        }
    }, 1200);
};

// ========================================
// HOVER INTERACTIONS
// ========================================

const initHovers = () => {
    // Buttons - magnetic effect
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            animate(this, {
                scale: 1.08,
                duration: 400,
                ease: 'out(3)'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            animate(this, {
                scale: 1,
                duration: 400,
                ease: 'out(3)'
            });
        });
        
        // Mouse move parallax
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.08)`;
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Project Cards - 3D tilt
    document.querySelectorAll('.project-card').forEach(card => {
        const num = card.querySelector('.project-number');
        
        card.addEventListener('mouseenter', () => {
            if (num) {
                animate(num, {
                    opacity: [0.1, 0.3],
                    scale: [1, 1.2],
                    rotate: [0, 5],
                    duration: 500,
                    ease: 'out(3)'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (num) {
                animate(num, {
                    opacity: [0.3, 0.1],
                    scale: [1.2, 1],
                    rotate: [5, 0],
                    duration: 500,
                    ease: 'out(3)'
                });
            }
        });
        
        // 3D tilt effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Contact icons - spin & scale
    document.querySelectorAll('.contact-method').forEach(method => {
        const icon = method.querySelector('.contact-icon');
        
        method.addEventListener('mouseenter', () => {
            if (icon) {
                animate(icon, {
                    scale: [1, 1.4],
                    rotate: [0, 360],
                    duration: 600,
                    ease: 'out(3)'
                });
            }
        });
        
        method.addEventListener('mouseleave', () => {
            if (icon) {
                animate(icon, {
                    scale: [1.4, 1],
                    duration: 400,
                    ease: 'out(3)'
                });
            }
        });
    });
};

// Theme Toggle - smooth transition
const initTheme = () => {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    
    const icon = toggle.querySelector('.theme-icon');
    
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (icon) {
            animate(icon, {
                rotate: [0, 540],
                scale: [1, 0.5, 1.3, 1],
                duration: 800,
                ease: 'out(4)',
                complete: () => {
                    icon.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
                }
            });
        }
    });
    
    toggle.addEventListener('mouseenter', () => {
        if (icon) {
            animate(icon, {
                scale: 1.3,
                rotate: 15,
                duration: 300
            });
        }
    });
    
    toggle.addEventListener('mouseleave', () => {
        if (icon) {
            animate(icon, {
                scale: 1,
                rotate: 0,
                duration: 300
            });
        }
    });
};

// Scroll Progress - gradient bar
const initProgress = () => {
    const bar = document.createElement('div');
    bar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        width: 0%;
        background: linear-gradient(90deg, #14F195 0%, #9333EA 50%, #F59E0B 100%);
        z-index: 10000;
        transition: width 0.1s ease-out;
        box-shadow: 0 0 20px rgba(20, 241, 149, 0.5);
    `;
    document.body.appendChild(bar);
    
    window.addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / max) * 100;
        bar.style.width = progress + '%';
    });
};

// Parallax Effect on Scroll
const initParallax = () => {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.3;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
};

// ========================================
// INIT
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Advanced Animations Loaded!');
    
    initTheme();
    initProgress();
    initParallax();
    
    animNav();
    animHero();
    animOrbs();
    
    setTimeout(initHovers, 1500);
    
    // Scroll Observers
    const sections = {
        about: document.querySelector('#about'),
        skills: document.querySelector('#skills'),
        experience: document.querySelector('#experience'),
        projects: document.querySelector('#projects'),
        education: document.querySelector('#education'),
        contact: document.querySelector('#contact')
    };
    
    if (sections.about) observe([sections.about], animAbout);
    if (sections.skills) observe([sections.skills], animSkills);
    if (sections.experience) observe([sections.experience], animExp);
    if (sections.projects) observe([sections.projects], animProjects);
    if (sections.education) observe([sections.education], animEducation);
    if (sections.contact) observe([sections.contact], animContact);
    
    // Active Nav State
    const navLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        allSections.forEach(section => {
            const top = section.offsetTop;
            if (scrollY >= (top - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Nav scroll effect
        const nav = document.querySelector('.nav');
        if (nav) {
            if (scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
    });
    
    console.log('✨ Ready to Impress!');
});