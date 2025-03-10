/**
 * Animations Implementation
 * 
 * This script implements various animations for the portfolio website
 * using anime.js. It includes:
 * - Page transition animations
 * - Scroll-triggered animations
 * - Hover animations
 * - Loading animations
 */

// Constants for animations
const ANIMATION_SETTINGS = {
    DURATION: {
        FAST: 400,
        MEDIUM: 600,
        SLOW: 800
    },
    EASING: {
        IN_OUT: 'cubicBezier(0.4, 0, 0.2, 1)',
        OUT: 'cubicBezier(0.0, 0, 0.2, 1)',
        OUT_EXPO: 'cubicBezier(0.19, 1, 0.22, 1)'
    },
    DELAY: {
        STAGGER: 50,
        INITIAL: 100
    }
};

// DOM elements to animate
let animatedElements;
let projectCards;
let navLinks;
let heroSection;

/**
 * Initialize animations when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get all elements to animate
    animatedElements = document.querySelectorAll('[data-animate]');
    projectCards = document.querySelectorAll('.project-card');
    navLinks = document.querySelectorAll('.nav-link');
    heroSection = document.querySelector('.hero-section');
    
    // Initialize animations
    initPageTransitions();
    initScrollAnimations();
    initHoverAnimations();
    
    // Show page after animations are set up
    document.body.classList.add('loaded');
    
    // Animate hero section elements on page load
    if (heroSection) {
        animateHeroSection();
    }
});

/**
 * Initialize page transition animations
 */
function initPageTransitions() {
    // Handle internal link clicks for smooth page transitions
    document.querySelectorAll('a[href^="/"]:not([target="_blank"])').forEach(link => {
        link.addEventListener('click', (e) => {
            // Only handle internal links
            if (link.hostname === window.location.hostname) {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Animate page out
                anime({
                    targets: 'main',
                    opacity: [1, 0],
                    translateY: [0, 20],
                    easing: ANIMATION_SETTINGS.EASING.OUT,
                    duration: ANIMATION_SETTINGS.DURATION.FAST,
                    complete: () => {
                        // Navigate to new page
                        window.location.href = href;
                    }
                });
            }
        });
    });
    
    // Animate page in on load
    window.addEventListener('load', () => {
        anime({
            targets: 'main',
            opacity: [0, 1],
            translateY: [20, 0],
            easing: ANIMATION_SETTINGS.EASING.OUT,
            duration: ANIMATION_SETTINGS.DURATION.MEDIUM
        });
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animate');
                
                // Apply different animations based on data-animate attribute
                switch (animationType) {
                    case 'fade-in':
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            easing: ANIMATION_SETTINGS.EASING.OUT,
                            duration: ANIMATION_SETTINGS.DURATION.MEDIUM
                        });
                        break;
                    case 'slide-up':
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            easing: ANIMATION_SETTINGS.EASING.OUT,
                            duration: ANIMATION_SETTINGS.DURATION.MEDIUM
                        });
                        break;
                    case 'slide-right':
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            translateX: [-20, 0],
                            easing: ANIMATION_SETTINGS.EASING.OUT,
                            duration: ANIMATION_SETTINGS.DURATION.MEDIUM
                        });
                        break;
                    case 'slide-left':
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            translateX: [20, 0],
                            easing: ANIMATION_SETTINGS.EASING.OUT,
                            duration: ANIMATION_SETTINGS.DURATION.MEDIUM
                        });
                        break;
                    case 'scale-in':
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            scale: [0.9, 1],
                            easing: ANIMATION_SETTINGS.EASING.OUT,
                            duration: ANIMATION_SETTINGS.DURATION.MEDIUM
                        });
                        break;
                    case 'stagger-children':
                        anime({
                            targets: element.children,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            easing: ANIMATION_SETTINGS.EASING.OUT,
                            duration: ANIMATION_SETTINGS.DURATION.MEDIUM,
                            delay: anime.stagger(ANIMATION_SETTINGS.DELAY.STAGGER)
                        });
                        break;
                    default:
                        // Default animation
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            easing: ANIMATION_SETTINGS.EASING.OUT,
                            duration: ANIMATION_SETTINGS.DURATION.MEDIUM
                        });
                }
                
                // Unobserve after animation is triggered
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Initialize hover animations
 */
