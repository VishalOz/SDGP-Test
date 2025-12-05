# SDGP-Test

Project Overview

SDGP-Test is a practice repository created to prepare for the main Software Development Group Project. This repository serves as a training ground for team collaboration, version control workflows, and implementing basic front-end development practices using React.

Objective
![image4-1](https://github.com/user-attachments/assets/1fb8c369-e398-4cd1-8e1f-66f95a1191f5)


The primary goal is to recreate a functional clone of the FedEx shipping interface as shown in the provided design. This exercise will help the team:

Practice collaborative Git workflows
Implement responsive web design
Develop clean, maintainable code structure
Establish effective team communication patterns
Design Reference

The team will recreate the FedEx shipping interface which includes:

Top navigation bar with menu items (Shipping, Tracking, Design & Print, Locations, Support, Sign Up/Log In)
Main banner section with "Ship, manage, track, deliver" headline
Prominent action buttons (RATE & SHIP, TRACK, LOCATIONS)
Tracking ID input field with TRACK button
Multiple tracking numbers section with help link

Team Roles & Responsibilities 

Imandi: Project Setup & Navigation Lead

Initialize repository structure
Implement HTML skeleton and semantic structure
Create responsive navigation bar with all menu items
Ensure accessibility standards in navigation
Set up base CSS variables and color scheme

Chasindu: Main Banner & Hero Section Lead

Design and implement the main banner section
Create "Ship, manage, track, deliver" headline
Style and position the main action buttons (RATE & SHIP, TRACK, LOCATIONS)
Implement responsive design for hero section
Add appropriate hover effects and transitions

Chenuli: Tracking Interface Lead

Build the tracking ID input section
Create the "Multiple tracking numbers" section
Add the "I NEED HELP?" link with appropriate styling
Ensure form elements are accessible and user-friendly

Dinura : Styling & CSS Architecture Lead

Develop comprehensive CSS architecture
Implement responsive design for all screen sizes
Create consistent typography system
Ensure FedEx brand color consistency (#4D148C for purple, #FF6600 for orange)
Optimize CSS for performance and maintainability

Bashith : JavaScript & Interactivity Lead

Add basic interactivity to navigation
Implement tracking number validation
Create mock functionality for action buttons
Add form submission handling
Implement responsive menu for mobile devices


Vishal: Documentation & Quality Assurance Lead

Create comprehensive README.md
Set up GitHub project board with issues
Establish contribution guidelines
Test cross-browser compatibility
Conduct final code review coordination


Repository Structure

text
SDGP-Test/
├── index.html          # Main HTML file
├── styles/
│   ├── main.css        # Primary stylesheet
│   ├── navigation.css  # Navigation-specific styles
│   └── responsive.css  # Media queries and responsive styles
├── scripts/
│   ├── main.js         # Main JavaScript file
│   └── tracking.js     # Tracking-specific functionality
├── assets/
│   ├── images/         # All image assets
│   └── icons/          # SVG/icons
├── README.md           # This documentation file
└── .gitignore          # Git ignore file
🔄 Git Workflow Guidelines

Branch Naming: feature/[short-description] or fix/[issue-description]
Commit Messages: Use descriptive, present-tense messages
Pull Requests: Required for all changes, with at least one reviewer
Main Branch Protection: No direct commits to main branch

Suggested Timeline (2 days)

Primary Purple: #4D148C
Primary Orange: #FF6600
Text Dark: #333333
Text Light: #666666
Background: #FFFFFF
Responsive Breakpoints

Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
Success Criteria

Fully responsive FedEx interface clone
All team members have made meaningful contributions
Clean, commented code following team standards
No merge conflicts in final submission
Functional tracking input with validation
Cross-browser compatibility (Chrome, Firefox, Safari)

