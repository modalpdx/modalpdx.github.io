#!/bin/bash

# Add the script tag if not already present
grep -q 'localhost:8097' index.html || sed -i.bak 's|<!-- REACT DEVTOOLS -->|<!-- REACT DEVTOOLS --><script src="http://localhost:8097"></script>|' index.html

# Function to run on exit
cleanup() {
  echo "Cleaning up..."
  # Remove the script tag
  sed -i.bak 's|<script src="http://localhost:8097"></script>||' index.html
  exit 0
}

# Trap SIGINT (CTRL-C) and run cleanup
trap cleanup SIGINT

# Start vite
vite
