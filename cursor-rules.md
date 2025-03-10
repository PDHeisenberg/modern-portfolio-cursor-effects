# Cursor Rules for Modern Portfolio Website

## Selected Libraries

After researching various cursor effect libraries, I recommend using one of the following:

1. **MagicMouse.js** - [GitHub Repository](https://github.com/dshongphuc/magic-mouse-js)
   - Lightweight vanilla JavaScript library
   - Multiple cursor effects
   - Easy to customize
   - Simple implementation
   - CDN available: `https://res.cloudinary.com/veseylab/raw/upload/v1684982764/magicmouse-2.0.0.cdn.min.js`

2. **Cursor Magic** - [GitHub Repository](https://github.com/takutakuaoao/cursor-magic)
   - Simple and easy-to-use
   - Available for both vanilla JS and React
   - Highly customizable
   - Modern implementation

## Implementation Rules

### 1. Basic Setup

```javascript
// For MagicMouse.js
options = {
    "cursorOuter": "circle",
    "hoverEffect": "circle-move",
    "hoverItemMove": false,
    "defaultCursor": false,
    "outerWidth": 20,        // Smaller size to match Parth's site
    "outerHeight": 20,
    "outerColor": "#000000", // Black cursor for light background
    "outerAlpha": 0.3        // More subtle transparency
};
magicMouse(options);

// For Cursor Magic
import { createCursorMagic } from "path/to/cursor-magic/dist/cursor-magic.js";

createCursorMagic({
    cursorSize: 20,
    cursorStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.3)", // Black with transparency
        border: "solid 1px #000000",
        mixBlendMode: "normal"                 // Normal blend mode for light background
    }
});
```

### 2. Design Guidelines

- **Use light mode** - Custom cursors on light background should be darker
- **Keep it subtle** - The cursor should be minimal and unobtrusive
- **Smooth transitions** - Cursor changes should be smooth and elegant
- **Provide feedback** - Cursor should subtly change on interactive elements
- **Maintain accessibility** - Ensure the website is still usable for those with disabilities

### 3. Cursor Behaviors

- **Default State**: Small circular cursor, slightly larger than standard cursor, semi-transparent black
- **Hover State**: Subtle expansion when hovering over interactive elements
- **Click State**: Quick shrink animation when clicking
- **Text Hover**: Slight change to indicate text is selectable
- **Button Hover**: More pronounced expansion on buttons and CTAs

### 4. Element-Specific Rules

- **Navigation Links**: Cursor grows slightly larger with increased opacity
- **Buttons**: Cursor expands with a more solid appearance
- **Project Cards**: Subtle magnetic effect pulling cursor toward the center of the card
- **"Chat with AI Assistant" Button**: Special effect with slight color change
- **Carousel Navigation**: Directional indicator added to cursor
- **Social Media Icons**: Playful animation on hover
- **Contact Form**: Standard cursor for input fields
- **Disable on Mobile**: Custom cursors should be disabled on touch devices

### 5. Movement Characteristics

- **Smooth following**: Cursor follows mouse with slight lag (easing)
- **Magnetic effect**: Subtle pull toward interactive elements
- **Momentum**: Slight momentum when stopping movement
- **Transition**: Smooth transitions between cursor states

### 6. Performance Considerations

- Optimize animations for performance
- Use `requestAnimationFrame` for smooth animations
- Implement debouncing for cursor movement events
- Consider reducing effects on lower-end devices
- Test cursor performance across different browsers

### 7. Implementation Steps

1. Include the library in your project
2. Configure basic cursor settings
3. Add specific hover effects for different elements
4. Test on various devices and browsers
5. Optimize for performance
6. Ensure accessibility compliance

## Technical Implementation

```javascript
// Cursor tracking with performance optimization
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const easing = 0.15; // Slightly faster easing for more responsive feel

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    // Calculate smooth movement
    cursorX += (mouseX - cursorX) * easing;
    cursorY += (mouseY - cursorY) * easing;
    
    // Update cursor element position
    document.querySelector('.custom-cursor').style.transform = 
        `translate(${cursorX}px, ${cursorY}px)`;
    
    // Update cursor border with slightly slower movement for trailing effect
    document.querySelector('.cursor-border').style.transform = 
        `translate(${cursorX}px, ${cursorY}px)`;
    
    requestAnimationFrame(updateCursor);
}

// Start animation loop
requestAnimationFrame(updateCursor);

// Magnetic effect for interactive elements
function applyMagneticEffect(element, strength = 0.3) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from mouse to center
        const distanceX = centerX - e.clientX;
        const distanceY = centerY - e.clientY;
        
        // Apply magnetic pull
        mouseX += distanceX * strength;
        mouseY += distanceY * strength;
    });
}

// Apply magnetic effect to interactive elements
document.querySelectorAll('.interactive-element').forEach(element => {
    applyMagneticEffect(element);
});
```

## Accessibility Considerations

- Ensure the website is fully navigable with keyboard
- Provide alternative navigation for users who disable JavaScript
- Include proper ARIA attributes for screen readers
- Test with various assistive technologies
- Add a toggle to disable custom cursor effects if needed

Remember to implement these cursor effects with user experience as the priority, ensuring they enhance rather than hinder the portfolio website's usability.