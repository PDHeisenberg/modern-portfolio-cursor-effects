#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from flask import Flask, render_template, send_from_directory
from termcolor import colored

# Constants
APP_NAME = "Modern Portfolio"
DEBUG_MODE = True
HOST = "127.0.0.1"
PORT = 5000

# Initialize Flask app
app = Flask(__name__)

@app.route('/')
def index():
    """Render the home page."""
    print(colored("Rendering home page...", "cyan"))
    try:
        return render_template('index.html', title="Home | Modern Portfolio")
    except Exception as e:
        print(colored(f"Error rendering home page: {str(e)}", "red"))
        return "An error occurred while loading the page. Please try again later."

@app.route('/about')
def about():
    """Render the about page."""
    print(colored("Rendering about page...", "cyan"))
    try:
        return render_template('about.html', title="About | Modern Portfolio")
    except Exception as e:
        print(colored(f"Error rendering about page: {str(e)}", "red"))
        return "An error occurred while loading the page. Please try again later."

@app.route('/projects')
def projects():
    """Render the projects page."""
    print(colored("Rendering projects page...", "cyan"))
    try:
        return render_template('projects.html', title="Projects | Modern Portfolio")
    except Exception as e:
        print(colored(f"Error rendering projects page: {str(e)}", "red"))
        return "An error occurred while loading the page. Please try again later."

@app.route('/contact')
def contact():
    """Render the contact page."""
    print(colored("Rendering contact page...", "cyan"))
    try:
        return render_template('contact.html', title="Contact | Modern Portfolio")
    except Exception as e:
        print(colored(f"Error rendering contact page: {str(e)}", "red"))
        return "An error occurred while loading the page. Please try again later."

@app.route('/favicon.ico')
def favicon():
    """Serve the favicon."""
    return send_from_directory(os.path.join(app.root_path, 'static', 'img'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.errorhandler(404)
def page_not_found(e):
    """Handle 404 errors."""
    print(colored(f"404 error: {str(e)}", "yellow"))
    return render_template('404.html', title="404 | Modern Portfolio"), 404

@app.errorhandler(500)
def server_error(e):
    """Handle 500 errors."""
    print(colored(f"500 error: {str(e)}", "red"))
    return render_template('500.html', title="500 | Modern Portfolio"), 500

if __name__ == '__main__':
    print(colored(f"Starting {APP_NAME} application...", "green"))
    print(colored(f"Debug mode: {DEBUG_MODE}", "yellow"))
    try:
        app.run(debug=DEBUG_MODE, host=HOST, port=PORT)
    except Exception as e:
        print(colored(f"Error starting application: {str(e)}", "red"))