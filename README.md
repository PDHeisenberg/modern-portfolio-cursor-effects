# Modern Portfolio with Custom Cursor Effects

A modern, light-themed portfolio website with custom cursor effects and smooth animations, inspired by [Parth Dhawan's portfolio](https://parthdhawan.framer.website/).

## Features

- Custom cursor effects using MagicMouse.js or Cursor Magic
- Light mode design with clean typography
- Responsive layout for all devices
- Smooth animations with anime.js
- Interactive UI elements
- Optimized performance

## Technologies Used

- HTML5, CSS3, JavaScript
- TailwindCSS with DaisyUI for styling
- Anime.js for animations
- Flask backend (Python)
- Termcolor for console output

## Project Structure

```
portfolio-website/
├── main.py                # Flask application entry point
├── static/
│   ├── css/               # Compiled CSS files
│   │   └── style.css      # Main stylesheet
│   ├── js/                # JavaScript files
│   │   ├── cursor.js      # Custom cursor implementation
│   │   └── animations.js  # Animation effects
│   └── images/            # Image assets
│       ├── profile.jpg    # Profile photo
│       ├── projects/      # Project images
│       └── icons/         # UI icons
├── templates/             # HTML templates
│   ├── layout.html        # Base template
│   ├── index.html         # Main landing page
│   ├── about.html         # About page
│   ├── projects.html      # Projects listing
│   ├── project-detail.html # Individual project
│   └── 404.html           # Error page
├── src/
│   └── css/
│       └── tailwind.css   # Tailwind source
├── requirements.txt       # Python dependencies
├── package.json           # Node.js dependencies
├── tailwind.config.js     # Tailwind configuration
└── cursor-rules.md        # Cursor implementation guidelines
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   pip install -r requirements.txt
   npm install
   ```
3. Run the development server:
   ```
   python main.py
   ```

## Cursor Effects Implementation

This project uses custom cursor effects to enhance the user experience. See the [cursor-rules.md](cursor-rules.md) file for detailed implementation guidelines and options.

## Design Inspiration

The design is inspired by [Parth Dhawan's portfolio](https://parthdhawan.framer.website/), featuring:
- Clean, light background with dark text
- Minimalist design approach
- Custom cursor effects
- Smooth animations and transitions
- Professional typography

## License

MIT