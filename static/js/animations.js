/**
 * Animations Implementation
 * 
 * This script implements various animations for the portfolio website
 * using anime.js. It includes:
 * - Reveal animations for text and elements
 * - Hover animations for cards and buttons
 * - Scroll-triggered animations
 * - Loading animations
 */

// Constants for animations
const ANIMATION_SETTINGS = {
    REVEAL_DURATION: 800,       // Duration of reveal animations in milliseconds
    REVEAL_DELAY_INCREMENT: 100, // Delay increment for staggered animations
    HOVER_DURATION: 300,        // Duration of hover animations
    SCROLL_THRESHOLD: 0.2,      // Threshold for scroll animations (0-1)
};

// DOM elements to animate
let revealTextElements;
let revealTextDelayElements;
let revealImageElements;
let revealButtonElements;
let hoverCardElements;
let projectCardElements;

/**
 * Initialize animations when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get all elements to animate
    revealTextElements = document.querySelectorAll('.reveal-text');
    revealTextDelayElements = document.querySelectorAll('.reveal-text-delay');
    revealImageElements = document.querySelectorAll('.reveal-image');
    revealButtonElements = document.querySelectorAll('.reveal-buttons');
    hoverCardElements = document.querySelectorAll('.hover-card');
    projectCardElements = document.querySelectorAll('.project-card');
    
    // Initialize animations
    initRevealAnimations();
    initHoverAnimations();
    initScrollAnimations();
    
    // Show page after animations are set up
    document.body.classList.add('loaded');
});

/**
 * Initialize reveal animations for page load
 */
function initRevealAnimations() {
    // Animate text elements
    anime({
        targets: revealTextElements,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: ANIMATION_SETTINGS.REVEAL_DURATION,
        delay: (el, i) => i * ANIMATION_SETTINGS.REVEAL_DELAY_INCREMENT
    });
    
    // Animate delayed text elements
    anime({
        targets: revealTextDelayElements,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: ANIMATION_SETTINGS.REVEAL_DURATION,
        delay: (el, i) => 300 + i * ANIMATION_SETTINGS.REVEAL_DELAY_INCREMENT
    });
    
    // Animate image elements
    anime({
        targets: revealImageElements,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.95, 1],
        easing: 'easeOutExpo',
        duration: ANIMATION_SETTINGS.REVEAL_DURATION,
        delay: 200
    });
    
    // Animate button elements
    anime({
        targets: revealButtonElements,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: ANIMATION_SETTINGS.REVEAL_DURATION,
        delay: 400
    });
}

/**
 * Initialize hover animations for interactive elements
 */
function initHoverAnimations() {
    // Add hover animations to cards
    hoverCardElements.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                duration: ANIMATION_SETTINGS.HOVER_DURATION,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                duration: ANIMATION_SETTINGS.HOVER_DURATION,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Add hover animations to project cards
    projectCardElements.forEach(card => {
        const image = card.querySelector('img');
        const content = card.querySelector('.absolute');
        
        card.addEventListener('mouseenter', () => {
            anime({
                targets: image,
                scale: 1.05,
                duration: ANIMATION_SETTINGS.HOVER_DURATION * 1.5,
                easing: 'easeOutQuad'
            });
            
            anime({
                targets: content,
                translateY: -10,
                opacity: [0.9, 1],
                duration: ANIMATION_SETTINGS.HOVER_DURATION,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: image,
                scale: 1,
                duration: ANIMATION_SETTINGS.HOVER_DURATION * 1.5,
                easing: 'easeOutQuad'
            });
            
            anime({
                targets: content,
                translateY: 0,
                opacity: 0.9,
                duration: ANIMATION_SETTINGS.HOVER_DURATION,
                easing: 'easeOutQuad'
            });
        });
    });
}

/**
 * Initialize scroll-triggered animations
 */
function initScrollAnimations() {
    // Get all elements to animate on scroll
    const scrollAnimElements = document.querySelectorAll('[class*="scroll-anim"]');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add class to trigger animation
                entry.target.classList.add('animated');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: ANIMATION_SETTINGS.SCROLL_THRESHOLD,
        rootMargin: '0px'
    });
    
    // Observe all elements
    scrollAnimElements.forEach(element => {
        observer.observe(element);
    });
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