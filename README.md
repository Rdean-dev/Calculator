React Calculator
---

&nbsp;A fully functional calculator built with React that replicates real calculator behavior, including chained operations, error handling, and clean UI state management.


Features
---

&nbsp;Supports all basic arithmetic operations

&nbsp;Chained calculations (e.g. 5 + 4 + 3, 10 - 2 / 4)

&nbsp;Division-by-zero protection with locked error state

&nbsp;State-driven logic using React Hooks

&nbsp;Modular, reusable components

&nbsp;Clean and responsive UI with CSS Grid

Tech Stack
---

    React (Functional Components + Hooks)
    
    JavaScript (ES6+)
    
    CSS Grid & Flexbox

Architecture Overview
---

&nbsp;The application is broken into reusable components:
  
    App.jsx – Core logic and state management
    
    Screen – Displays input, results, or error messages
    
    Button / ButtonBox – Reusable UI components
    
    Wrapper – Layout container
  
&nbsp;Calculator state is managed with a single useState object:
  
    {
      sign: "",   // current operator
      num: 0,     // current input
      res: 0,     // stored result
      error: false // locks calculator on fatal errors
    }

Error Handling
---

&nbsp;Division by zero triggers a hard error
  
&nbsp;Calculator input is locked until C is pressed
  
&nbsp;Error state is clearly displayed on screen

What This Project Demonstrates
---

&nbsp;Thoughtful state management
  
&nbsp;Handling edge cases and user input safely
  
&nbsp;Writing maintainable, readable code
  
&nbsp;Clean separation of logic and presentation
  
&nbsp;Real-world UI behavior implementation
---

Getting Started
---

    npm install
    npm start

Author
&nbsp;Built by Rebekah Dean
Frontend / React-focused project
