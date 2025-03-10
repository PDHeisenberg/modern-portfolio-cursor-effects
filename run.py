#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from main import app
from termcolor import colored

if __name__ == '__main__':
    try:
        print(colored("Starting Modern Portfolio application...", "green"))
        print(colored("Debug mode: True", "yellow"))
        app.run(debug=True, host="127.0.0.1", port=5002)
    except Exception as e:
        print(colored(f"Error starting application: {str(e)}", "red"))
