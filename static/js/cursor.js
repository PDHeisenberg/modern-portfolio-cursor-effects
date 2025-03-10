/**
 * Custom Cursor Implementation
 * 
 * This script implements a custom cursor with various effects based on
 * the cursor-rules.md guidelines. It includes:
 * - Basic cursor tracking with smooth movement
 * - Hover effects for interactive elements
 * - Magnetic effect for buttons
 * - Click animations
 * - Mobile/touch device detection
 */

// Constants for cursor behavior
const CURSOR_SETTINGS = {
    DOT_SIZE: 8,                // Size of the inner dot in pixels
    OUTLINE_SIZE: 40,           // Default size of the outer circle in pixels
    OUTLINE_HOVER_SIZE: 60,     // Size of the outer circle when hovering over interactive elements
    MAGNETIC_STRENGTH: 0.15,    // Strength of the magnetic effect (0-1)
    LERP_FACTOR: 0.15,          // Linear interpolation factor for smooth movement
    CLICK_SCALE: 0.8,           // Scale factor when clicking
    CLICK_DURATION: 300,        // Duration of click animation in milliseconds
};

// DOM elements
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');
const body = document.body;

// Cursor position variables
let mouseX = 0;
let mouseY = 0;
let dotX = 0;
let dotY = 0;
let outlineX = 0;
let outlineY = 0;
let isHovering = false;
let targetElement = null;
let magneticActive = false;

/**
 * Check if the device is a touch device
 * @returns {boolean} True if the device is a touch device
 */
function isTouchDevice() {
    return (
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)
    );
}

/**
 * Initialize the custom cursor
 */
function initCursor() {
    // Don't initialize on touch devices
    if (isTouchDevice()) {
        document.documentElement.classList.remove('custom-cursor-active');
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
        return;
    }

    // Add cursor-active class to body
    document.documentElement.classList.add('custom-cursor-active');

    // Set initial position to center of screen to avoid cursor jumping
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    
    mouseX = initialX;
    mouseY = initialY;
    dotX = initialX;
    dotY = initialY;
    outlineX = initialX;
    outlineY = initialY;
    
    if (cursorDot) {
        cursorDot.style.transform = `translate(${initialX}px, ${initialY}px)`;
    }
    
    if (cursorOutline) {
        cursorOutline.style.transform = `translate(${initialX}px, ${initialY}px)`;
    }

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    // Add hover listeners to all interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .hover-target, input, textarea, select, [role="button"]');
    hoverTargets.forEach(target => {
        target.addEventListener('mouseenter', () => onMouseEnter(target));
        target.addEventListener('mouseleave', onMouseLeave);
    });

    // Start animation loop
    requestAnimationFrame(updateCursor);
}

/**
 * Handle mouse movement
 * @param {MouseEvent} e - Mouse event
 */
function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Apply magnetic effect if hovering over a magnetic element
    if (magneticActive && targetElement) {
        const rect = targetElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to center of element
        const distX = mouseX - centerX;
        const distY = mouseY - centerY;
        
        // Check if mouse is within magnetic range
        const distance = Math.sqrt(distX * distX + distY * distY);
        const magneticRange = Math.max(rect.width, rect.height) * 1.5;
        
        if (distance < magneticRange) {
            // Calculate magnetic pull (stronger when closer)
            const pull = 1 - Math.min(distance / magneticRange, 1);
            const pullStrength = pull * CURSOR_SETTINGS.MAGNETIC_STRENGTH;
            
            // Move element slightly towards cursor
            targetElement.style.transform = `translate(${distX * pullStrength}px, ${distY * pullStrength}px)`;
        } else {
            // Reset element position
            targetElement.style.transform = '';
        }
    }
}

/**
 * Handle mouse enter on interactive elements
 * @param {HTMLElement} target - The element being hovered
 */
function onMouseEnter(target) {
    isHovering = true;
    targetElement = target;
    
    // Check if the element should have magnetic effect
    magneticActive = target.classList.contains('btn') || 
                     target.classList.contains('magnetic');
    
    // Add hover class to cursor
    if (cursorOutline) {
        cursorOutline.classList.add('hover');
        cursorOutline.style.width = `${CURSOR_SETTINGS.OUTLINE_HOVER_SIZE}px`;
        cursorOutline.style.height = `${CURSOR_SETTINGS.OUTLINE_HOVER_SIZE}px`;
        
        // Change cursor outline color based on element background
        const targetBg = window.getComputedStyle(target).backgroundColor;
        if (targetBg && targetBg !== 'rgba(0, 0, 0, 0)' && targetBg !== 'transparent') {
            // Invert the color for better visibility
            cursorOutline.style.borderColor = 'rgba(255, 255, 255, 0.6)';
        }
    }
}

/**
 * Handle mouse leave from interactive elements
 */
function onMouseLeave() {
    isHovering = false;
    
    // Reset target element transform if it was magnetic
    if (magneticActive && targetElement) {
        targetElement.style.transform = '';
    }
    
    magneticActive = false;
    targetElement = null;
    
    // Reset cursor styles
    if (cursorOutline) {
        cursorOutline.classList.remove('hover');
        cursorOutline.style.width = `${CURSOR_SETTINGS.OUTLINE_SIZE}px`;
        cursorOutline.style.height = `${CURSOR_SETTINGS.OUTLINE_SIZE}px`;
        cursorOutline.style.borderColor = 'rgba(0, 102, 255, 0.5)';
    }
}

/**
 * Handle mouse down event
 */
function onMouseDown() {
    // Animate cursor on click
    if (cursorDot) {
        anime({
            targets: cursorDot,
            scale: CURSOR_SETTINGS.CLICK_SCALE,
            duration: CURSOR_SETTINGS.CLICK_DURATION / 2,
            easing: 'easeOutExpo'
        });
    }
    
    if (cursorOutline) {
        anime({
            targets: cursorOutline,
            scale: CURSOR_SETTINGS.CLICK_SCALE,
            duration: CURSOR_SETTINGS.CLICK_DURATION / 2,
            easing: 'easeOutExpo'
        });
    }
}

/**
 * Handle mouse up event
 */
function onMouseUp() {
    // Reset cursor after click
    if (cursorDot) {
        anime({
            targets: cursorDot,
            scale: 1,
            duration: CURSOR_SETTINGS.CLICK_DURATION / 2,
            easing: 'easeOutExpo'
        });
    }
    
    if (cursorOutline) {
        anime({
            targets: cursorOutline,
            scale: 1,
            duration: CURSOR_SETTINGS.CLICK_DURATION / 2,
            easing: 'easeOutExpo'
        });
    }
}

/**
 * Update cursor position with smooth interpolation
 */
function updateCursor() {
    // Calculate new positions with linear interpolation for smoothness
    dotX = lerp(dotX, mouseX, CURSOR_SETTINGS.LERP_FACTOR * 1.5);
    dotY = lerp(dotY, mouseY, CURSOR_SETTINGS.LERP_FACTOR * 1.5);
    
    outlineX = lerp(outlineX, mouseX, CURSOR_SETTINGS.LERP_FACTOR);
    outlineY = lerp(outlineY, mouseY, CURSOR_SETTINGS.LERP_FACTOR);
    
    // Update cursor positions
    if (cursorDot) {
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;
    }
    
    if (cursorOutline) {
        cursorOutline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    }
    
    // Continue animation loop
    requestAnimationFrame(updateCursor);
}

/**
 * Linear interpolation function
 * @param {number} start - Start value
 * @param {number} end - End value
 * @param {number} factor - Interpolation factor (0-1)
 * @returns {number} Interpolated value
 */
function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Initialize cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', initCursor);