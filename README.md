React Calculator

  A fully functional calculator built with React that replicates real calculator behavior, including chained operations, error handling, and clean UI state management.

Features

  Supports all basic arithmetic operations

  Chained calculations (e.g. 5 + 4 + 3, 10 - 2 / 4)

  Division-by-zero protection with locked error state

  State-driven logic using React Hooks
  
  Modular, reusable components
  
  Clean and responsive UI with CSS Grid

Tech Stack

  React (Functional Components + Hooks)
  
  JavaScript (ES6+)
  
  CSS Grid & Flexbox

Architecture Overview

  The application is broken into reusable components:
  
    App.jsx – Core logic and state management
    
    Screen – Displays input, results, or error messages
    
    Button / ButtonBox – Reusable UI components
    
    Wrapper – Layout container
  
  Calculator state is managed with a single useState object:
  
    {
      sign: "",   // current operator
      num: 0,     // current input
      res: 0,     // stored result
      error: false // locks calculator on fatal errors
    }

Error Handling

  Division by zero triggers a hard error
  
  Calculator input is locked until C is pressed
  
  Error state is clearly displayed on screen

What This Project Demonstrates

  Thoughtful state management
  
  Handling edge cases and user input safely
  
  Writing maintainable, readable code
  
  Clean separation of logic and presentation
  
  Real-world UI behavior implementation

Getting Started

npm install
npm start

Author

Built by Rebekah Dean
Frontend / React-focused project