function initHoverAnimations() {
    // Project card hover animations
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -5,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                borderColor: 'rgba(0, 102, 255, 0.3)',
                easing: ANIMATION_SETTINGS.EASING.OUT,
                duration: ANIMATION_SETTINGS.DURATION.FAST
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                borderColor: 'rgba(238, 238, 238, 1)',
                easing: ANIMATION_SETTINGS.EASING.OUT,
                duration: ANIMATION_SETTINGS.DURATION.FAST
            });
        });
    });
    
    // Navigation link hover animations
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                color: '#000000',
                easing: ANIMATION_SETTINGS.EASING.OUT,
                duration: ANIMATION_SETTINGS.DURATION.FAST
            });
        });
        
        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('nav-link-active')) {
                anime({
                    targets: link,
                    color: '#666666',
                    easing: ANIMATION_SETTINGS.EASING.OUT,
                    duration: ANIMATION_SETTINGS.DURATION.FAST
                });
            }
        });
    });
}

/**
 * Animate hero section elements
 */
function animateHeroSection() {
    // Animate hero heading
    const heroHeading = heroSection.querySelector('h1');
    if (heroHeading) {
        anime({
            targets: heroHeading,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: ANIMATION_SETTINGS.EASING.OUT_EXPO,
            duration: ANIMATION_SETTINGS.DURATION.MEDIUM,
            delay: ANIMATION_SETTINGS.DELAY.INITIAL
        });
    }
    
    // Animate hero description
    const heroDescription = heroSection.querySelector('p');
    if (heroDescription) {
        anime({
            targets: heroDescription,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: ANIMATION_SETTINGS.EASING.OUT_EXPO,
            duration: ANIMATION_SETTINGS.DURATION.MEDIUM,
            delay: ANIMATION_SETTINGS.DELAY.INITIAL + 100
        });
    }
    
    // Animate hero buttons
    const heroButtons = heroSection.querySelectorAll('.btn');
    if (heroButtons.length) {
        anime({
            targets: heroButtons,
            opacity: [0, 1],
            translateY: [20, 0],
            easing: ANIMATION_SETTINGS.EASING.OUT_EXPO,
            duration: ANIMATION_SETTINGS.DURATION.MEDIUM,
            delay: anime.stagger(100, {start: ANIMATION_SETTINGS.DELAY.INITIAL + 200})
        });
    }
    
    // Animate hero image
    const heroImage = heroSection.querySelector('.hero-image');
    if (heroImage) {
        anime({
            targets: heroImage,
            opacity: [0, 1],
            translateY: [20, 0],
            scale: [0.95, 1],
            easing: ANIMATION_SETTINGS.EASING.OUT_EXPO,
            duration: ANIMATION_SETTINGS.DURATION.SLOW,
            delay: ANIMATION_SETTINGS.DELAY.INITIAL + 300
        });
    }
}

/**
 * Create a loading animation
 * @param {HTMLElement} container - Container element for the loading animation
 * @returns {Object} Animation controller
 */
function createLoadingAnimation(container) {
    // Create loading elements
    const loadingEl = document.createElement('div');
    loadingEl.className = 'loading-animation';
    loadingEl.innerHTML = `
        <div class="loading-circle"></div>
        <div class="loading-circle"></div>
        <div class="loading-circle"></div>
    `;
    
    // Add to container
    container.appendChild(loadingEl);
    
    // Animate loading circles
    const animation = anime({
        targets: loadingEl.querySelectorAll('.loading-circle'),
        translateY: [-15, 0],
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: anime.stagger(100),
        duration: 600,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutQuad'
    });
    
    // Return controller to stop animation
    return {
        stop: () => {
            animation.pause();
            loadingEl.remove();
        }
    };
}

// Export functions for use in other scripts
window.portfolioAnimations = {
    createLoadingAnimation
};