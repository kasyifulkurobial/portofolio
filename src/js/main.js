/* ==========================================================================
   PORTFOLIO CONTROLLER & STORY CHOREOGRAPHER
   Coordinates WebGL 3D Scene, Chapter Stepper, Audio Feedback, & Tactile Tilt
   ========================================================================== */

import { ThreeScene } from './three-scene.js';
import { sound } from './sound.js';

class PortfolioApp {
    constructor() {
        this.chapters = [
            'intro',
            'about',
            'experience',
            'projects',
            'skills',
            'contact'
        ];
        this.currentChapterIndex = 0;
        
        this.init();
    }

    init() {
        // 1. Initialize Three.js 3D Engine
        try {
            this.threeScene = new ThreeScene('webgl-canvas');
        } catch (e) {
            console.warn('ThreeScene initialization error:', e);
        }

        // 2. Initialize Core Subsystems
        this.initPreloader();
        this.initChapterStepper();
        this.initChapterNav();
        this.initScrollTracking();
        this.initSoundToggle();
        this.initTactileTilt();
        this.initExploreButton();
    }

    /* --------------------------------------------------------------------------
       1. Preloader Simulation & Entrance
       -------------------------------------------------------------------------- */
    initPreloader() {
        const preloader = document.getElementById('preloader');
        const bar = document.getElementById('preloader-bar');
        const pct = document.getElementById('preloader-pct');

        if (!preloader) return;

        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 14) + 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);

                if (bar) bar.style.width = '100%';
                if (pct) pct.textContent = '100%';

                setTimeout(() => {
                    preloader.classList.add('loaded');
                    document.body.classList.remove('experience-loading');
                    document.body.classList.add('sound-on');
                    sound.playTransition();
                }, 200);
            } else {
                if (bar) bar.style.width = `${progress}%`;
                if (pct) pct.textContent = `${progress}%`;
            }
        }, 22);
    }

    /* --------------------------------------------------------------------------
       2. Chapter Navigation (Left Circular Buttons)
       -------------------------------------------------------------------------- */
    initChapterNav() {
        const navBtns = document.querySelectorAll('.nav-chapter-btn');

        navBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index, 10);
                this.goToChapter(index);
            });
        });
    }

    /* --------------------------------------------------------------------------
       3. Section Stepper (Prev / Next Buttons & Counter)
       -------------------------------------------------------------------------- */
    initChapterStepper() {
        const prevBtn = document.getElementById('nav-step-prev');
        const nextBtn = document.getElementById('nav-step-next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (this.currentChapterIndex > 0) {
                    this.goToChapter(this.currentChapterIndex - 1);
                } else {
                    this.goToChapter(this.chapters.length - 1);
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.currentChapterIndex < this.chapters.length - 1) {
                    this.goToChapter(this.currentChapterIndex + 1);
                } else {
                    this.goToChapter(0);
                }
            });
        }
    }

    goToChapter(index) {
        if (index < 0 || index >= this.chapters.length) return;
        this.currentChapterIndex = index;

        const targetId = this.chapters[index];
        const targetEl = document.getElementById(targetId);

        if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
        }

        this.updateActiveChapterUI(index);
        sound.playClick();

        if (this.threeScene) {
            this.threeScene.setChapter(index);
        }
    }

    updateActiveChapterUI(index) {
        // Update Stepper Counter
        const counterEl = document.getElementById('current-chapter-text');
        if (counterEl) {
            counterEl.textContent = String(index + 1).padStart(2, '0');
        }

        // Update Nav Chapter Buttons
        const navBtns = document.querySelectorAll('.nav-chapter-btn');
        navBtns.forEach((btn) => {
            const btnIdx = parseInt(btn.dataset.index, 10);
            if (btnIdx === index) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    /* --------------------------------------------------------------------------
       4. Scroll Tracking & Intersection Observer
       -------------------------------------------------------------------------- */
    initScrollTracking() {
        const scrollBar = document.getElementById('scroll-indicator-bar');

        // Scroll Progress Bar
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY || window.pageYOffset;
            const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;

            if (scrollBar) {
                scrollBar.style.height = `${Math.min(Math.max(progress, 0), 100)}%`;
            }
        }, { passive: true });

        // Section Intersection Observer
        const chapterSections = document.querySelectorAll('.story-chapter');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const chapterIndex = parseInt(entry.target.dataset.chapterIndex, 10);
                    if (!isNaN(chapterIndex) && chapterIndex !== this.currentChapterIndex) {
                        this.currentChapterIndex = chapterIndex;
                        this.updateActiveChapterUI(chapterIndex);
                        if (this.threeScene) {
                            this.threeScene.setChapter(chapterIndex);
                        }
                    }
                }
            });
        }, { threshold: 0.45 });

        chapterSections.forEach((section) => observer.observe(section));
    }

    /* --------------------------------------------------------------------------
       5. Sound Toggle Controller
       -------------------------------------------------------------------------- */
    initSoundToggle() {
        const soundBtn = document.getElementById('sound-button');
        const soundStatus = document.getElementById('sound-status');

        if (!soundBtn) return;

        soundBtn.addEventListener('click', () => {
            const isMuted = sound.toggleMute();
            if (isMuted) {
                if (soundStatus) soundStatus.textContent = 'off';
                document.body.classList.remove('sound-on');
            } else {
                if (soundStatus) soundStatus.textContent = 'on';
                document.body.classList.add('sound-on');
            }
        });
    }

    /* --------------------------------------------------------------------------
       6. Tactile 3D Tilt Effect on Cards
       -------------------------------------------------------------------------- */
    initTactileTilt() {
        const tiltCards = document.querySelectorAll('.tilt-card');

        tiltCards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const normX = (x - centerX) / centerX;
                const normY = (y - centerY) / centerY;

                const rotX = -normY * 5.0;
                const rotY = normX * 5.0;

                card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });

            card.addEventListener('mouseenter', () => {
                sound.playHover();
            });
        });
    }

    /* --------------------------------------------------------------------------
       7. Hero Explore Button
       -------------------------------------------------------------------------- */
    initExploreButton() {
        const exploreBtn = document.getElementById('btnExplore');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                this.goToChapter(2); // Jump straight to Experience
            });
        }
    }
}

// Instantiate on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});