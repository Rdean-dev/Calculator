// Layout wrapper for the calculator UI
import Wrapper from './components/Wrapper.jsx';
// Displays the current number or result
import Screen from './components/Screen.jsx';
// Container for calculator buttons
import ButtonBox from './components/ButtonBox.jsx';
// Individual calculator button component
import Button from './components/Button.jsx';
// React and state hook
import React, { useState } from "react";

// Button layout configuration
const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];

// Formats numbers with spaces as thousands separators for readability
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

// Removes formatting spaces before performing calculations
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

// Core math  logic
const math = (a, b, sign) =>
  sign === "+" ? a + b :
  sign === '-' ? a - b :
  sign === 'X' ? a * b :
  a / b;

// Main calculator application component
const App = () => {

  /*
    Calculator state:
    - num: current number being entered by the user
    - res: accumulated result from previous calculations
    - sign: pending arithmetic operator
    - error: locks calculator when an invalid operation occurs
   */
  let[calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
    error: false,
  });

  // Handles numeric button clicks (0-9)
  const numClickHandler = (e) => {
    // Ignore all input when calculator is in error mode
    if(calc.error) return;


    e.preventDefault();
    const value = e.target.innerHTML;

    //Limit input length to prevent overflow
    if(removeSpaces(calc.num).length < 16){
      setCalc({
        // Spread the existing calculator state so we only update the fields we need
        ...calc,
        // Prevent leading zeros and handle formatted number input
        num: calc.num === 0 && value === "0" ? "0" :
             removeSpaces(calc.num) % 1 === 0 ? toLocaleString(Number(removeSpaces(calc.num + value))):
             toLocaleString(calc.num + value),
        // Clear result only when no operator is pending
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  // Handles decimal point input
  const commaClickHandler = (e) => {
    
    if(calc.error) return;

    e.preventDefault();
    const value = e.target.innerHTML;
    
    // Prevent multiple decimal points in the same number
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num.toString() + value : calc.num,
    });
  };

  // Handles arithmetic operator clicks (+, -, X, /)
  // Resolves any pending calculation to support chained operations
  const signClickHandler = (e) => {
    if(calc.error) return;

    e.preventDefault();
    const value = e.target.innerHTML;

    // If an operator and number already exist, resolve the pending calculation
    if(calc.sign && calc.num) {

      // Division by zero enetrs a hard error state
      if (calc.sign === "/" && Number(removeSpaces(calc.num)) === 0) {
        setCalc({
          ...calc,
          res: "Error: Press C",
          num: 0,
          sign: "",
          error: true,
        });
        return;
      }
      // Store intermediate result and replace operator
      setCalc({
        ...calc,
        res: math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign),
        sign: value,
        num: 0,
      });
    
    } else {
    // First operator press: move current number into result
      setCalc({
        ...calc,
        sign: value,
        res: !calc.res && calc.num ? calc.num : calc.res,
        num: 0,
      });
    }
  };

  // Handles equals button click (=)
  const equalsClickHandler = () => {
    if(calc.error) return;

    // Only evaulate when a full operation exists
    if(calc.sign && calc.num) {

      // Division by zero triggers error mode
      if (calc.sign === "/" && Number(removeSpaces(calc.num)) === 0) {
        setCalc({
          ...calc,
          res: "Error: Press C",
          num: 0,
          sign: "",
          error: true,
        });
        return;
      }

      //Finanlize calculation and clear operator
      setCalc({
        ...calc,
        res: math(Number(removeSpaces(calc.res)), Number(removeSpaces(calc.num)), calc.sign),
        sign: '',
        num: 0,
      });
    }
  };

  // Toggles the sign of the current number or result
  const invertClickHandler = () => {
    if(calc.error) return;

    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: '',
    });
  };

  // Converts current values to percentages
  const percentClickHandler = () => {
    if(calc.error) return;

    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  // Fully resets calculator state, including error mode
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
      error: false,
    });
  };

  return (
    <Wrapper>
      {/* Displays error message when in error mode,
          otherwise show current input or result */}
      <Screen value={calc.error ? calc.res : calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          // Render calculator buttons dynamically
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i} 
                className={btn === "=" ? "equals" : ""} 
                value={btn}
                onClick={ btn === "C" ? resetClickHandler:
                          btn === "+-" ? invertClickHandler:
                          btn === "%" ? percentClickHandler:
                          btn === "=" ? equalsClickHandler:
                          btn === "/" || btn === "X" || btn === "-" || 
                          btn === "+" ? signClickHandler:
                          btn === "." ? commaClickHandler: numClickHandler 
                }
              />
            );
          })
        }
        
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
