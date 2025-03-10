/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',      // Primary accent color
        secondary: '#8B5CF6',    // Secondary accent
        dark: '#1F2937',         // Dark text
        'dark-light': '#4B5563', // Medium gray text
        light: '#F9FAFB',        // Light background
        'light-accent': '#F3F4F6' // Subtle background accent
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Manrope', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#4F46E5',
          secondary: '#8B5CF6',
          accent: '#F59E0B',
          neutral: '#1F2937',
          'base-100': '#FFFFFF',
          'base-200': '#F9FAFB',
          'base-300': '#F3F4F6',
          'base-content': '#1F2937',
        },
      },
    ],
  },
}